import styles from './DeleteButton.module.scss'

interface DeleteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

const DeleteButton = ({children, ...props}: DeleteButtonProps) => {
  return (
    <button
      className={styles.DeleteButton}
      {...props}
      >
      {children}
    </button>
  )
}

export default DeleteButton