import * as React from 'react'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/flightAndMentenance')({
  component: DashboardComponent,
})

function DashboardComponent() {
  return (
    <>
      <div className="flex items-center border-b">
        <h2 className="text-xl p-2">Dashboard</h2>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ['/flightAndMentenance', '日常点検記録/飛行記録', true],
            ['/flightAndMentenance/registMentenance', '日常点検記録の入力'],
            ['/flightAndMentenance/registFlight', '飛行記録の入力'],
          ] as const
        ).map(([to, label, exact]) => {
          return (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact }}
              activeProps={{ className: `font-bold` }}
              className="p-2"
            >
              {label}
            </Link>
          )
        })}
      </div>
      <hr />
      <Outlet />
    </>
  )
}
