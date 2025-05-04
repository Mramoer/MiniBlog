import { CommentsProvider } from "./CommentsProvider";
import { PostsProvider } from "./PostsProvider";
import { ReactionProvider } from "./ReactionsProvider";
import { PopupProvider } from "./TogglePopupProvider";

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
      <PopupProvider>
        <PostsProvider>
          <CommentsProvider>
            <ReactionProvider>
              {children}
            </ReactionProvider>
          </CommentsProvider>
        </PostsProvider>
      </PopupProvider>
    );
  }