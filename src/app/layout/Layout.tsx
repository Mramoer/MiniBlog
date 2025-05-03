import { Outlet } from "react-router"
import styles from './Layout.module.scss'
import LinkButton from "@/shared/LinkButton/LinkButton"


function Layout() {
  return (
    <>
    <div className={styles.Layout}>
        <h1>Мини-блог</h1>
        <LinkButton path="/create">+Создать пост</LinkButton>
    </div>
    <Outlet/>
    </>
  )
}

export default Layout