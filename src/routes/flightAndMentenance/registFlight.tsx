import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { FormIframe } from "../../components/FormIframe"

export const Route = createFileRoute('/flightAndMentenance/registFlight')({
  component: () => {
    const params = {
      usp:"pp_url",
      "entry.854064930":"LACIERO-kato",
      "entry.1705732587":"加藤 伸雄",
      "entry.731946653":"趣味",
      "entry.552400495":"自宅",
      "entry.58889292":"不具合事項の発生なし",
      embedded:"true"
    }
    const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdhPdjPyVKjXNo9g6e2eJdX3zEAPFlXtGGeK9xUBCt04TIvQA/viewform?"
    return   <FormIframe
      baseUrl={baseUrl} 
      params={params}
    />
  }
})