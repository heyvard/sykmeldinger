import React from 'react';

import './Receipt.less';

import success from './success.svg';
import info from './info.svg';
import { Undertittel, Normaltekst, Element } from 'nav-frontend-typografi';
import { toReadableDateWithTime } from '../../../../utils/datoUtils';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';

const SoknadInactive = () => {
    return <section className="receipt__content">asd</section>;
};

const SoknadActive = () => {
    return (
        <section className="receipt__content-container">
            <div className="receipt__icon">
                <img src={info} alt="Info-ikon" />
            </div>

            <section className="receipt__content">
                <Undertittel>Hva skjer videre?</Undertittel>
                <br />
                <Element>Du må søke om sykepenger</Element>
                <br />
                <Normaltekst>
                    I søknaden svarer du på noen spørsmål. Svarene dine brukes til å beregne sykepengene.
                </Normaltekst>
                <br />
                nedtrekksmeny Hvorfor må jeg søke?
                <br />
                <Knapp>Gå til søknaden</Knapp>
                <hr className="receipt__content-hr" />
                <Element>Har du flere jobber?</Element>
                <Normaltekst>
                    Du må levere én sykmelding per jobb. Kontakt den som har sykmeldt deg hvis du trenger flere
                    sykmeldinger.
                </Normaltekst>
                <br />
                <Element>Skal du ut og reise?</Element>
                <Lenke href="www.nrk.no">Les om hva du må gjøre for å beholde sykepengene.</Lenke>
            </section>
        </section>
    );
};

const SoknadSent = () => {
    return <section className="receipt__content">asd</section>;
};

interface ReceiptProps {
    arbeidsgiver: string;
    orgnummer: string;
    datoSendt: Date;
}

const Receipt = ({ arbeidsgiver, orgnummer, datoSendt }: ReceiptProps) => {
    const getContent = () => {
        const status = true;
        // Sykmelding is sent and søknad is inactive
        if (!status) {
            return <SoknadInactive />;
        }

        // Sykmelding is sent and søknad is active
        if (status) {
            return <SoknadActive />;
        }

        // Sykmelding is sent and søknad is sent
        if (!status) {
            return <SoknadSent />;
        }

        return undefined;
    };

    const Content = getContent();

    return (
        <article className="receipt">
            <section className="receipt__header">
                <div className="receipt__icon">
                    <img src={success} alt="Suksess-ikon" />
                </div>
                <div className="receipt__title">
                    <Undertittel tag="h2" className="receipt__status">
                        Sykmeldingen er sendt til {arbeidsgiver} (org. nummer {orgnummer})
                    </Undertittel>
                    <Normaltekst>Dato sendt: {toReadableDateWithTime(datoSendt)}</Normaltekst>
                </div>
            </section>

            {Content}
        </article>
    );
};

export default Receipt;
