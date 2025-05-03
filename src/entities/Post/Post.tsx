import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useStorage from "@/app/storage/storage";
import { usePostsContext } from "@/app/storage/context";
import type { Comment } from "@/app/types/types";
import trashbin from '@/assets/trashbin.png';
import edit from '@/assets/edit-text.png';
import profile from '@/assets/profile.svg';
import styles from "./Post.module.scss";

function Post() {
  const navigate = useNavigate()
  const [comms, setComms] = useState<Comment>({text:'', id: Date.now()});
  const {posts} = usePostsContext();
  const {id} = useParams<{id:string}>();
  const {setStorageComment, removeStorageComment, removeStoragePosts} = useStorage();

  const post = posts?.find(
    (post) => post.id === Number(id)
  )

  function addComment() {
    if (comms.text !== '' && post) {
      setStorageComment(comms, post.id);
    }
    setComms({text: '', id: Date.now()})
  }

  const handleNavigate = (id: number) => {
    navigate(`/edit/${id}`)
  }

  const handleDeletePost = () => {
    removeStoragePosts(post!.id);
    navigate('/');
  }

  return (
    <div className={styles.PostWrapper}>
      <button onClick={() => navigate('/')} className={styles.backButton}>Назад к списку</button>
      {
      <div className={styles.Post}>
        <div className={styles.controlButtons}>
          <button onClick={() => handleNavigate(post!.id)}>
            <img src={edit} width={15} height={15} alt="edit" />
          </button>
          <button onClick={handleDeletePost}>
            <img src={trashbin} width={15} height={15} alt="trashbin" />
          </button>
        </div>
        <h1>{post?.header}</h1>
        <h3>{post?.description}</h3> 
        <p>{post?.filling}</p>
        <h2>Реакции</h2>
        <h2>Комментарии ({post?.comments.length})</h2>
        <textarea 
          name="comments.text" 
          id="comments" 
          value={comms.text}
          onChange={(e) => setComms({text: e.target.value, id: Date.now()})} 
          placeholder="Напишите комментарий...">
        </textarea>
        <br/>
        <button disabled={!comms.text} type="button" onClick={() => addComment()}>Отправить</button>
        {
          post?.comments?.map((comment) => {
            return (
              <div className={styles.CommentSection}>
                <div key={comment.id} className={styles.Comment}>
                <div className={styles.CommentInfo}>
                  <img src={profile} width={25} height={25} alt="user profile" />
                  <h3>Дима</h3>
                  <h2></h2>
                  <button className={styles.DeleteButton} onClick={() => removeStorageComment(comment.id, post.id)}>
                    <img 
                      src={trashbin} 
                      width={15} 
                      height={15} 
                    />
                  </button>
                </div>
                <p>{comment.text}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    }
    </div>
  )
}

export default Post