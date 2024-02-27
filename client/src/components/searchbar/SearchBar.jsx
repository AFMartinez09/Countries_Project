import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../redux/actions";

const SearchBar = () => {
  const [countryName, setCountryName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountryByName(countryName));


    }

  const handleInputChange = (e) => {
    setCountryName(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="search"
            name="search"
            value={countryName}
            onChange={handleInputChange}
            placeholder="Search Country"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.button}
          >SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
