import React from 'react';
import { Status } from '../../types/sykmeldingDataTypes';

interface FeilKvitteringProps {
    status: Status;
}

const FeilKvittering = ({ status }: FeilKvitteringProps) => {
    return <p>Feil Kvittering</p>;
};

export default FeilKvittering;
