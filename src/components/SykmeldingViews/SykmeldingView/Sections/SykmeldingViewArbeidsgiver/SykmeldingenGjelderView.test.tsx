import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Pasient } from 'queries'

import SykmeldingenGjelderView from './SykmeldingenGjelderView'

describe('SykmeldingenGjelderView', () => {
    it('Does not render if name is undefined', () => {
        const pasient: Pasient = {
            __typename: 'Pasient',
            fnr: '12345678901',
            fornavn: null,
            mellomnavn: null,
            etternavn: null,
        }
        render(<SykmeldingenGjelderView pasient={pasient} parentId="test" />)
        expect(screen.queryByText('Sykmeldingen gjelder')).not.toBeInTheDocument()
        expect(screen.queryByText('Ola Nordmann')).not.toBeInTheDocument()
        expect(screen.queryByText('12345678901')).not.toBeInTheDocument()
    })

    it('Renders name and fnr if arbeidsgiver', () => {
        const pasient: Pasient = {
            __typename: 'Pasient',
            fnr: '12345678901',
            fornavn: 'Ola',
            mellomnavn: null,
            etternavn: 'Nordmann',
        }
        render(<SykmeldingenGjelderView pasient={pasient} parentId="test" />)
        expect(screen.getByText('Sykmeldingen gjelder')).toBeInTheDocument()
        expect(screen.getByText('Ola Nordmann')).toBeInTheDocument()
        expect(screen.getByText('Fødselsnr: 12345678901')).toBeInTheDocument()
    })
})
