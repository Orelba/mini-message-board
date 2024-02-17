import PropTypes from 'prop-types'
import styles from './button.module.scss'

export default function Button({ onClick, children  }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
}