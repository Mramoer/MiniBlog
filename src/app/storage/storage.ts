import { usePostsContext } from "./context"
import { Comment, Post, ReactionsType } from "../types/types";


export default function useStorage() {
    
    const {setPosts} = usePostsContext()

    const getStoragePosts = () => {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
            return JSON.parse(storedPosts) as Post[];
        }
        return []
    }

    const setStoragePosts = (post: Post) => {
        setPosts(prev => [...prev, post]);
    }

    const removeStoragePosts = (id: number | string | undefined) => {
        setPosts(
            (prev) => {
                const updatedPosts = prev.filter(post => post.id !== id )
                localStorage.setItem('posts', JSON.stringify(updatedPosts));
                return updatedPosts;
            }
        );
    }

    const setStorageComment = (comment: Comment, id: number) => {
        setPosts(prevPosts => {
            const updatedPosts = prevPosts.map(post => 
              post.id === id 
              ? { ...post, comments: [...post.comments, comment] } 
              : post
            )
            return updatedPosts
        });
    };

    const removeStorageComment = (commId: number, postID: number) => {
        setPosts((prev) => {
            const updatedComms = prev.map(post => 
                post.id === postID 
                ? { ...post, comments: post.comments.filter((comm) => comm.id !== commId) } 
                : post
            )
            return updatedComms
        })
    }
    
    const editStoragePosts = ({header, description, filling}: Post, id: number) => {
        setPosts((prev) => {
            const updatedPosts = prev.map((post) => {
                return post.id === id
                ? {...post, header, description, filling }
                : post
            })
            return updatedPosts
        })
    }

    const setStorageReaction = (IncomingReaction: ReactionsType, postId: number) => {
        setPosts((prev) => {
            const updatedPosts = prev.map((post) => {
                return post.id === postId
                ? {...post, reaction: post.reaction === IncomingReaction ? null : IncomingReaction}
                : post
            })
            return updatedPosts
        })
    }

    return { 
        getStoragePosts, 
        setStoragePosts, 
        removeStoragePosts, 
        setStorageComment, 
        removeStorageComment,
        editStoragePosts,
        setStorageReaction
    }
}