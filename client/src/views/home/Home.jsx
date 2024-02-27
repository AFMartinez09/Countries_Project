import styles from "./Home.module.css";
import CardsContainer from "../../components/cards-container/CardsCotainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, getCountries } from "../../redux/actions";
import Filter from "../../components/filter/Filter";
import arrow from '../../assets/arrow-up.svg';
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.allActivities);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getCountries(countries));
    dispatch(getActivities(activities));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}>
        <Filter
          setCurrentPage={setCurrentPage}
        />
        {countries.length === 0 ? (
          <Loading />
        ) : (
          <CardsContainer
            countries={countries}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <a href="#" className={styles.scrollLink}>
          <img src={arrow} />
        </a>
      </div>
    </div>
  );
};

export default Home;
