import { useDispatch, useSelector } from "react-redux";
import styles from "./Detail.module.css";
import { getActivities, getCountryById } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading";

const Detail = () => {
  const { id } = useParams();
  const country = useSelector((state) => state.country);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryById(id));
  }, []);

  return (
    <div className={styles.container}>
      {!country ? (
        <Loading />
      ) : (
        <div>
          <div className={styles.container_country}>
            <h1>Country Detail</h1>
            <h2>{country.name}</h2>
            <img src={country.flag} alt={country.name} />
            <div className={styles.section}>
              <h3>
                Continent: <span>{country.continent}</span>
              </h3>
              <h3>
                Capital: <span>{country.capital}</span>
              </h3>
              <h3>
                Subregion: <span>{country.subregion}</span>
              </h3>
              <h3>
                Population: <span>{country.population}</span>
              </h3>
              <h3>
                Área: <span>{country.area} km²</span>
              </h3>
            </div>
          </div>
        </div>
      )}

      <div className={styles.card_activity}>
        <h1>Activities</h1>
        {country && country.Activities && country.Activities.length === 0 ? (
          <div className={styles.buttonContainer}>
            <h2>This country has no activities yet</h2>
          </div>
        ) : (
          country &&
          country.Activities &&
          country.Activities.map((act) => {
            return (
              <div key={act.id} className={styles.section_activity}>
                <h4>
                  Name: <span>{act.name}</span>
                </h4>
                <h4>
                  Difficulty: <span>{act.difficulty}</span>
                </h4>
                <h4>
                  Duration: <span>{act.duration}</span>
                </h4>
                <h4>
                  Season: <span>{act.season}</span>
                </h4>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Detail;
