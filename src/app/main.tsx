import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './routing/router.tsx'
import PostsProvider from './PostsProvider.tsx'
import './index.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostsProvider>
      <RouterProvider router={router}/>
    </PostsProvider>
  </StrictMode>
)
