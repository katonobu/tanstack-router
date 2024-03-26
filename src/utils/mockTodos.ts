import { PickAsPartial, PickAsRequired } from '@tanstack/react-router'
import { match } from 'assert'
import axios from 'axios'
import { produce } from 'immer'
import { actionDelayFn, loaderDelayFn, shuffle } from './utils'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export type Sheets = {
  range:string
  majorDimension:string
  values:string[][]
}

export type Invoice = {
  id: number
  title: string
  body: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

let invoices: Invoice[] = null!
let users: User[] = null!

let invoicesPromise: Promise<void>
let usersPromise: Promise<void>

const ensureInvoices = async () => {
  if (!invoicesPromise) {
    invoicesPromise = Promise.resolve().then(async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
      )
      invoices = data.slice(0, 10)
    })
  }

  await invoicesPromise
}

const ensureUsers = async () => {
  if (!usersPromise) {
    usersPromise = Promise.resolve().then(async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      )
      users = data.slice(0, 10)
    })
  }

  await usersPromise
}

export async function fetchInvoices() {
  return ensureInvoices().then(() => invoices)
}

export async function fetchInvoiceById(id: number) {
  return ensureInvoices().then(() => {
    const invoice = invoices.find((d) => d.id === id)
    if (!invoice) {
      throw new Error('Invoice not found')
    }
    return invoice
  })
}

export async function postInvoice(partialInvoice: Partial<Invoice>) {
  return actionDelayFn(() => {
    if (partialInvoice.title?.includes('error')) {
      console.log('error')
      throw new Error('Ouch!')
    }
    const invoice = {
      id: invoices.length + 1,
      title:
        partialInvoice.title ?? `New Invoice ${String(Date.now()).slice(0, 5)}`,
      body:
        partialInvoice.body ??
        shuffle(
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. 
      Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.  Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante.
      `.split(' '),
        ).join(' '),
    }
    invoices = [...invoices, invoice]
    return invoice
  })
}

export async function patchInvoice({
  id,
  ...updatedInvoice
}: PickAsRequired<Partial<Invoice>, 'id'>) {
  return actionDelayFn(() => {
    invoices = produce(invoices, (draft) => {
      let invoice = draft.find((d) => d.id === id)
      if (!invoice) {
        throw new Error('Invoice not found.')
      }
      if (updatedInvoice.title?.toLocaleLowerCase()?.includes('error')) {
        throw new Error('Ouch!')
      }
      Object.assign(invoice, updatedInvoice)
    })

    return invoices.find((d) => d.id === id)
  })
}

export type UsersSortBy = 'name' | 'id' | 'email'

export async function fetchUsers({
  filterBy,
  sortBy,
}: { filterBy?: string; sortBy?: UsersSortBy } = {}) {
  return loaderDelayFn(() =>
    ensureUsers().then(() => {
      let usersDraft = users

      if (filterBy) {
        usersDraft = usersDraft.filter((d) =>
          d.name.toLowerCase().includes(filterBy.toLowerCase()),
        )
      }

      if (sortBy) {
        usersDraft = [...usersDraft].sort((a, b) => {
          return a[sortBy] > b[sortBy] ? 1 : -1
        })
      }

      return usersDraft
    }),
  )
}

export async function fetchUserById(id: number) {
  return loaderDelayFn(() =>
    ensureUsers().then(() => users.find((d) => d.id === id)),
  )
}

export async function fetchRandomNumber() {
  return loaderDelayFn(() => {
    return Math.random()
  })
}

//let mentenance: Sheets
let mentenance: Uint8Array
let mentenancePromise: Promise<void>

const ensureMentenance = async () => {
  if (!mentenancePromise) {
    mentenancePromise = Promise.resolve().then(async () => {
//      const { data } = await axios.get(
//        `https://sheets.googleapis.com/v4/spreadsheets/${import.meta.env.VITE_MENTENANCE_SHEET_ID}/values/${import.meta.env.VITE_MENTENANCE_SHEET_NAME}?key=${import.meta.env.VITE_GOOGLE_SHEET_API_KEY}`,
//      )
      const pdfUrl = new URL('../pdfs/dailyInspection.pdf', import.meta.url).href
      const pdfAb = await fetch(pdfUrl).then((res)=>res.arrayBuffer())
      mentenance = new Uint8Array(pdfAb)
    })
  }
  await mentenancePromise
}

export async function fetchMentenance () {
  return ensureMentenance().then(()=> mentenance)
}

let flight: Sheets
let flightPromise: Promise<void>

const ensureFlight = async () => {
  if (!flightPromise) {
    flightPromise = Promise.resolve().then(async () => {
      console.log("ensureFlight")
      const { data } = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${import.meta.env.VITE_FLIGHT_SHEET_ID}/values/${import.meta.env.VITE_FLIGHT_SHEET_NAME}?key=${import.meta.env.VITE_GOOGLE_SHEET_API_KEY}`,
      )
      flight = data
    })
  }

  await flightPromise
}

export async function fetchFlight () {
  return ensureFlight().then(()=> flight)
}

let flightPdf: Uint8Array
let flightPdfPromise: Promise<void>

const param = {
  uas: 'LACIERO-kato',
  sheetNumber: 9999,
  flights: [
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    },
    {
      flightDate: '2024/03/27',
      pilot: 'Nobuo Kato',
      nature: 'Hobby',
      from: 'In my house',
      to: 'In my house',
      offTime: '12:34',
      onTime: '12:54',
      flightTime: '00:20',
      totalFlightTime: '00:20',
      matters: 'No Probrem!!'
    }
  ],
  reports: [
    {
      squawkDate: '2024/03/27',
      flightSquawk: 'No probrem!!',
      actionDate: '2024/03/27',
      correctiveAction: 'Nothing to do!!',
      confirmer: 'Nobuo Kato'
    },
    {
      squawkDate: '2024/03/27',
      flightSquawk: 'No probrem!!',
      actionDate: '2024/03/27',
      correctiveAction: 'Nothing to do!!',
      confirmer: 'Nobuo Kato'
    },
    {
      squawkDate: '2024/03/27',
      flightSquawk: 'No probrem!!',
      actionDate: '2024/03/27',
      correctiveAction: 'Nothing to do!!',
      confirmer: 'Nobuo Kato'
    },
    {
      squawkDate: '2024/03/27',
      flightSquawk: 'No probrem!!',
      actionDate: '2024/03/27',
      correctiveAction: 'Nothing to do!!',
      confirmer: 'Nobuo Kato'
    },
    {
      squawkDate: '2024/03/27',
      flightSquawk: 'No probrem!!',
      actionDate: '2024/03/27',
      correctiveAction: 'Nothing to do!!',
      confirmer: 'Nobuo Kato'
    }
  ]
}

const addText2 = async (
  inPdfBytes:ArrayBuffer,
  param:{
    uas:string,
    sheetNumber:number,
    flights:{
      flightDate: string;
      pilot: string;
      nature: string;
      from: string;
      to: string;
      offTime: string;
      onTime: string;
      flightTime: string;
      totalFlightTime: string;
      matters: string;
    }[],   
    reports:{
      squawkDate: string;
      flightSquawk: string;
      actionDate: string;
      correctiveAction: string;
      confirmer: string;
    }[]}) => {
  // https://pdf-lib.js.org/
  const pdfDoc = await PDFDocument.load(inPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()    
  const now = new Date()

  const textPosSizes = [
      {text:param.uas, x:0.133, y:0.220, size:12},
      {text:param.sheetNumber.toString(10), x:0.14, y:0.88, size:10},
  ]
  for (let i = 0; i < 15; i++) {
      const x = 0.27 + (0.7-0.27)/14 * i
      const flight = param.flights[i]
      textPosSizes.push({
          text:flight.flightDate,
          x,
          y:0.073,
          size:9
      })
      textPosSizes.push({
          text:flight.pilot,
          x,
          y:0.135,
          size:9
      })
      textPosSizes.push({
          text:flight.nature,
          x,
          y:0.22,
          size:9
      })
      textPosSizes.push({
          text:flight.from,
          x,
          y:0.40,
          size:9
      })
      textPosSizes.push({
          text:flight.to,
          x,
          y:0.473,
          size:9
      })
      textPosSizes.push({
          text:flight.offTime,
          x,
          y:0.545,
          size:9
      })
      textPosSizes.push({
          text:flight.onTime,
          x,
          y:0.59,
          size:9
      })
      textPosSizes.push({
          text:flight.flightTime,
          x,
          y:0.635,
          size:9
      })
      textPosSizes.push({
          text:flight.totalFlightTime,
          x,
          y:0.700,
          size:9
      })
      textPosSizes.push({
          text:flight.matters,
          x,
          y:0.775,
          size:9
      })
  }
  for (let i = 0; i < 5; i++) {
      const x = 0.77 + (0.89 - 0.77)/4*i
      const report = param.reports[i]
      textPosSizes.push({
          text:report.squawkDate,
          x,
          y:0.103,
          size:9
      })
      textPosSizes.push({
          text:report.flightSquawk,
          x,
          y:0.163,
          size:9
      })
      textPosSizes.push({
          text:report.actionDate,
          x,
          y:0.473,
          size:9
      })
      textPosSizes.push({
          text:report.correctiveAction,
          x,
          y:0.532,
          size:9
      })
      textPosSizes.push({
          text:report.confirmer,
          x,
          y:0.844,
          size:9
      })
  }

  textPosSizes.forEach((textPosSize)=>{
//        console.log(JSON.stringify(textPosSize))
      firstPage.drawText(textPosSize.text, {
          x: width * textPosSize.x,
          y: height * textPosSize.y,
          size: textPosSize.size,
          font: helveticaFont,    
          color: rgb(0.1, 0.1, 0.1),
          rotate: degrees(90),
      })
  })
  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}

const ensureFlightPdf = async () => {
  if (!flightPdfPromise) {
    flightPdfPromise = Promise.resolve().then(async () => {
      const pdfUrl = new URL('../pdfs/journeylog.pdf', import.meta.url).href
      const pdfAb = await fetch(pdfUrl).then((res)=>res.arrayBuffer())
      flightPdf = await addText2(pdfAb, param)
    })
  }
  await flightPdfPromise
}

export async function fetchFlightPdf () {
  return ensureFlightPdf().then(()=> flightPdf)
}
