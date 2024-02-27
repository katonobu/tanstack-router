import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/files/$')({
  component: FilesComponent,
  loader: ({ params }) => Promise.resolve(params._splat)
})

function FilesComponent() {
  const splat = Route.useLoaderData()
  return (
    <div className="p-2">
      <div className="p-2">
        You specify path as #/files/{splat}
      </div>
    </div>
  )
}
