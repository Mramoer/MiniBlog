import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './routes/router.tsx'
import './index.css'
import AppProviders from './storage/contextProviders/AppProviders.tsx'



createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
  </AppProviders>
)
