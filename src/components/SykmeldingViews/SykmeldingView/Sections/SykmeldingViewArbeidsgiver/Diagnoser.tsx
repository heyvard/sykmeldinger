import { BandageIcon } from '@navikt/aksel-icons'
import { ReactElement } from 'react'
import * as R from 'remeda'

import { MedisinskVurdering } from 'queries'

import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingSladd } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    medisinskVurdering: MedisinskVurdering
    parentId: string
}

function Diagnoser({ medisinskVurdering, parentId }: Props): ReactElement {
    return (
        <SykmeldingGroup parentId={parentId} heading="Medisinsk tilstand" Icon={BandageIcon} tight>
            {medisinskVurdering.hovedDiagnose?.tekst && <SykmeldingSladd heading="Diagnose" />}
            {R.pipe(
                medisinskVurdering.biDiagnoser,
                R.map(R.prop('tekst')),
                R.compact,
                R.map((it) => <SykmeldingSladd key={it} heading="Diagnose" />),
            )}
        </SykmeldingGroup>
    )
}

export default Diagnoser
