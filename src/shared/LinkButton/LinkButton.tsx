import styles from './LinkButton.module.scss'

interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

const LinkButton = ({children, ...props}: LinkButtonProps) => {
  return (
    <button
      className={styles.LinkButton}
      {...props}
      >
      {children}
    </button>
  )
}

export default LinkButton