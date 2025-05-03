import { useNavigate, useParams } from 'react-router'
import styles from './EditForm.module.scss'
import { usePostsContext } from '@/app/storage/context';
import { useState } from 'react';
import { Post } from '@/app/types/types';
import useStorage from '@/app/storage/storage';
import LinkButton from '@/shared/LinkButton/LinkButton';

const EditForm = () => {
  const [editData, setEditData] = useState<Post>({
    header: '',
    description: '',
    filling: '',
    id: Date.now(),
    comments: []
  });

  const {editStoragePosts} = useStorage();

  const {posts} = usePostsContext()
  const {id} = useParams();
  const post = posts.find((post) => post.id === Number(id));
  const navigate = useNavigate();

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
        editData.header !== '' && 
        editData.description !== '' && 
        editData.filling !== ''
    ) {
        e.preventDefault();
        editStoragePosts(editData, post!.id);
        navigate('/');
    }
  }
      
  return (
    <div className={styles.EditForm}>
    	<h2>Создать новый пост</h2>
			<form>
				<label htmlFor="header">Заголовок</label>
				  <input 
					type="text" 
					value={editData?.header} 
					onChange={handleChange} 
					name="header" 
					placeholder="Введите заголовок поста" 
				  />
				<label htmlFor="description">Краткое описание</label>
				  <input 
					type="text" 
					value={editData?.description} 
					onChange={handleChange} 
					name="description" 
					placeholder="Введите заголовок поста" 
				  />
				<label htmlFor="filling">Содержание</label>
				  <input 
					type="text" 
					value={editData?.filling} 
					onChange={handleChange} 
					name="filling" 
					placeholder="Введите заголовок поста" 
				  />
			</form>
			<div className={styles.Buttons}>
			<LinkButton path='/'>Отмена</LinkButton>
				<button 
				  disabled={
					!editData?.header || 
					!editData?.description || 
					!editData?.filling
				  } 
				onClick={(e) => editPost(e)}>Сохранить</button>
			</div>
    </div>
  )
}

export default EditForm