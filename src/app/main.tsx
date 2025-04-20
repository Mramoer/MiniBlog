import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './routing/router.tsx'
import { Provider as ReduxProvider } from 'react-redux'
import store from './store/store.ts'
import './index.css'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ReduxProvider store={store}>
        <RouterProvider router={router}/>
      </ReduxProvider>
  </StrictMode>,
)
