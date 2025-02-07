import { MinimalSykmeldingFragment, SykmeldingFragment } from 'queries'

export type UtenlandskSykmelding = Omit<SykmeldingFragment, 'utenlandskSykmelding'> & {
    readonly utenlandskSykmelding: NonNullable<SykmeldingFragment['utenlandskSykmelding']>
}

export function isUtenlandsk(
    sykmelding: SykmeldingFragment | MinimalSykmeldingFragment,
): sykmelding is UtenlandskSykmelding {
    return sykmelding.__typename === 'Sykmelding'
        ? sykmelding.utenlandskSykmelding !== null
        : sykmelding.sykmelding.utenlandskSykmelding != null
}
