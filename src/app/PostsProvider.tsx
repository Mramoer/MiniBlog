import React, { useState, useEffect, createContext, useContext } from 'react';
import { Post } from './types/types';

export const PostContext = createContext<{
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}>({ posts: [], setPosts: () => {} });

export const usePostsContext = () => useContext(PostContext);

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const data = localStorage.getItem('posts');
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);
  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};
