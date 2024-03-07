import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { createFileRoute } from '@tanstack/react-router'
import { flightQueryOptions } from '../../utils/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import {pdfjs} from "react-pdf";
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const pdfUrl = new URL('../../pdfs/journeylog.pdf', import.meta.url).href

const addText = async (url:string):Promise<Uint8Array> => {
    // https://pdf-lib.js.org/
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()    

    const txtPosSizes = [
        {text:"REGISTRATION", x:0.135, y:0.215, size:12},
        {text:"9999", x:0.14, y:0.88, size:10},
        {text:"2024/12/31", x:0.27, y:0.073, size:9},
        {text:"FlightSafty", x:0.7, y:0.775, size:12},
        {text:"2024/12/31", x:0.77, y:0.105, size:9},
        {text:"Confirmed", x:0.89, y:0.844, size:10}
    ]

    // https://www.migaro.co.jp/tips/2386/
    /*
    for (let x = 1; x <= 10; x++) {
        for (let y = 0; y <= 10; y++) {
            firstPage.drawText(`[x=${x},y=${y}]`, {
                x: width * x / 10,
                y: height * y / 10,
                size: 10,
                font: helveticaFont,    
                color: rgb(0.1, 0.1, 0.1),
                rotate: degrees(90),
            })
        }
    }
    */
    for( const txtPosSize of txtPosSizes){
        console.log(JSON.stringify(txtPosSize))
        firstPage.drawText(txtPosSize.text, {
            x: width * txtPosSize.x,
            y: height * txtPosSize.y,
            size: txtPosSize.size,
            font: helveticaFont,    
            color: rgb(0.95, 0.1, 0.1),
            rotate: degrees(90),
        })
    }
    const pdfBytes = await pdfDoc.save()
    return pdfBytes
}

export const Route = createFileRoute('/flightAndMentenance/flightView')({
//    loader: (opts) =>
//        opts.context.queryClient.ensureQueryData(flightQueryOptions()),
    component:FlightViewComponent
})

function FlightViewComponent() {
    const [pdfBytes, setPdfBytes] = useState<Uint8Array|null>(null)
    useEffect(()=>{
        addText(pdfUrl).then((pdfBytes)=>setPdfBytes(pdfBytes))
        return ()=>setPdfBytes(null)
    }, [])
//    const flightQuery = useSuspenseQuery(flightQueryOptions())
//    console.log(flightQuery.data)
    console.log(pdfUrl)
    return (
        pdfBytes?
            <Document file={{data:pdfBytes}}>
                <Page pageNumber={1} />
            </Document>
        :
            <p>loading pdf</p>
    )
    
}
