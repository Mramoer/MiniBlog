import { usePostsContext } from "@/app/storage/context";
import { useNavigate } from "react-router";
import styles from './PostList.module.scss'
import useStorage from "@/app/storage/storage";
import comms from '@/assets/communication.png';
import like from '@/assets/like.png';
import trash from '@/assets/trashbin.png';
import edit from '@/assets/edit-text.png';


function PostList(){

  const {posts} = usePostsContext();
  const navigate = useNavigate()
  const {removeStoragePosts} = useStorage();
  
  const handleNavigate = (id: number) => {
      navigate(`/post/${id}`)
  }
    
  return (
    <div className={styles.PostList}>
      {posts.map((post) => {
        return (
          <div className={styles.Post} key={post.id}>
            <div className={styles.PostInfo}>
              <h1>{post.header}</h1>
              <p>{post.description}</p>
            </div>
            <div className={styles.Buttons}>
              <button onClick={() => handleNavigate(post.id)}>
                <img src={comms} alt="commets button" role="button" width={20} height={20}/>
              </button>
              <button>
                <img src={like} alt="commets button" role="button" width={20} height={20}/>
              </button>
              <button>
                <img src={edit} alt="commets button" role="button" width={20} height={20}/>
              </button>
              <button onClick={() => removeStoragePosts(post.id)}>
                <img src={trash} alt="commets button" role="button" width={20} height={20}/>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PostList