import { createBrowserRouter } from "react-router";
import HomePage from '@/app/HomePage'
import PostForm from "@/pages/PostForm/PostForm";
import Post from "@/entities/Post/Post";
import Layout from "../layout/Layout";
import EditForm from "@/pages/EditForm/EditForm";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            { index: true, element: <HomePage/>},
            { path: 'create', element: <PostForm/> },
            { path: '/post/:id', element: <Post/> },
            { path: '/edit/:id', element: <EditForm/> }, 
        ]
        // errorElement: <ErrorPage/>
    },
])