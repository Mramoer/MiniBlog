import Footer from "@/widgets/Footer/Footer";
import styles from "./PostList.module.scss";
import DeletePopup from "@/widgets/DeletePopup/DeletePopup";
import { usePopupContext } from "@/app/storage/contextProviders/TogglePopupProvider";
import { useState } from "react";
import CreatePopup from "@/widgets/CreatePopup/CreatePopup";
import EditPopup from "@/widgets/EditPopup/EditPopup";
import BriefPost from "../BriefPost/BriefPost";

const PostList: React.FC = () => {
  
  const {
    isDeletePopupOpen,
    isCreatePopupOpen,
    isEditPopupOpen,
  } = usePopupContext();

  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const [editPostId, setEditPostId] = useState<number | null>(null);

  return (
    <div className={styles.PostListWrapper}>
      {isDeletePopupOpen && (
        <div className={styles.Overlay}>
          <DeletePopup postId={deletePostId} />
        </div>
      )}
      {isCreatePopupOpen && (
        <div className={styles.Overlay}>
          <CreatePopup />
        </div>
      )}
      {isEditPopupOpen && (
        <div className={styles.Overlay}>
          <EditPopup postId={editPostId} />
        </div>
      )}

      <div
        className={styles.PostList}
      >
        <BriefPost setDeletePostId={setDeletePostId} setEditPostId={setEditPostId}/>
      </div>
      <Footer />
    </div>
  );
};

export default PostList;
