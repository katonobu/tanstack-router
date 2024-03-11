import * as React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  console.log(`VITE_API_KEY:${import.meta.env.VITE_API_KEY}`)
  console.log(`VITE_G_API_KEY:${import.meta.env.VITE_G_API_KEY}`) 
  return (
    <>
    <div>Hello world</div>
    <div>{`VITE_API_KEY:${import.meta.env.VITE_API_KEY}`}</div>
    <div>{`VITE_G_API_KEY:${import.meta.env.VITE_G_API_KEY}`}</div>
    <div>Hello world2</div>
    </>
  )
}

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    // <React.StrictMode>
    // <QueryClientProvider client={queryClient}>
      <App />
    // </QueryClientProvider>,
    // </React.StrictMode>
  )
}
