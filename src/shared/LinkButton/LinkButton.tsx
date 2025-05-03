import { Link } from "react-router"
import styles from './LinkButton.module.scss'

interface LinkButtonProps {
    path: string,
    children: React.ReactNode
}

const LinkButton = ({path, children}: LinkButtonProps) => {
  return (
    <Link 
      className={styles.LinkButton} to={path}>
      {children}
    </Link>
  )
}

export default LinkButton