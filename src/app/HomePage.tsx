import PostList from '@/entities/PostList/PostList'
import Layout from './layout/Layout'
import './index.css'


function HomePage() {
 
  return (
    <>
      <Layout />
      <div>
        <PostList />
      </div>
    </>
  )
}

export default HomePage;