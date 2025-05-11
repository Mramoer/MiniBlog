import styles from './ErrorPage.module.scss'
import { Link } from 'react-router'

const ErrorPage = () => {
  return (
    <div>
      <h1>404 Error</h1>
      <Link to={'/'} className={styles.Link}>На главную</Link>
    </div>
  )
}

export default ErrorPage