import styles from './CancelButton.module.scss'

interface CancelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

const CancelButton = ({children, ...props}: CancelButtonProps) => {
  return (
    <button
      className={styles.CancelButton}
      {...props}
      >
      {children}
    </button>
  )
}

export default CancelButton