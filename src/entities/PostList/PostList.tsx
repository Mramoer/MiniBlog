import { usePostsContext } from "@/app/storage/context";
import { useNavigate } from "react-router";
import { ReactionsType } from "@/app/types/types";
import Footer from "@/widgets/Footer/Footer";
import useStorage from "@/app/storage/storage";
import styles from './PostList.module.scss'
import comms from '@/assets/communication.png';
import trash from '@/assets/trashbin.png';
import edit from '@/assets/edit-text.png';
import like from '@/assets/reactions/like.svg'
import anger from '@/assets/reactions/anger.svg'
import sadness from '@/assets/reactions/sadness.svg'
import smile from '@/assets/reactions/smile.svg'

function PostList(){

  const {posts} = usePostsContext();
  const navigate = useNavigate()
  const {removeStoragePosts, setStorageReaction} = useStorage();
  
  const handleNavigate = (id: number) => {
      navigate(`/post/${id}`)
  }
    
  return (
    <div className={styles.PostListWrapper}>
    <div className={styles.PostList}>
      {posts.map((post) => {
        return (
          <div className={styles.Post} key={post.id}>
            <div className={styles.PostInfo}>
              <h3>{post.header}</h3>
              <p>{post.description}</p>
            </div>
            <div className={styles.Buttons}>
              <button onClick={() => handleNavigate(post.id)}>
                <img src={comms} alt="comments button" role="button" width={20} height={20}/>
              </button>
              {
               <>
                <button onClick={() => setStorageReaction(ReactionsType.Like, post.id)} name="like">
                  <img src={like} alt="like emoji button" role="button" width={20} height={20}/>
                  <span>{post.reaction === ReactionsType.Like ? 1 : 0}</span>
                </button>
                <button onClick={() => setStorageReaction(ReactionsType.Anger, post.id)} name="anger">
                  <img src={anger} alt="anger emoji" role="button" width={20} height={20}/>
                  <span>{post.reaction === ReactionsType.Anger ? 1 : 0}</span>
                </button>
                <button onClick={() => setStorageReaction(ReactionsType.Sadness, post.id)} name="sadness">
                  <img src={sadness} alt="sadness emoji button" role="button" width={20} height={20}/>
                  <span>{post.reaction === ReactionsType.Sadness ? 1 : 0}</span>
                </button>
                <button onClick={() => setStorageReaction(ReactionsType.Smile, post.id)} name="smile">
                  <img src={smile} alt="smile emoji button" role="button" width={20} height={20}/>
                  <span>{post.reaction === ReactionsType.Smile ? 1 : 0}</span>
                </button>
               </>
              }
              <button onClick={() => (navigate(`/edit/${post.id}`))}>
                <img src={edit} alt="edit button" role="button" width={20} height={20}/>
              </button>
              <button onClick={() => removeStoragePosts(post.id)}>
                <img src={trash} alt="trash button" role="button" width={20} height={20}/>
              </button>
            </div>
          </div>
        )
      })}
    </div>
    <Footer/>
    </div>
  )
}

export default PostList