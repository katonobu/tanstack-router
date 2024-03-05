import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Iframe from "react-iframe"
import { mentenanceQueryOptions } from '../../utils/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/flightAndMentenance/')({
    loader: (opts) =>
        opts.context.queryClient.ensureQueryData(mentenanceQueryOptions()),

    component: FlightAndMentenanceComponent
})

function FlightAndMentenanceComponent() {
    const mentenanceQuery = useSuspenseQuery(mentenanceQueryOptions())
    console.log(mentenanceQuery.data)

    return (
        <>
            <Iframe 
                url={"https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_H3ljCtIi8ajL3QpCYlTwquMkaqNmOAWNwOORbJA7aOyUIiv9TipDnOz8goPTqPqLtzfwAVhP0BJ9/pubhtml?gid=1144661007&amp;single=true&amp;widget=true&amp;headers=false"} 
                width="100%"
                height="300px"
            />    
            <Iframe 
                url={"https://docs.google.com/spreadsheets/d/e/2PACX-1vQeOE2QyoVM59LC05ydaHUL5vdMuMu2I61AAr2RqVaYgB_jhnDzoGMbAXVhDh8NpPcau1iiW4eIqUHO/pubhtml?gid=573569988&amp;single=true&amp;widget=true&amp;headers=false"} 
                width="100%"
                height="300px"
            />    
        </>
    )
}  

