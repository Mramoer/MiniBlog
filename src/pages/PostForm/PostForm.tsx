import { useNavigate } from "react-router"
import useStorage from "@/app/storage/storage"
import styles from './PostForm.module.scss'
import { useState } from "react";
import { Post } from "@/app/types/types";
import LinkButton from "@/shared/LinkButton/LinkButton";

function PostForm() {
	
	const [formData, setFormData] = useState<Post>({
		header: '',
		description: '', 
		filling: '', 
		id: Date.now(), 
		comments: []
	});

	const {setStoragePosts} = useStorage();
	const navigate = useNavigate();

	function addPost(e: React.FormEvent<HTMLButtonElement>) {
		if (
			formData.header !== '' && 
			formData.description !== '' && 
			formData.filling !== ''
		) {
			e.preventDefault();
			setStoragePosts(formData)
			navigate('/')
		}
	}
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const {name, value} = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	} 

 	return (
    <div className={styles.PostForm}>
    	<h2>Создать новый пост</h2>
			<form>
				<label htmlFor="header">Заголовок</label>
				  <input 
					type="text" 
					value={formData.header} 
					onChange={handleChange} 
					name="header" 
					placeholder="Введите заголовок поста" 
				  />
				<label htmlFor="description">Краткое описание</label>
				  <input 
					type="text" 
					value={formData.description} 
					onChange={handleChange} 
					name="description" 
					placeholder="Введите заголовок поста" 
				  />
				<label htmlFor="filling">Содержание</label>
				  <input 
					type="text" 
					value={formData.filling} 
					onChange={handleChange} 
					name="filling" 
					placeholder="Введите заголовок поста" 
				  />
			</form>
				<div className={styles.Buttons}>
					<LinkButton path='/'>Отмена</LinkButton>
					<button 
					disabled={
						!formData.header || 
						!formData.description || 
						!formData.filling
					} 
					onClick={addPost}>Опубликовать</button>
				</div>
    </div>
  )
}

export default PostForm