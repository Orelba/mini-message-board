import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import getAPIURL from './utils/getApiURL'
import Header from './components/Header/Header'
import NewMessageModal from './components/NewMessageModal/NewMessageModal'
import MessageList from './components/MessageList/MessageList'
import Pagination from './components/Pagination/Pagination'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cx from 'classnames'

function App() {
  const [data, setData] = useState({})
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef()
  const [fitPagination, setFitPagination] = useState(false)

  const fetchMessages = async (page = 1) => {
    try {
      const apiURL = getAPIURL()
      const response = await axios.get(`${apiURL}/api/messages?page=${page}`)
      setData(response.data)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error(error)
    }
  }

  // Ensure the footer sticks to the bottom of the viewport if the page content height exceeds the viewport height.
  const handleFitFooterInScreen = (ref) => {
    if (ref.current) {
      if (ref.current.offsetHeight >= window.innerHeight) {
        setFitPagination(true)
      } else {
        setFitPagination(false)
      }
    }
  }

  // Observe a window resize event to change the footer appearance
  useEffect(() => {
    const handleResize = () => handleFitFooterInScreen(containerRef)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Fetch Data after initial render and page change
  useEffect(() => {
    fetchMessages(page)
  }, [page])

  // After Fetch
  useEffect(() => {
    // Set pageCount for pagination calculations
    if (data.messages) {
      setPageCount(data.pagination.pageCount)
    }
    // New data can change the height of the content, adjust the footer if needed
    handleFitFooterInScreen(containerRef)
  }, [data])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handlePrevious = () => {
    setPage(p => {
      if (p === 1) return p
      return p - 1
    })
  }

  const handleNext = () => {
    setPage(p => {
      if (p === pageCount) return p
      return p + 1
    })
  }

  const handleSetPage = (page) => {
    setPage(page)
  }

  const goToFirstPage = () => {
    if (page === 1) {
      fetchMessages()
    } else {
      setPage(1)
    }
  }

  const notifyUser = (message, type) => {
    toast(message, {
      position: 'top-center',
      type: type,
      hideProgressBar: true,
      closeButton: false,
      className: `toast ${type}`,
    })
  }

  return (
    <div ref={containerRef} className={cx({ 'fit-pagination': fitPagination })}>
      <Header handleOpenModal={handleOpenModal} />

      <main>
        <NewMessageModal
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          goToFirstPage={goToFirstPage}
          notifyUser={notifyUser}
        />
        <MessageList messages={data.messages} />
      </main>

      <footer>
        <Pagination
          page={page}
          pageCount={pageCount}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handlePageButton={handleSetPage}
        />
      </footer>

      <ToastContainer />
    </div>
  )
}

export default App
