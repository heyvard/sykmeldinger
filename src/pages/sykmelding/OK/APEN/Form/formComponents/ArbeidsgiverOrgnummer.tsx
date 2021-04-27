import React, { useMemo, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormShape } from '../Form';
import Brukerinformasjon from '../../../../../../models/Brukerinformasjon';
import NyNarmesteLeder from './NyNarmesteLeder';
import QuestionWrapper from '../layout/QuestionWrapper';
import Ekspanderbar from '../../../../../commonComponents/Ekspanderbar/Ekspanderbar';
import Spacing from '../../../../../commonComponents/Spacing/Spacing';

interface ArbeidsgiverOrgnummerProps {
    brukerinformasjon: Brukerinformasjon;
}

const ArbeidsgiverOrgnummer: React.FC<ArbeidsgiverOrgnummerProps> = ({ brukerinformasjon }) => {
    const { arbeidsgivere } = brukerinformasjon;
    const { register, unregister, errors, control, watch } = useFormContext<FormShape>();
    const fieldName: keyof FormShape = 'arbeidsgiverOrgnummer';
    const sporsmaltekst = 'Min arbeidsgiver';
    const watchArbeidsgiverOrgnummer = watch(fieldName);

    useEffect(() => {
        register({
            name: `${fieldName}.sporsmaltekst`,
            value: sporsmaltekst,
        });
        register({
            name: `${fieldName}.svartekster`,
            value: JSON.stringify(arbeidsgivere.map((ag) => ({ navn: ag.navn, orgnummer: ag.orgnummer }))),
        });
        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`]);
    }, [arbeidsgivere, register, unregister]);

    const valgtArbeidsgiver = useMemo(() => {
        const arbeidsgiver = arbeidsgivere.find((ag) => ag.orgnummer === watchArbeidsgiverOrgnummer?.svar);
        if (watchArbeidsgiverOrgnummer?.svar && arbeidsgiver === undefined) {
            // Skal ikke kunne skje, men må håndteres hvis bruker skulle klare å manipulere skjemaet på egenhånd.
            throw new Error('The chosen arbeidsgiver does not match with any of arbeidsgivere fetched for the user.');
        }
        return arbeidsgiver;
    }, [arbeidsgivere, watchArbeidsgiverOrgnummer]);

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name={`${fieldName}.svar`}
                defaultValue={null}
                rules={{ required: 'Du må velge hvilken arbeidsgiver sykmeldingen gjelder for.' }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend={
                            <div>
                                <div style={{ marginBottom: '0.5rem' }}>{sporsmaltekst}</div>
                                <Ekspanderbar title="Om du ikke ser arbeidsgiveren din her">
                                    <Spacing amount="small">
                                        Be arbeidsgiveren din om å registrere deg i A-meldingen. Da blir det oppdatert
                                        her slik at du kan få sendt den til arbeidsgiveren.
                                    </Spacing>
                                    Hvis arbeidsgiveren mener at du ikke skal være registrert som ansatt må du velge
                                    frilanser eller selvstendig næringsdrivende.
                                </Ekspanderbar>
                            </div>
                        }
                        radios={arbeidsgivere.map((arbeidsgiver, index) => ({
                            label: arbeidsgiver.navn,
                            value: arbeidsgiver.orgnummer,
                            id: index === 0 ? fieldName : undefined,
                        }))}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        feil={errors.arbeidsgiverOrgnummer?.svar?.message}
                    />
                )}
            />

            {valgtArbeidsgiver?.aktivtArbeidsforhold && valgtArbeidsgiver?.naermesteLeder && (
                <NyNarmesteLeder naermesteLeder={valgtArbeidsgiver.naermesteLeder} />
            )}
        </QuestionWrapper>
    );
};

export default ArbeidsgiverOrgnummer;
