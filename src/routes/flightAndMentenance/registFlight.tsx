import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Iframe from "react-iframe"

export const Route = createFileRoute('/flightAndMentenance/registFlight')({
  component: () => <Iframe 
    url={"https://docs.google.com/forms/d/e/1FAIpQLSdhPdjPyVKjXNo9g6e2eJdX3zEAPFlXtGGeK9xUBCt04TIvQA/viewform?embedded=true"} 
    width="100%"
    height="800px"
    />
})