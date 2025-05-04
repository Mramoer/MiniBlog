
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
import { usePostsContext } from "@/app/PostsProvider";
import DeletePopup from "@/widgets/DeletePopup/DeletePopup";
import { usePopupContext } from "@/app/TogglePopupProvider";
import { useState } from "react";
import CreatePopup from "@/widgets/CreatePopup/CreatePopup";
import EditPopup from "@/widgets/EditPopup/EditPopup";

const PostList: React.FC = () => {

  const {posts} = usePostsContext();
  const navigate = useNavigate()
  const { setReaction, reactions} = useStorage();
  const {
    isDeletePopupOpen, setDeletePopupOpen, 
    isCreatePopupOpen, 
    isEditPopupOpen, setEditPopupOpen
  } = usePopupContext();

  const [deletePostId, setDeletePostId] = useState<number | null>(null)
  const [editPostId, setEditPostId] = useState<number | null>(null)
  
  const handleNavigate = (id: number) => {
      navigate(`/post/${id}`)
  }

  const toggleDeletePopup = (id: number) => {
    setDeletePostId(id);
    setDeletePopupOpen(prev => !prev);
  }

  const toggleEditPopup = (id: number | null) => {
    setEditPostId(id);
    setEditPopupOpen(prev => !prev)
  }
  
  return (
    <div className={styles.PostListWrapper}>
          {isDeletePopupOpen && 
            <div className={styles.Overlay}>
              <DeletePopup postId={deletePostId}/>
            </div>
          }
          {isCreatePopupOpen && 
            <div className={styles.Overlay}>
              <CreatePopup/>
            </div>
          }
          {isEditPopupOpen && 
            <div className={styles.Overlay}>
              <EditPopup postId={editPostId}/>
            </div>
          }
      
      <div className={styles.PostList} style={{display: isEditPopupOpen || isCreatePopupOpen ? "none" : "grid"}}>
        {
          posts.map((post) => {
            const currentReaction = reactions.find(r => r.postId === post.id);
            return (
              <div key={post.id}>
          <div className={styles.Post} >
            <div className={styles.PostInfo}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
            <div className={styles.Buttons}>
              <button onClick={() => handleNavigate(post.id)}>
                <img src={comms} alt="comments button" role="button" style={{ width: "1vw", height: "1vw" }}/>
              </button>
              {
                <>
                <button onClick={() => setReaction(ReactionsType.Like, post.id)} name="like">
                  <img src={like} alt="like emoji button" role="button" style={{ width: "1vw", height: "1vw" }}/>
                  <span>{currentReaction?.type === ReactionsType.Like ? 1 : 0}</span>
                </button>
                <button onClick={() => setReaction(ReactionsType.Anger, post.id)} name="anger">
                  <img src={anger} alt="anger emoji" role="button" style={{ width: "1vw", height: "1vw" }}/>
                  <span>{currentReaction?.type === ReactionsType.Anger ? 1 : 0}</span>
                </button>
                <button onClick={() => setReaction(ReactionsType.Sadness, post.id)} name="sadness">
                  <img src={sadness} alt="sadness emoji button" role="button" style={{ width: "1vw", height: "1vw" }}/>
                  <span>{currentReaction?.type === ReactionsType.Sadness ? 1 : 0}</span>
                </button>
                <button onClick={() => setReaction(ReactionsType.Smile, post.id)} name="smile">
                  <img src={smile} alt="smile emoji button" role="button" style={{ width: "1vw", height: "1vw" }}/>
                  <span>{currentReaction?.type === ReactionsType.Smile ? 1 : 0}</span>
                </button>
                </>
              }
              <button onClick={() => toggleEditPopup(post.id)}>
                <img src={edit} alt="edit button" role="button" style={{ width: "1vw", height: "1vw" }}/>
              </button>
              <button onClick={() => toggleDeletePopup(post.id)}>
                <img src={trash} alt="trash button" role="button" style={{ width: "1vw", height: "1vw" }}/>
              </button>
            </div>
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