import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.backgroundImage}>
        <h1>
        Welcome to Countries
        </h1>
        <h2>Exploring new countries and find new experiences and you will feel alive</h2>
        <Link to='/home'>
            <button><span>Get into</span></button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
