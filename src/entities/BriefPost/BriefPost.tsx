import { usePostsContext } from "@/app/storage/contextProviders/PostsProvider";
import { usePopupContext } from "@/app/storage/contextProviders/TogglePopupProvider";
import useStorage from "@/app/storage/storage";
import styles from "./BriefPost.module.scss";
import comms from "@/assets/communication.png";
import edit from "@/assets/edit-text.png";
import trash from "@/assets/trashbin.png";
import ReactionPopup from "@/widgets/ReactionsPopup/ReactionsPopup";
import { useNavigate } from "react-router";
import ReactionList from "../ReactionList/ReactionList";
import { useState } from "react";

interface PostBriefProps {
  setEditPostId: React.Dispatch<React.SetStateAction<number | null>>;
  setDeletePostId: React.Dispatch<React.SetStateAction<number | null>>;
}

const BriefPost = ({ setDeletePostId, setEditPostId }: PostBriefProps) => {
  const { setDeletePopupOpen, setEditPopupOpen } = usePopupContext();
  const { reactions } = useStorage();
  const { posts } = usePostsContext();
  const [activePopupPostId, setActivePopupPostId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/post/${id}`);
  };

  const toggleDeletePopup = (id: number) => {
    setDeletePostId(id);
    setDeletePopupOpen(true);
  };

  const toggleEditPopup = (id: number) => {
    setEditPostId(id);
    setEditPopupOpen(true);
  };

  const toggleReactionPopup = (e: React.MouseEvent, postId: number) => {
    e.stopPropagation();
    setActivePopupPostId((prevId) => (prevId === postId ? null : postId));
  };

  return (
    <>
      {posts.map((post) => {
        const currentReaction = reactions.find((r) => r.postId === post.id);
        const isPopupOpen = activePopupPostId === post.id;

        return (
          <div
            className={styles.Post}
            onClick={() => handleNavigate(post.id)}
            key={post.id}
          >
            <div className={styles.PostInfo}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
            <div className={styles.Buttons}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(post.id);
                }}
              >
                <img src={comms} alt="comments" className={styles.Icon} />
              </button>

              <ReactionList
                currentReaction={currentReaction}
                post={post}
                showAll={false}
                onTogglePopup={(e) => toggleReactionPopup(e, post.id)}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEditPopup(post.id);
                }}
              >
                <img src={edit} alt="edit" className={styles.Icon} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDeletePopup(post.id);
                }}
              >
                <img src={trash} alt="delete" className={styles.Icon} />
              </button>
            </div>

            {isPopupOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className={styles.ReactionPopup}
              >
                <ReactionPopup currentReaction={currentReaction} post={post} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default BriefPost;
