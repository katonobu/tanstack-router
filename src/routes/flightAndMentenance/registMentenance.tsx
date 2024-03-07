import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { FormIframe } from "../../components/FormIframe"

export const Route = createFileRoute('/flightAndMentenance/registMentenance')({
  component: () => {
    const params = {
      usp:"pp_url",
      "entry.1178305092":"LACIERO-kato",
      "entry.778973069":"正常",
      "entry.981231938":"正常",
      "entry.1965499555":"正常",
      "entry.205117602":"正常",
      "entry.1994480223":"正常",
      "entry.1868364639":"正常",
      "entry.270690961":"正常",
      "entry.538575666":"正常",
      "entry.1084140654":"正常",
      "entry.1458526165":"正常",
      "entry.117949121":"加藤 伸雄",
      embedded:"true"
    }
    const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdAHSi1u68LVxzAwN-Qbi3ymaOiQfZArhUWHIXGFh_fTgE1HQ/viewform?"
    return   <FormIframe
      baseUrl={baseUrl} 
      params={params}
    />
  }
})