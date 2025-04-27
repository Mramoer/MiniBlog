import type { Post } from "../types/types";
import { createContext, useContext } from "react";

interface PostProps {
    posts: Post[],
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

export const PostContext = createContext<PostProps>({
    posts: [],
    setPosts: () => {}
})

export const usePostsContext = () => useContext(PostContext);