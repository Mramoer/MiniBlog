import useStorage from "@/app/storage/storage";
import { Reaction, Post, ReactionsType } from "@/app/types/types";
import styles from "./ReactionList.module.scss";
import like from "@/assets/like.svg";
import anger from "@/assets/reactions/anger.svg";
import sadness from "@/assets/reactions/sadness.svg";
import smile from "@/assets/reactions/smile.svg";

interface ReactionListProps {
  currentReaction: Reaction | undefined;
  post: Post;
  showAll: boolean;
  onTogglePopup?: (e: React.MouseEvent) => void;
}

const reactionData = [
  { type: ReactionsType.Like, icon: like, alt: "like" },
  { type: ReactionsType.Anger, icon: anger, alt: "anger" },
  { type: ReactionsType.Sadness, icon: sadness, alt: "sadness" },
  { type: ReactionsType.Smile, icon: smile, alt: "smile" },
];

const ReactionList = ({ currentReaction, post, showAll, onTogglePopup }: ReactionListProps) => {
  const { setReaction } = useStorage();

  const handleClick = (
    e: React.MouseEvent,
    type: ReactionsType
  ) => {
    e.stopPropagation();
    setReaction(type, post.id);
    onTogglePopup?.(e);
  };

  const renderButton = (type: ReactionsType, icon: string, alt: string, showCount: boolean) => (
    <button
      key={type}
      onClick={(e) => handleClick(e, type)}
      name={alt}
      className={styles.ReactionButton}
    >
      <img src={icon} alt={alt} className={styles.Icon} />
      {showCount && <span className={styles.Count}>1</span>}
    </button>
  );

  if (showAll) {
    return (
      <div className={styles.List}>
        {reactionData.map(({ type, icon, alt }) =>
          renderButton(type, icon, alt, currentReaction?.type === type)
        )}
      </div>
    );
  }

  const active = reactionData.find(({ type }) =>
    currentReaction?.type === type || (currentReaction === undefined && type === ReactionsType.Like)
  );

  return active ? (
    <div className={styles.List}>
      {renderButton(active.type, active.icon, active.alt, true)}
    </div>
  ) : null;
};

export default ReactionList;
