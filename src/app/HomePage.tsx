import { useState } from 'react'
import { PostContext } from './storage/context'
import useStorage from './storage/storage'
import PostList from '@/entities/PostList/PostList'
import Layout from './layout/Layout'
import { Post } from './types/types'
import './index.css'


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
