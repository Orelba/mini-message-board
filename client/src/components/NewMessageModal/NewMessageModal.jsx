import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import styles from './new-message-modal.module.scss'
import NewMessageForm from '../NewMessageForm/NewMessageForm'
import cx from 'classnames'

export default function NewMessageModal({ isOpen, handleCloseModal, goToFirstPage, notifyUser }) {
  const modalRef = useRef(null)
  const [reRenderTrigger, setReRenderTrigger] = useState(false)

  if (modalRef.current) {
    if (isOpen) {
      modalRef.current.showModal()
    } else {
      modalRef.current.close()
    }
  }

  // Rerender the form component on close
  const handleCloseModalAndReRenderChildren = () => {
    handleCloseModal()
    setReRenderTrigger(!reRenderTrigger)
  }

  const closeOnBackdropClick = (e) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect()
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width

      if (!isInDialog) {
        handleCloseModalAndReRenderChildren()
      }
    }
  }

  return (
    <dialog
      ref={modalRef}
      className={cx(styles.modal, { [styles['backdrop-fade']]: isOpen })}
      onMouseDown={closeOnBackdropClick}
    >
      <h2 className={styles['form-header']}>Add New Message</h2>
      <NewMessageForm
        handleCloseModal={handleCloseModalAndReRenderChildren}
        goToFirstPage={goToFirstPage}
        reRenderForm={reRenderTrigger}
        notifyUser={notifyUser}
      />
      <CloseButton onClick={handleCloseModalAndReRenderChildren} />
    </dialog>
  )
}

NewMessageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  goToFirstPage: PropTypes.func.isRequired,
  notifyUser: PropTypes.func.isRequired,
}

function CloseButton({ onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 16 16"
      onClick={onClick}
      className={styles['close-btn']}
    >
      <rect
        width={14}
        height={2}
        x={4.314}
        y={-1}
        ry={0}
        style={{
          opacity: 1,
          vectorEffect: "none",
          fill: "currentColor",
          fillOpacity: 1,
          stroke: "none",
          strokeWidth: 4,
          strokeLinecap: "square",
          strokeLinejoin: "round",
          strokeMiterlimit: 4,
          strokeDasharray: "none",
          strokeDashoffset: 3.20000005,
          strokeOpacity: 1,
        }}
        transform="rotate(45)"
      />
      <rect
        width={14}
        height={2}
        x={-7}
        y={10.314}
        ry={0}
        style={{
          opacity: 1,
          vectorEffect: "none",
          fill: "currentColor",
          fillOpacity: 1,
          stroke: "none",
          strokeWidth: 4,
          strokeLinecap: "square",
          strokeLinejoin: "round",
          strokeMiterlimit: 4,
          strokeDasharray: "none",
          strokeDashoffset: 3.20000005,
          strokeOpacity: 1,
        }}
        transform="rotate(-45)"
      />
    </svg>
  )
}

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}