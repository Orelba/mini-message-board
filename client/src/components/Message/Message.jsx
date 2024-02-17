import PropTypes from 'prop-types'
import styles from './message.module.scss'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

dayjs.extend(relativeTime)

export default function Message({ message }) {
  const date = message && dayjs(message.added).fromNow()

  return (
    <div className={styles.message}>
      {!message ? (
        <>
          <Skeleton className={styles['user']} style={{ width: 'clamp(min(100%, 120px), 30%, 320px)' }} />
          <Skeleton className={styles.text} />
        </>
      ) : (
        <>
          <p className={styles['upper-container']}>
            <span className={styles.user}>{message.user}</span>
            <span className={styles.separator}>
              <img src="separator.svg" alt=" " height={30} width={30} />
            </span>
            <span className={styles.date}>{date}</span>
          </p>
          <p className={styles.text}>{message.text}</p>
        </>
      )}
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.object,
}
