import React from 'react';

import './Receipt.less';

import success from './success.svg';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { toReadableDateWithTime } from '../../../../utils/datoUtils';

interface ReceiptProps {
    arbeidsgiver: string;
    orgnummer: string;
    datoSendt: Date;
}

const Receipt = ({ arbeidsgiver, orgnummer, datoSendt }: ReceiptProps) => {
    return (
        <article className="receipt">
            <div className="receipt__icon">
                <img src={success} alt="Suksess-ikon" />
            </div>
            <div className="receipt__title">
                <Undertittel tag="h2" className="receipt__status">
                    Sykmeldingen er sendt til {arbeidsgiver} (org. nummer {orgnummer})
                </Undertittel>
                <Normaltekst>Dato sendt: {toReadableDateWithTime(datoSendt)}</Normaltekst>
            </div>
        </article>
    );
};

export default Receipt;
