import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import SearchBar from "../searchbar/SearchBar";


const NavBar = () => {
  const location = useLocation();

  return (
    <nav className={styles.container}>
      <ul>
        <li>
          <Link className={styles.link} to="/home">
            <h2>Countries App</h2>
          </Link>
        </li>
        <li className={styles.li2}>
          {location.pathname === "/home" && <SearchBar />}
        </li>
        <li className={styles.li1}>
          <Link className={styles.link} to="/form">
            CREATE ACTIVITY
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
