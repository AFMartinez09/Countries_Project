import styles from "./Pagination.module.css";

const Pagination = ({
  countries,
  countriesPerPage,
  currentPage,
  onPageChange,
}) => {
  // Calculamos el total de paginas
  const totalPages = Math.ceil(countries / countriesPerPage);

  // Creamos un array para renderizar los botones
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Funcion para cambiar de pagina
  const handlePageChange = (pageNumber) => {
    // Verificar que la página no sea menor que 1
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    // Verificar que la página no sea mayor que el total de páginas
    if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    onPageChange(pageNumber);
  };

  // Función para calcular los números de página a mostrar
  const calculatePageNumbersToShow = () => {
    const maxPagesToShow = 4;
    const pageNumbersToShow = [];

    // Calcular la página inicial a mostrar
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    // Calcular la página final a mostrar
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    // Ajustar el rango de páginas si es necesario
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

    // Agregar los números de página a mostrar al array
    for (let i = startPage; i <= endPage; i++) {
      pageNumbersToShow.push(i);
    }

    return pageNumbersToShow;
  };

  return (
    <div className={styles.pagination}>
      {/* Renderizar lista desordenada con números de página */}
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
