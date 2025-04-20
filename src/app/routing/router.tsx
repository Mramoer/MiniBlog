import { createBrowserRouter } from "react-router";
import HomePage from '@/app/HomePage'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,
        // errorElement: <ErrorPage/>
    },
    {
        path: '/post/:id',
        // element: <Post/>
    },
])