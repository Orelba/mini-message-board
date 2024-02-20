import PropTypes from 'prop-types'
import styles from './button.module.scss'
import cx from 'classnames'

export default function Button({ onClick, className, disabled, children }) {
  return (
    <button className={cx(styles.button, className)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
}