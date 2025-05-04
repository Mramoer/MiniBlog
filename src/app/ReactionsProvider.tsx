import React, { useState, useEffect, createContext, useContext } from 'react';
import { Reaction } from './types/types';

const ReactionContext = createContext<{
  reactions: Reaction[];
  setReactions: React.Dispatch<React.SetStateAction<Reaction[]>>;
}>({ reactions: [], setReactions: () => {} });

export const useReactionsContext = () => useContext(ReactionContext);

export const ReactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [reactions, setReactions] = useState<Reaction[]>(() => {
    const data = localStorage.getItem('reactions');
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem('reactions', JSON.stringify(reactions));
  }, [reactions]);

  return (
    <ReactionContext.Provider value={{ reactions, setReactions }}>
      {children}
    </ReactionContext.Provider>
  );
};