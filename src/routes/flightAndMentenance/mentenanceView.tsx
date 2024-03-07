import React from 'react';
import { Document, Page } from 'react-pdf';
import { createFileRoute } from '@tanstack/react-router'
import { mentenanceQueryOptions } from '../../utils/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import {pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const pdfUrl = new URL('../../pdfs/dailyInspection.pdf', import.meta.url).href

export const Route = createFileRoute('/flightAndMentenance/mentenanceView')({
//    loader: (opts) =>
//        opts.context.queryClient.ensureQueryData(mentenanceQueryOptions()),
    component:MentenanceViewComponent
})

function MentenanceViewComponent() {
//    const mentenanceQuery = useSuspenseQuery(mentenanceQueryOptions())
//    console.log(mentenanceQuery.data)

    console.log(pdfUrl)
    return <Document file={pdfUrl}>
      <Page pageNumber={1} />
    </Document>
}
