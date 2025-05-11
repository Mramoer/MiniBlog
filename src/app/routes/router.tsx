import { createBrowserRouter } from "react-router";
import HomePage from '@/app/HomePage'
import Post from "@/pages/Post/Post";
import Layout from "../layout/Layout";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            { index: true, element: <HomePage/>},
            { path: '/post/:id', element: <Post/> },
        ],
        errorElement: <ErrorPage/>
    }
])