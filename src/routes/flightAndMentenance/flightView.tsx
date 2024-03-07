import React from 'react';
import { Document, Page } from 'react-pdf';
import { createFileRoute } from '@tanstack/react-router'
import { flightQueryOptions } from '../../utils/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import {pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const pdfUrl = new URL('../../pdfs/journeylog.pdf', import.meta.url).href

export const Route = createFileRoute('/flightAndMentenance/flightView')({
//    loader: (opts) =>
//        opts.context.queryClient.ensureQueryData(flightQueryOptions()),
    component:FlightViewComponent
})

function FlightViewComponent() {
//    const flightQuery = useSuspenseQuery(flightQueryOptions())
//    console.log(flightQuery.data)
    console.log(pdfUrl)
    return <Document file={pdfUrl}>
      <Page pageNumber={1} />
    </Document>
}
