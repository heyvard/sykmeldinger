import { z } from 'zod'

import { LocalDateSchema } from '../date'
import { Periodetype, RegelStatus, StatusEvent } from '../../graphql/resolver-types.generated'

import { UtenlandskSykmeldingSchema } from './UtenlandskSykmelding'

const MinimalArbeidsgiverSchema = z.object({
    orgNavn: z.string(),
    orgnummer: z.string(),
    juridiskOrgnummer: z.string(),
})

const MinimalRuleHitsSchema = z.object({
    ruleName: z.string(),
    ruleStatus: z.string(),
    messageForUser: z.string(),
    messageForSender: z.string(),
})

const MinimalGradertSchema = z.object({
    grad: z.number(),
})

const MinimalPeriodSchema = z.object({
    fom: z.string(),
    tom: z.string(),
    type: z.nativeEnum(Periodetype),
    gradert: MinimalGradertSchema.nullable(),
    behandlingsdager: z.number().nullable(),
})

const MinimalSykmeldingDetailsSchema = z.object({
    papirsykmelding: z.boolean(),
    egenmeldt: z.boolean().nullable(),
    utenlandskSykmelding: UtenlandskSykmeldingSchema.nullable(),
    sykmeldingsperioder: z.array(MinimalPeriodSchema),
})

export type MinimalSykmelding = z.infer<typeof MinimalSykmeldingSchema>
export const MinimalSykmeldingSchema = z.object({
    sykmelding_id: z.string(),
    event: z.nativeEnum(StatusEvent),
    arbeidsgiver: MinimalArbeidsgiverSchema.nullable(),
    rule_hits: z.array(MinimalRuleHitsSchema),
    timestamp: LocalDateSchema,
    behandlingsutfall: z.nativeEnum(RegelStatus),
    sykmelding: MinimalSykmeldingDetailsSchema,
})
