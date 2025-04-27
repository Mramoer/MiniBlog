import { useState } from "react"
import { useParams } from "react-router";
import useStorage from "@/app/storage/storage";
import { usePostsContext } from "@/app/storage/context";
import type { Comment } from "@/app/types/types";
import trashbin from '@/assets/trashbin.png'
import styles from "./Post.module.scss"

function Post() {
  const [comms, setComms] = useState<Comment>({text:'', id: Date.now()});
  const {posts} = usePostsContext();
  const {id} = useParams<{id:string}>();
  const {setStorageComment, removeStorageComment} = useStorage();

  const post = posts?.find(
    (post) => post.id === Number(id)
  )

  function addComment() {
    if (comms.text !== '' && post) {
      setStorageComment(comms, post.id);
    }
    setComms({text: '', id: Date.now()})
  }

  return (
    <>
    {
        <div className={styles.Post}>
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
            <button disabled={!comms.text} type="button" onClick={() => addComment()}>Отправить</button>
            {
              post?.comments?.map((comment) => {
                return (
                  <div key={comment.id}>
                    <div>
                      <button onClick={() => removeStorageComment(comment.id, post.id)}>
                      <img 
                        src={trashbin} 
                        width={15} 
                        height={15} 
                      />
                      </button>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                )
              })
            }
        </div>
    }
    </>
  )
}

export default Post