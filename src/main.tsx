import * as React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  ErrorComponent,
  createRouter,
  createHashHistory,
} from '@tanstack/react-router'
import { auth } from './utils/auth'
import { Spinner } from './components/Spinner'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {pdfjs} from "react-pdf";
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';
//

export const queryClient = new QueryClient()

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const hashHistory = createHashHistory()

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <Spinner />
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!, // We'll inject this when we render
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  history: hashHistory
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <>
      <RouterProvider
        router={router}
        defaultPreload="intent"
        context={{
          auth,
        }}
      />
    </>
  )
}

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
    // </React.StrictMode>
  )
}
