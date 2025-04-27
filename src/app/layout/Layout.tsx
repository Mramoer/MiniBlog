import { Link, Outlet, useNavigate } from "react-router"
import styles from './Layout.module.scss'


function Layout() {
  const navigate = useNavigate()
  return (
    <>
    <div className={styles.Layout}>
        <h1 onClick={() => navigate('/')}>Мини-блог</h1>
        <Link to={'/create'}>+Создать пост</Link>
    </div>
    <Outlet/>
    </>
  )
}

export default Layout