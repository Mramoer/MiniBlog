import React, { useState, useEffect, createContext, useContext } from 'react';
import { Comment } from './types/types';

const CommentContext = createContext<{
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}>({ comments: [], setComments: () => {} });

export const useCommentsContext = () => useContext(CommentContext);

export const CommentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>(() => {
    const data = localStorage.getItem('comments');
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  return (
    <CommentContext.Provider value={{ comments, setComments }}>
      {children}
    </CommentContext.Provider>
  );
};