import { useState } from "react";
import { usePostsContext } from "@/app/PostsProvider";
import { useNavigate, useParams } from "react-router";
import trashbin from '@/assets/trashbin.png';
import useStorage from "@/app/storage/storage";
import { ReactionsType, type Comment } from "@/app/types/types";
import edit from '@/assets/edit-text.png';
import like from '@/assets/reactions/like.svg'
import anger from '@/assets/reactions/anger.svg'
import sadness from '@/assets/reactions/sadness.svg'
import smile from '@/assets/reactions/smile.svg'
import styles from "./Post.module.scss";
import { usePopupContext } from "@/app/TogglePopupProvider";
import DeletePopup from "@/widgets/DeletePopup/DeletePopup";
import EditPopup from "@/widgets/EditPopup/EditPopup";
import CommentList from "@/features/CommentList/CommentList";
import LinkButton from "@/shared/LinkButton/LinkButton";

const Post: React.FC = () => {

  const [comms, setComms] = useState<Comment>({ text: '', author: '', id: Date.now(), postId: 0, date: '' });
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const { posts } = usePostsContext();
  const {id} = useParams();
  const postId = Number(id);
  
  const { addComment, comments, reactions, setReaction, editComment } = useStorage();
  
  const {
    isEditPopupOpen, isDeletePopupOpen, 
    setEditPopupOpen, setDeletePopupOpen
  } = usePopupContext();

  const navigate = useNavigate();
  
  const post = posts?.find(
    (post) => post.id === Number(id)
  )

  const currentTime = () => {
    const date = new Date();
    return date.toLocaleDateString('ru-RU')
  }

  const postComments = comments
    .filter((c) => c.postId === postId)
    .sort((a, b) => {
      const parse = (date: string) => date.split('.').reverse().join('');
      return parse(a.date).localeCompare(parse(b.date));
    });

    const setComment = () => {
      if (
        comms.author.length > 3 && 
        comms.author.length < 10 && 
        comms.text !== '' && 
        comms.text.length <= 200 && 
        post
      ) {
        if (editingComment) {
          editComment({
            ...editingComment,
            text: comms.text,
            author: comms.author,
          });
          setEditingComment(null);
        } else {
          addComment({ ...comms, id: Date.now(), postId, date: currentTime() });
        }
        setComms({ text: '', author: '', id: Date.now(), postId, date: '' });
      }
    };
    

  const currentReaction = reactions.find(r => r.postId === post!.id)
  
  return (
    <div className={styles.PostWrapper}>
      {isDeletePopupOpen && 
            <div className={styles.Overlay}>
              <DeletePopup postId={post!.id}/>
            </div>
          }
          {isEditPopupOpen && 
            <div className={styles.Overlay}>
              <EditPopup postId={post!.id}/>
            </div>
          }
      <button onClick={() => navigate('/')} className={styles.backButton}>🠔 Назад к списку</button>
      {post && (
        <div className={styles.Post}>
          <div className={styles.controlButtons}>
            <button onClick={() => setEditPopupOpen(prev => !prev)}>
              <img src={edit} width={15} height={15} alt="edit" />
            </button>
            <button onClick={() => setDeletePopupOpen(prev => !prev)}>
              <img src={trashbin} width={15} height={15} alt="trashbin" />
            </button>
          </div>
          <h1>{post.title}</h1>
          <h3>{post.description}</h3>
          <p>{post.content}</p>
          <h2>Реакции</h2>
          <div className={styles.Reactions}>
            <button onClick={() => setReaction(ReactionsType.Like, post.id)} name="like">
              <img src={like} alt="like emoji button" role="button" width={20} height={20}/>
              <span>{currentReaction?.type === ReactionsType.Like ? 1 : 0}</span>
            </button>
            <button onClick={() => setReaction(ReactionsType.Anger, post.id)} name="anger">
              <img src={anger} alt="anger emoji" role="button" width={20} height={20}/>
              <span>{currentReaction?.type === ReactionsType.Anger ? 1 : 0}</span>
            </button>
            <button onClick={() => setReaction(ReactionsType.Sadness, post.id)} name="sadness">
              <img src={sadness} alt="sadness emoji button" role="button" width={20} height={20}/>
              <span>{currentReaction?.type === ReactionsType.Sadness ? 1 : 0}</span>
            </button>
            <button onClick={() => setReaction(ReactionsType.Smile, post.id)} name="smile">
              <img src={smile} alt="smile emoji button" role="button" width={20} height={20}/>
              <span>{currentReaction?.type === ReactionsType.Smile ? 1 : 0}</span>
            </button>
          </div>
          <h2>Комментарии ({postComments.length})</h2>
          <input 
            placeholder="Имя автора" 
            type="text" 
            name="author" 
            id="author-input" 
            value={comms.author}
            className={styles.AuthorInput}
            onChange={(e) => setComms({ ...comms, author: e.target.value })}
          />
          <textarea
            value={comms.text}
            onChange={(e) => setComms({ ...comms, text: e.target.value })}
            placeholder="Напишите комментарий..."
          />
          <LinkButton disabled={!comms.text} onClick={setComment}>Отправить</LinkButton>
          <CommentList postComments={postComments}
          onEdit={(comment) => {
            setComms(comment);
            setEditingComment(comment);
          }}/>
        </div>
      )}
    </div>
  );
}

export default Post