import * as React from 'react'
import Iframe from "react-iframe"

export function FormIframe({
  baseUrl,
  params,
}: {
  baseUrl:string
  params:Record<string, string>
}) {
    const url = baseUrl + new URLSearchParams(params).toString() 
    return   <Iframe 
      url={url} 
      width="100%"
      height="800px"
    />
}
