import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Filter.module.css";
import {
  alphabeticOrder,
  filteredActivity,
  filteredContinent,
  poblationOrder,
  resetFilters,
} from "../../redux/actions";

const Filter = ({ setCurrentPage }) => {
  // Obtener el dispatch para poder enviar las acciones a Redux
  const dispatch = useDispatch();
  const allActivities = useSelector((state) => state.allActivities);

  // Manejar el cambio del filtro por continente
  const handleContinentChange = (event) => {
    const selectContinent = event.target.value;
    dispatch(filteredContinent(selectContinent));
    setCurrentPage(1);
  };

  // Manejar el cambio del filtro por actividad
  const handleActivityChange = (event) => {
    dispatch(filteredActivity(event.target.value));
    setCurrentPage(1);
  };

  // Manejar el cambio del orden alfabético
  const handleAlphabeticOrderChange = (event) => {
    dispatch(alphabeticOrder(event.target.value));
  };

  // Manejar el cambio del orden por población
  const handlePopulationOrderChange = (event) => {
    dispatch(poblationOrder(event.target.value));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={styles.container}>
      {/* Filtro por continente */}
      <div className={styles.filterGroup}>
        <label htmlFor="Filter-by-continent">Filter by Continent:</label>
        <select onChange={handleContinentChange} id="Filter-by-continent">
          <option value="All Continents">All Continents</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* Filtro por actividad */}
      <div className={styles.filterGroup}>
        <label htmlFor="Filter-by-Activity">Filter by Activity:</label>
        <select onChange={handleActivityChange} id="Filter-by-Activity">
          <option value="All activities">All activities</option>
          {allActivities.map((activity) => (
            <option key={activity.id} value={activity.name}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>

      {/* Orden alfabético */}
      <div className={styles.filterGroup}>
        <label htmlFor="Alphabetic-order">Alphabetic Order:</label>
        <select onChange={handleAlphabeticOrderChange} id="Alphabetic-order">
          <option value="from A to Z">A to Z</option>
          <option value="from Z to A">Z to A</option>
        </select>
      </div>

      {/* Orden por población */}
      <div className={styles.filterGroup}>
        <label htmlFor="Population-order">Population Order:</label>
        <select onChange={handlePopulationOrderChange} id="Population-order">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className={styles.resetButton}>
        <button onClick={handleReset}><span>Reset Filters</span></button>
      </div>
    </div>
  );
};

export default Filter;
