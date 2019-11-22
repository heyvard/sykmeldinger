import React from 'react';

import Brodsmuler, { Brodsmule } from '../components/brodsmuler/brodsmuler';
import useAppStore from '../store/useAppStore';
import { Status } from '../types/sykmeldingDataTypes';


const brodsmuler: Brodsmule[] = [
    {
        tittel: 'Ditt sykefravaer',
        sti: '/',
        erKlikkbar: true,
    },
    {
        tittel: 'Sykmeldinger',
        sti: '/sykmeldinger',
        erKlikkbar: true,
    },
    {
        tittel: 'Sykmelding',
        sti: '/sykmeldinger/:id',
        erKlikkbar: true,
    },
    {
        tittel: 'Kvittering',
        sti: '/sykmeldinger/:id/kvittering',
        erKlikkbar: false,
    },
];

/*
 * Må ikke kunne aksessere denne siden med mindre status er satt som bekreftet eller sendt for den aktuelle id 
 */

const KvitteringSide = () => {
    const { sykmelding, sykmeldingStatus } = useAppStore();
    return <p>kvitteringside</p>    
}

export default KvitteringSide;