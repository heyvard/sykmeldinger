import { Sykmelding } from './sykmeldingTypes';

export class SykmeldingData {
    sykmelding: Sykmelding;
    status: Status;

    constructor(data: any) {
        this.sykmelding = data.sykmelding;
        this.status = data.status;
    }
}

export enum Status {
    APEN = 'apen',
    AVBRUTT = 'avbrutt',
    UTGATT = 'utgatt',
    SENDT = 'sendt',
    BEKREFTET = 'bekreftet',
    SLETTET = 'slettet',
    AVVIST = 'avvist',
}
