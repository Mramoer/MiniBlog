import useStorage from '@/app/storage/storage';
import styles from './CommentList.module.scss';
import trashbin from '@/assets/trashbin.png';
import profile from '@/assets/profile.svg';
import type { Comment } from '@/app/types/types';
import edit from '@/assets/edit-text.png';

interface CommentListProps {
    postComments: Comment[];
    onEdit: (comment: Comment) => void;
}

const CommentList = ({postComments, onEdit}: CommentListProps) => {
    const {removeComment} = useStorage();
  return (
    <>
    {postComments.map((comment) => (
        <div key={comment.id} className={styles.CommentSection}>
          <div className={styles.Comment}>
            <div className={styles.CommentInfo}>
              <img src={profile} width={50} height={50} alt="user profile" />
              <h3>{comment.author}</h3>
              <span>{comment.date}</span>
            </div>
            <button onClick={() => onEdit(comment)} className={styles.EditButton}>
                <img src={edit} width={15} height={15}/>
            </button>
            <button
              className={styles.DeleteButton}
              onClick={() => removeComment(comment.id)}>
                <img src={trashbin} width={15} height={15} />
            </button>
            <p className={styles.CommentText}>{comment.text}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default CommentList