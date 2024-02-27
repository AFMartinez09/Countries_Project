import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={styles.container} key={props.id}>
      <img src={props.flag} alt={`Flag of country: ${props.name}`}/>
      <h2>{props.name}</h2>
      <p>Continent: {props.continent}</p>
    </div>
  );
};

export default Card;
