import { usePopupContext } from '@/app/TogglePopupProvider';
import styles from './DeletePopup.module.scss'
import useStorage from '@/app/storage/storage';
import CancelButton from '@/shared/CancelButton/CancelButton';
import DeleteButton from '@/shared/DeleteButton/DeleteButton';
import { useNavigate } from 'react-router';

interface DeletePopupProps {
    postId: number | null,
}

const DeletePopup = ({postId}: DeletePopupProps) => {
  const { removePost } = useStorage();
  const { setDeletePopupOpen } = usePopupContext();
  const navigate = useNavigate()
  
  const handleDelete = (id: number | null) => {
    removePost(id);
    setDeletePopupOpen(prev => !prev)
    navigate('/')
  }

  return (
    <div className={styles.DeletePopup}>
        <h1>Вы уверены, что хотите удалить пост?</h1>
        <div className={styles.PopupButtons}>
            <CancelButton onClick={() => setDeletePopupOpen(prev => !prev)}>Отмена</CancelButton>
            <DeleteButton
                onClick={() => handleDelete(postId)}>
                Удалить
            </DeleteButton>
        </div>
    </div>
  )
}

export default DeletePopup