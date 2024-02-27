import { Link } from "react-router-dom";
import Card from "../card/Card";
import styles from "./CardsContainer.module.css";
import Pagination from "../pagination/Pagination";

const CardsContainer = ({
  countries,
  currentPage,
  setCurrentPage,
}) => {
  const countriesPerPage = 10;

  // Calculating first index and last index considering the next page
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  // Function to change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <nav>
        <Pagination
          countries={countries.length}
          countriesPerPage={countriesPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </nav>
      <section className={styles.containerCards}>
        {currentCountries.map((country) => {
          return (
            <Link
              key={country.id}
              className={styles.link}
              to={`/detail/${country.id}`}
            >
              <Card
                name={country.name}
                flag={country.flag}
                continent={country.continent}
                capital={country.capital}
                population={country.population}
                area={country.area}
              />
            </Link>
          );
        })}
      </section>

      <footer>
        <Pagination
          countries={countries.length}
          countriesPerPage={countriesPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </footer>
    </div>
  );
};

export default CardsContainer;
