import PropTypes from 'prop-types'
import useWindowWidth from '../../hooks/useWindowWidth'
import styles from './header.module.scss'
import Button from '../Button/Button'
import cx from 'classnames'

export default function Header({ handleOpenModal }) {
  // Show Github icon instead of navbar text when the window width is less or equal to 500px
  const windowWidth = useWindowWidth()
  const MinimizeViewOnGithub = windowWidth <= 500

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <img src="logo.svg" alt="" height={50} width={50} className={styles.logo} />
        </div>
        <div className={styles.right}>
          {MinimizeViewOnGithub ? (
            <a
              href="https://github.com/Orelba/mini-message-board"
              target="_blank"
              rel="noreferrer"
              className={cx(styles.link, styles['github-icon'])}
            >
              <img src="github-mark.svg" alt="View on Github" height={40} width={40} />
            </a>
          ) : (
            <a
              href="https://github.com/Orelba/mini-message-board"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              View On Github
            </a>
          )}
          <Button onClick={handleOpenModal}>Add New Message</Button>
        </div>
      </nav>
      <h1 className={styles['top-text']}>MESSAGE BOARD</h1>
    </header>
  )
}

Header.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
}