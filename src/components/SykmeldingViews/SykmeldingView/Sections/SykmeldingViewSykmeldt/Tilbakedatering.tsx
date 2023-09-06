import { ReactElement } from 'react'
import { Historic } from '@navikt/ds-icons'

import { KontaktMedPasient } from '../../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../../utils/dateUtils'
import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    kontaktMedPasient: KontaktMedPasient
}

function Tilbakedatering({ kontaktMedPasient }: Props): ReactElement | null {
    if (!kontaktMedPasient.kontaktDato && !kontaktMedPasient.begrunnelseIkkeKontakt) {
        return null
    }

    return (
        <SykmeldingGroup heading="Tilbakedatering" Icon={Historic}>
            {kontaktMedPasient.kontaktDato != null && (
                <SykmeldingInfo heading="Dato for dokumenterbar kontakt med pasienten" variant="gray">
                    {toReadableDate(kontaktMedPasient.kontaktDato)}
                </SykmeldingInfo>
            )}
            {kontaktMedPasient.begrunnelseIkkeKontakt != null && (
                <SykmeldingInfo heading="Begrunnelse for tilbakedatering" variant="gray">
                    {kontaktMedPasient.begrunnelseIkkeKontakt}
                </SykmeldingInfo>
            )}
        </SykmeldingGroup>
    )
}

export default Tilbakedatering
