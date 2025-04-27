import { useState } from 'react'
import { Post } from './types/types'
import Layout from './layout/Layout'
import { PostContext } from './storage/context'
import useStorage from './storage/storage'
import './App.css'
import PostList from '@/entities/PostList/PostList'


function HomePage() {
  
  const {getStoragePosts} = useStorage();
  const storagePosts = getStoragePosts();
  
  const [posts, setPosts] = useState<Post[]>(storagePosts)

  return (
    <>
    <PostContext.Provider value={{ posts, setPosts}}>
      <Layout/>
      <PostList/>
    </PostContext.Provider>
    </>
  )
}

export default HomePage
