import React, { useState, useEffect } from 'react';
import { FieldError, ValidationPayload } from 'react-hook-form/dist/types';
import Periodevelger from '../periodevelger/Periodevelger';
import { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe, Fieldset } from 'nav-frontend-skjema';
import tekster from '../sporsmal-tekster';
import { useSpring, animated } from 'react-spring';

interface EgenmeldingsdagerProps {
    sykmeldingStartdato?: Date;
    register: any;
    unregister: any;
    triggerValidation: (
        payload?: ValidationPayload<string, any> | ValidationPayload<string, any>[] | undefined,
        shouldRender?: any,
    ) => Promise<boolean>;
    isSubmitted: boolean;
    setValue: (name: string, startOgSlutt: any, shouldValidate?: boolean) => void;
    errors: Partial<Record<string, FieldError>>;
}

export interface Egenmeldingsperiode {
    id: number;
    startDato: Date | null;
    sluttDato: Date | null;
}

const Egenmeldingsdager = ({
    sykmeldingStartdato,
    register,
    unregister,
    setValue,
    errors,
    triggerValidation,
    isSubmitted,
}: EgenmeldingsdagerProps) => {
    const [perioder, setPerioder] = useState<Egenmeldingsperiode[]>([{ id: 0, startDato: null, sluttDato: null }]); // Legger til første periode
    const name = 'egenmeldingsperioder';
    //const props = useSpring({ height: 100, opacity: 1, from: { height: 0, opacity: 0 } });
    const props = useSpring({ opacity: 1, height: 100, from: { opacity: 0, height: 0 } });
    // Registrer ved mount, unregistrer ved unmount
    useEffect(() => {
        register({ name: name });
        return () => unregister(name);
    }, [register, unregister]);

    useEffect(() => {
        console.log('rendered');
    });

    const updateValue = (id: number, value: Date[]): void => {
        // Setter lokal state
        setPerioder(perioder => {
            return perioder.map(periode => {
                if (periode.id === id) {
                    return { ...periode, startDato: value[0], sluttDato: value[1] };
                } else {
                    return periode;
                }
            });
        });
        // Setter name og value manuelt til form.
        setValue(
            name,
            perioder.map(periode => {
                if (periode.id === id) {
                    return { ...periode, startDato: value[0], sluttDato: value[1] };
                }
                return { ...periode, startDato: periode.startDato, sluttDato: periode.sluttDato };
            }),
        );

        if (isSubmitted) {
            triggerValidation({ name: name });
        }
    };

    const slettValue = (id: number): void => {
        const nyPerioder = perioder.filter(periode => periode.id !== id);
        setPerioder(nyPerioder);
        setValue(name, nyPerioder);
        if (isSubmitted) {
            triggerValidation({ name: name });
        }
    };

    return (
        <>
            <SkjemaGruppe
                feil={
                    errors.egenmeldingsperioder
                        ? { feilmelding: tekster['egenmeldingsperioder.feilmelding'] }
                        : undefined
                }
            >
                <animated.div style={props}>
                    <Fieldset legend={tekster['egenmeldingsperioder.tittel']}>
                        {perioder.map(periode => {
                            return (
                                <div key={periode.id}>
                                    <Periodevelger
                                        vis={true}
                                        id={periode.id}
                                        minDato={new Date('12.01.2019')} // TODO: lage logikk for å intervallbegrensning
                                        maksDato={new Date('12.10.2019')}
                                        setValue={updateValue}
                                    />
                                    {periode.id !== 0 && (
                                        <Knapp
                                            type={'fare'}
                                            form={'kompakt'}
                                            mini
                                            onClick={e => {
                                                e.preventDefault();
                                                slettValue(periode.id);
                                            }}
                                        >
                                            {tekster['egenmeldingsperioder.slett-periode']}
                                        </Knapp>
                                    )}
                                </div>
                            );
                        })}
                    </Fieldset>
                    <Knapp
                        type={'flat'}
                        form={'kompakt'}
                        mini
                        onClick={e => {
                            e.preventDefault();
                            setPerioder(forrigePerioder => [
                                ...forrigePerioder,
                                {
                                    id: forrigePerioder[forrigePerioder.length - 1].id + 1,
                                    startDato: null,
                                    sluttDato: null,
                                },
                            ]); // Legger til periode med id én høyere enn siste element i listen
                        }}
                    >
                        {tekster['egenmeldingsperioder.legg-til-periode']}
                    </Knapp>
                </animated.div>
            </SkjemaGruppe>
        </>
    );
};

export default Egenmeldingsdager;
