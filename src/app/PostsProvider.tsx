import React, { useEffect, useState } from 'react'
import { PostContext } from './storage/context'
import { Post } from './types/types';

export default function PostsProvider({children}: {children: React.ReactNode}) {
  
  const [posts, setPosts] = useState<Post[]>(() => {
    const storagePosts = localStorage.getItem('posts');
    return storagePosts ? JSON.parse(storagePosts) as Post[] : [];
  })

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])
  
  return (
    <PostContext.Provider value={{posts, setPosts}}>
      {children}
    </PostContext.Provider>
  )
}

