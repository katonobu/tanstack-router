import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Iframe from "react-iframe"

export const Route = createFileRoute('/flightAndMentenance/registMentenance')({
  component: () => <Iframe 
    url={"https://docs.google.com/forms/d/e/1FAIpQLSdAHSi1u68LVxzAwN-Qbi3ymaOiQfZArhUWHIXGFh_fTgE1HQ/viewform?embedded=true"} 
    width="100%"
    height="800px"
    />
})