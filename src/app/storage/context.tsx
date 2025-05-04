import type { Post, Comment, Reaction } from "../types/types";
import { createContext } from "react";

interface PostProps {
    posts: Post[],
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}
interface CommentProps {
    comments: Comment[],
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>
}
interface ReactionProps {
    reactions: Reaction[],
    setReactions: React.Dispatch<React.SetStateAction<Reaction[]>>
}

export const PostContext = createContext<PostProps>({
    posts: [],
    setPosts: () => {}
})

export const CommentContext = createContext<CommentProps>({
    comments: [],
    setComments: () => {}
})

export const ReactionContext = createContext<ReactionProps>({
    reactions: [],
    setReactions: () => {}
})