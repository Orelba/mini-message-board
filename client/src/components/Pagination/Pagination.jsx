import PropTypes from 'prop-types'
import useWindowWidth from '../../hooks/useWindowWidth'
import styles from './pagination.module.scss'
import cx from 'classnames'

export default function Pagination({ page, pageCount, handlePrevious, handleNext, handlePageButton }) {
  const windowWidth = useWindowWidth()
  // Min window width for the component to show ellipsis in pixels
  const minWindowWidthAllowedForEllipsis = 425

  const maxVisiblePages = 3
  const halfVisiblePages = Math.floor(maxVisiblePages / 2)

  // Calculate the start and end page numbers for the visible range
  let startPage = Math.max(1, page - halfVisiblePages)
  let endPage = Math.min(pageCount, startPage + maxVisiblePages - 1)

  // Adjust the visible range if it's smaller than maxVisiblePages
  if (endPage - startPage + 1 < maxVisiblePages) {
    if (page <= halfVisiblePages) {
      endPage = Math.min(pageCount, maxVisiblePages)
    } else {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }
  }

  // Create an array of page number buttons within the visible range
  const pageNumbers = []
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <button
        key={i}
        className={cx(styles.number, { [styles.selected]: i === page })}
        onClick={() => handlePageButton(i)}
      >
        {i}
      </button>
    )
  }

  // Determine whether to render ellipsis for start and end
  // No ellipsis when window width is lower than minWindowWidthAllowedForEllipsis so the component fits nicely on smaller devices
  const renderStartEllipsis = windowWidth > minWindowWidthAllowedForEllipsis && startPage > 1
  const renderEndEllipsis = windowWidth > minWindowWidthAllowedForEllipsis && endPage < pageCount

  return (
    <div className={styles.pagination}>
      <button disabled={page === 1} onClick={handlePrevious}>
        <img src="arrow-right.svg" alt="Previous page" height={16} width={16} className={styles.flip} />
      </button>
      {renderStartEllipsis && (
        <>
          <button onClick={() => handlePageButton(1)} className={styles.number}>
            1
          </button>
          <button disabled>...</button>
        </>
      )}
      {pageNumbers}
      {renderEndEllipsis && (
        <>
          <button disabled>...</button>
          <button onClick={() => handlePageButton(pageCount)} className={styles.number}>
            {pageCount}
          </button>
        </>
      )}
      <button disabled={page === pageCount} onClick={handleNext}>
        <img src="arrow-right.svg" alt="Next page" height={16} width={16} />
      </button>
    </div>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePageButton: PropTypes.func.isRequired,
}
