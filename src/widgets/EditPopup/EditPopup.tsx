import { useState } from 'react';
import useStorage from '@/app/storage/storage';
import LinkButton from '@/shared/LinkButton/LinkButton';
import { usePostsContext } from '@/app/storage/contextProviders/PostsProvider';
import styles from './EditPopup.module.scss'
import { usePopupContext } from '@/app/storage/contextProviders/TogglePopupProvider';
import CancelButton from '@/shared/CancelButton/CancelButton';


interface EditPopupProps {
    postId: number | null;
}

interface EditFormData {
    title: string;
    description: string;
    content: string;
    id: number;
}

const EditPopup = ({postId}: EditPopupProps) => {
  const [editData, setEditData] = useState<EditFormData>({
    title: '',
    description: '',
    content: '',
    id: Date.now(),
  });

  const {editPosts} = useStorage();
  const {posts} = usePostsContext();
  const post = posts.find((post) => post.id === Number(postId));
  const {setEditPopupOpen} = usePopupContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {name, value} = e.target;
    setEditData(prev => ({
        ...prev,
        [name]: value
    }));
  } 

  const editPost = (e: React.FormEvent<HTMLButtonElement>) => {
    if (
        editData.title !== '' && 
        editData.description !== '' && 
        editData.content !== ''
    ) {
        e.preventDefault();
        editPosts(editData, post!.id);
        setEditPopupOpen(edit => !edit)
    }
  }
      
  return (
    <div className={styles.EditForm}>
    	<h2>Редактировать пост</h2>
			<form>
				<label htmlFor="title"><span>*</span>Заголовок</label>
				  <input 
					type="text" 
					value={editData?.title} 
					onChange={handleChange} 
					name="title" 
					placeholder="Введите заголовок поста" 
				  />
				<label htmlFor="description"><span>*</span>Краткое описание</label>
				  <input 
					type="text" 
					value={editData?.description} 
					onChange={handleChange} 
					name="description" 
					placeholder="Введите заголовок поста" 
				  />
				<label htmlFor="content"><span>*</span>Содержание</label>
				  <input 
					type="text" 
					value={editData?.content} 
					onChange={handleChange} 
					name="content" 
					placeholder="Введите заголовок поста" 
				  />
			</form>
			<div className={styles.Buttons}>
			<CancelButton onClick={() => setEditPopupOpen(prev => !prev)}>Отмена</CancelButton>
			<LinkButton
			  disabled={
				!editData?.title || 
				!editData?.description || 
				!editData?.content
			  } 
			  onClick={(e) => editPost(e)}>Сохранить
            </LinkButton>
			</div>
    </div>
  )
}

export default EditPopup