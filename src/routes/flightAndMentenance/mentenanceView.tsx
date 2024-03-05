import { createFileRoute } from '@tanstack/react-router'
import { mentenanceQueryOptions } from '../../utils/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/flightAndMentenance/mentenanceView')({
    loader: (opts) =>
        opts.context.queryClient.ensureQueryData(mentenanceQueryOptions()),
    component:MentenanceViewComponent
})

function MentenanceViewComponent() {
    const mentenanceQuery = useSuspenseQuery(mentenanceQueryOptions())
    console.log(mentenanceQuery.data)

    return <div>Hello /flightAndMentenance/mentenanceView!</div>
}
