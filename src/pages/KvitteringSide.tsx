import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import useFetch, { isNotStarted, hasFinished, hasFailed, FetchState, hasData } from '../hooks/useFetch';

import Brodsmuler, { Brodsmule } from '../components/brodsmuler/brodsmuler';
import useAppStore from '../store/useAppStore';
import { Status } from '../types/sykmeldingDataTypes';
import Spinner from 'nav-frontend-spinner';

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
    const { id } = useParams();
    const statusFetcher = useFetch<{ status: Status }>();
    const { sykmeldingStatus, setSykmeldingStatus } = useAppStore();

    useEffect(() => {
        if (isNotStarted(statusFetcher)) {
            statusFetcher.fetch(
                `/syforest/sykmelding/${id}/kvittering`,
                undefined,
                (fetchState: FetchState<{ status: Status }>) => {
                    if (hasData(fetchState)) {
                        const { data } = fetchState;
                        setSykmeldingStatus(data.status);
                    }
                },
            );
        }
    }, [id, setSykmeldingStatus, statusFetcher]);

    if (!hasFinished(statusFetcher)) {
        return <Spinner />;
    }

    if (hasFailed(statusFetcher)) {
        return <p>failed to fetch status</p>;
    }

    return <p>{'status: ' + sykmeldingStatus}</p>;
};

export default KvitteringSide;
