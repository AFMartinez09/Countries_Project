import styles from "./Pagination.module.css";

const Pagination = ({
  countries,
  countriesPerPage,
  currentPage,
  onPageChange,
}) => {
  // Calculating total pages
  const totalPages = Math.ceil(countries / countriesPerPage);

  // Creating an array to buttons
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

// Function to change page
  const handlePageChange = (pageNumber) => {
    // Checking if the page is minus than 1
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    // Checking tha page must no higher than total pages
    if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    onPageChange(pageNumber);
  };

  const calculatePageNumbersToShow = () => {
    const maxPagesToShow = 4;
    const pageNumbersToShow = [];

    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= Math.floor(maxPagesToShow / 2)) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage >= totalPages - Math.floor(maxPagesToShow / 2)) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbersToShow.push(i);
    }

    return pageNumbersToShow;
  };

  return (
    <div className={styles.pagination}>
      <ul className={styles.paginationList}>
        <li>
          <button
            onClick={() => handlePageChange(1)}
            className={styles.first_last}
          >
            First
          </button>
        </li>
        {calculatePageNumbersToShow().map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={
                pageNumber === currentPage
                  ? styles.active
                  : styles.num_pagination
              }
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={styles.first_last}
          >
            Last
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
