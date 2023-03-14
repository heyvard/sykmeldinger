import { Calender } from '@navikt/ds-icons'

import { getPeriodTitle, getReadableLength } from '../../../../../utils/periodeUtils'
import { Periode } from '../../../../../fetching/graphql.generated'
import JaEntry from '../../Layout/JaEntry/JaEntry'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'
import { SykmeldingSectionHeading } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { toReadableDatePeriod } from '../../../../../utils/dateUtils'

import styles from './Perioder.module.css'

interface Props {
    perioder: Periode[]
    isV3: boolean
}

function Perioder({ perioder, isV3 }: Props): JSX.Element {
    return (
        <div>
            <SykmeldingSectionHeading title="Perioder (f.o.m. - t.o.m.)" Icon={Calender} />
            <div className={styles.perioder}>
                {perioder.map((periode, index) => (
                    <div key={index} className={styles.periode}>
                        <SykmeldingEntry
                            title={getPeriodTitle(periode)}
                            mainText={toReadableDatePeriod(periode.fom, periode.tom)}
                            subText={getReadableLength(periode)}
                        />
                        {!!periode.innspillTilArbeidsgiver && (
                            <SykmeldingEntry
                                title="Innspill til arbeidsgiver om tilrettelegging"
                                mainText={periode.innspillTilArbeidsgiver}
                                small
                            />
                        )}
                        {periode.gradert?.reisetilskudd && (
                            <JaEntry
                                title={
                                    isV3
                                        ? 'Pasienten kan være delvis i arbeid ved bruk av reisetilskudd'
                                        : 'Kan pasienten være i delvis arbeid ved bruk av reisetilskudd?'
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Perioder
