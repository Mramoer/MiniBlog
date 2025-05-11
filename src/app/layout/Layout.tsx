import { Outlet, useNavigate } from "react-router"
import styles from './Layout.module.scss'
import LinkButton from "@/shared/LinkButton/LinkButton"
import { CommentsProvider } from "../storage/contextProviders/CommentsProvider"
import { PostsProvider } from "../storage/contextProviders/PostsProvider"
import { ReactionProvider } from "../storage/contextProviders/ReactionsProvider"
import { usePopupContext } from "../storage/contextProviders/TogglePopupProvider"


const Layout: React.FC = () => {
  const {setCreatePopupOpen} = usePopupContext()
  const navigate = useNavigate();

  return (
    <PostsProvider>
      <CommentsProvider>
        <ReactionProvider>
          <div className={styles.Layout}>
            <h1 onClick={() => navigate('/')}>Мини-блог</h1>
            <LinkButton onClick={() => setCreatePopupOpen(prev => !prev)}>+Создать пост</LinkButton>
          </div>
          <Outlet />
        </ReactionProvider>
      </CommentsProvider>
    </PostsProvider>
  )
}

export default Layout