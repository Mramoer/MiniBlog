import { Outlet } from "react-router"
import styles from './Layout.module.scss'
import LinkButton from "@/shared/LinkButton/LinkButton"
import { CommentsProvider } from "../CommentsProvider"
import { PostsProvider } from "../PostsProvider"
import { ReactionProvider } from "../ReactionsProvider"
import { usePopupContext } from "../TogglePopupProvider"


const Layout: React.FC = () => {
  const {setCreatePopupOpen} = usePopupContext()

  return (
    <PostsProvider>
      <CommentsProvider>
        <ReactionProvider>
          <div className={styles.Layout}>
            <h1>Мини-блог</h1>
            <LinkButton onClick={() => setCreatePopupOpen(prev => !prev)}>+Создать пост</LinkButton>
          </div>
          <Outlet />
        </ReactionProvider>
      </CommentsProvider>
    </PostsProvider>
  )
}

export default Layout