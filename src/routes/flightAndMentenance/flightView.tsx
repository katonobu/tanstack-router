import { createFileRoute } from '@tanstack/react-router'
import { flightQueryOptions } from '../../utils/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/flightAndMentenance/flightView')({
    loader: (opts) =>
        opts.context.queryClient.ensureQueryData(flightQueryOptions()),
    component:FlightViewComponent
})

function FlightViewComponent() {
    const flightQuery = useSuspenseQuery(flightQueryOptions())
    console.log(flightQuery.data)
    
    return <></>
}
