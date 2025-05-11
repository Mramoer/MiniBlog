import useStorage from "@/app/storage/storage"
import React, { useState } from "react";
import LinkButton from "@/shared/LinkButton/LinkButton";	
import styles from './CreatePopup.module.scss'
import { usePopupContext } from "@/app/storage/contextProviders/TogglePopupProvider";
import CancelButton from "@/shared/CancelButton/CancelButton";

interface PostFormData {
	title: string;
	description: string;
	content: string;
	id: number;
}


const CreatePopup: React.FC = () => {
	
	const [formData, setFormData] = useState<PostFormData>({
		title: '',
		description: '', 
		content: '', 
		id: Date.now(), 
	});
    
    const { setCreatePopupOpen } = usePopupContext()
	const { addPost } = useStorage();

	function setPost(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		if (formData.title && 
            formData.description && 
            formData.content &&
            formData.title.length <= 50 &&
            formData.description.length <= 100
        ) {
		  addPost(formData);
		  setCreatePopupOpen(prev => !prev)
		}
	}
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
		  ...prev,
		  [name]: value
		}));
	};

 	return (
    <div className={styles.PostForm}>
    	<h2>Создать новый пост</h2>
			<form>
				<label htmlFor="title"><span>*</span>Заголовок</label>
				  <input 
					type="text" 
					value={formData.title} 
					onChange={handleChange} 
					name="title" 
					placeholder="Заголовок поста" 
				  />
				<label htmlFor="description"><span>*</span>Краткое описание</label>
				  <input 
					type="text" 
					value={formData.description} 
					onChange={handleChange} 
					name="description" 
					placeholder="Краткое описание" 
				  />
				<label htmlFor="content"><span>*</span>Содержание</label>
				  <input 
					type="text" 
					value={formData.content} 
					onChange={handleChange} 
					name="content" 
					placeholder="Содержание" 
				  />
			</form>
				<div className={styles.Buttons}>
					<CancelButton 
                      onClick={() => setCreatePopupOpen(prev => !prev)}>
                        Отмена
                    </CancelButton>
					<LinkButton 
					disabled={
						!formData.title || 
						!formData.description || 
						!formData.content
					} 
					onClick={setPost}>Опубликовать</LinkButton>
				</div>
    </div>
  )
}

export default CreatePopup