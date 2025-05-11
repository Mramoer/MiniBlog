import { Reaction, Post } from "@/app/types/types";
import ReactionList from "@/entities/ReactionList/ReactionList";

interface ReactionPopupProps {
  currentReaction: Reaction | undefined;
  post: Post;
}

const ReactionPopup = ({ currentReaction, post }: ReactionPopupProps) => {
  return (
    <div>
      <ReactionList showAll={true} currentReaction={currentReaction} post={post} />
    </div>
  );
};

export default ReactionPopup;