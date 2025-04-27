import { createBrowserRouter } from "react-router";
import HomePage from '@/app/HomePage'
import PostForm from "@/pages/PostForm";
import Post from "@/entities/Post/Post";
import Layout from "../layout/Layout";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            { index: true, element: <HomePage/>},
            { path: 'create', element: <PostForm/> },
            { path: '/post/:id', element: <Post/> }
        ]
        // errorElement: <ErrorPage/>
    },
])