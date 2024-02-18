import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import styles from './new-message-form.module.scss'
import axios from 'axios'
import getAPIURL from '../../utils/getApiURL'
import cx from 'classnames'
import Button from '../Button/Button'

export default function NewMessageForm({ handleCloseModal, goToFirstPage, reRenderForm, notifyUser }) {
  const [formData, setFormData] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState([])

  let messageError = formErrors.find(error => error.path === 'text')
  let nameError = formErrors.find(error => error.path === 'user')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleInputValidation = (e) => {
    const { name, value } = e.target

    if (value) {
      setFormErrors(prevErrors =>
        prevErrors.filter((error) => error.path !== name),
      )
    } else {
      const msg = (name === 'text') ? 'You need to enter a message.' : 'You need to enter a name.'
      setFormErrors((prevError) => [...prevError, { path: name, msg: msg }])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const apiURL = getAPIURL()
      await axios.post(`${apiURL}/api/messages/new`, formData)
      setFormData(emptyForm)
      handleCloseModal()
      goToFirstPage()
      notifyUser('Your message has been added successfully!', 'success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data
        setFormErrors(errors)
      } else {
        // Handle other errors
        console.error(error)
      }
    }
  }

  // Reset Form
  useEffect(() => {
    setFormData(emptyForm)
    setFormErrors([])
  }, [reRenderForm])

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles['input-container']}>
        <textarea
          name="text"
          cols="50"
          rows="5"
          value={formData.text}
          onChange={handleChange}
          onInput={handleInputValidation}
          placeholder="Leave a message..."
          maxLength={180}
          className={cx(styles['message-input'], { [styles['error-border-color']]: messageError })}
        />
        {messageError && <span className={styles.error}>{messageError.msg}</span>}
      </div>

      <div className={styles['input-container']}>
        <input
          type="text"
          name="user"
          value={formData.user}
          onChange={handleChange}
          onInput={handleInputValidation}
          placeholder='Name'
          maxLength={22}
          className={cx(styles['name-input'], { [styles['error-border-color']]: nameError })}
        />
        {nameError && <span className={styles.error}>{nameError.msg}</span>}
      </div>
      <Button>Submit</Button>
    </form>
  )
}

const emptyForm = {
  text: '',
  user: '',
}

NewMessageForm.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  goToFirstPage: PropTypes.func.isRequired,
  reRenderForm: PropTypes.bool.isRequired,
  notifyUser: PropTypes.func.isRequired,
}
