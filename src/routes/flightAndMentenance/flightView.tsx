import React from 'react';
import { Document, Page } from 'react-pdf';
import { createFileRoute } from '@tanstack/react-router'
import { flightPdfQueryOptions } from '../../utils/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import 'react-pdf/dist/Page/TextLayer.css';

export const Route = createFileRoute('/flightAndMentenance/flightView')({
    loader: (opts) =>
        opts.context.queryClient.ensureQueryData(flightPdfQueryOptions()),
    component:FlightViewComponent
})

function FlightViewComponent() {
    const flightQuery = useSuspenseQuery(flightPdfQueryOptions())

    return (
        <Document file={{data:flightQuery.data}}>
            <Page pageNumber={1} />
        </Document>
    )
}
