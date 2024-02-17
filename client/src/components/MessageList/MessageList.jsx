import PropTypes from 'prop-types'
import styles from './message-list.module.scss'
import Message from '../Message/Message'

export default function MessageList({ messages }) {
  let messageList

  if (!messages) {
    // Show loading state
    messageList = Array.from({ length: 5 }, (_, index) => (
      <Message key={index} />
    ))
  } else {
    // Show message data
    messageList = messages.map(message =>
      <Message key={message._id} message={message} />
    )
  }

  return (
    <div className={styles.list}>
      {messageList}
    </div>
  )
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      added: PropTypes.string.isRequired,
    })
  ),
}