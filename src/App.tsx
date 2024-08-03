import { Toaster } from 'react-hot-toast'
import './App.css'
import { routes } from './routes'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <>
      <Toaster />
     <RouterProvider router={routes} />
    </>
  )
}

export default App
