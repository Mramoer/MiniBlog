import { usePostsContext } from "@/app/PostsProvider";
import { useCommentsContext } from "@/app/CommentsProvider";
import { useReactionsContext } from "@/app/ReactionsProvider";
import { Post, Comment, ReactionsType } from "../types/types";

export default function useStorage() {
  const { posts, setPosts } = usePostsContext();
  const { comments, setComments } = useCommentsContext();
  const { reactions, setReactions } = useReactionsContext();

  const addPost = (post: Post) => {
    const updated = [...posts, post];
    setPosts(updated);
  };

  const getStoragePosts = () => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
        return JSON.parse(storedPosts) as Post[];
    }
    return []
}

  const removePost = (id: number | null) => {
    if (id === null) return;
    setComments(comments.filter(comment => comment.postId !== id));
    setReactions(reactions.filter(reaction => reaction.postId !== id));
    setPosts(posts.filter(post => post.id !== id));
  };

  const editPosts = (updatedPost: Post, id: number) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, ...updatedPost } : post))
    );
  };

  const addComment = (comment: Comment) => {
    setComments([...comments, comment]);
  };

  const removeComment = (id: number) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const setReaction = (type: ReactionsType, postId: number ) => {
    const filtered = reactions.filter(r => r.postId !== postId); 
    setReactions([...filtered, { id: Date.now(), postId, type }]);
  };

  const editComment = (updatedComment: Comment) => {
    setComments(prev =>
      prev.map(comment => (comment.id === updatedComment.id ? updatedComment : comment))
    );
  };

  return {
    posts, comments, reactions,
    addPost, removePost,
    addComment, removeComment,
    setReaction, editPosts, getStoragePosts, editComment
  };
}
