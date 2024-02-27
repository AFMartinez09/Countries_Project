import {
    GET_COUNTRIES,
    GET_COUNTRY_ID,
    GET_COUNTRY_NAME,
    GET_ACTIVITIES,
    POST_ACTIVITY,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    ALPHABETIC_ORDER,
    POPULATION_ORDER,
    RESET_FILTERS
} from "./types"

const initialState = {
    allCountries: [],
    allActivities: [],
    countries: [],
    country: []
}

const rootReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: payload,
                countries: payload
            }

        case GET_COUNTRY_ID:
            return {
                ...state,
                country: payload
            }

        case GET_COUNTRY_NAME:
            return {
                ...state,
                countries: payload,
                country: payload
            }

        case GET_ACTIVITIES:
            return {
                ...state,
                allActivities: payload
            }

        case POST_ACTIVITY:
            return {
                ...state,
                allActivities: [...state.allActivities, payload]
            }

        case FILTER_BY_CONTINENT:
            const { continent } = payload;
            // Gettin the list countries are complete (state)
            const allCountries = state.allCountries;
            if (continent === "All Continents") {
                // show all countries 
                return { ...state, countries: allCountries };
            } else {
                const filteredContinent = allCountries.filter((country) => country.continent === continent);
                return { ...state, countries: filteredContinent };
            }

        case FILTER_BY_ACTIVITY:
            const { activity } = payload;
            if (activity === "All activities") {
                return {
                    ...state,
                    countries: state.allCountries,
                };
            } else {
                const filteredActivity = state.allCountries.filter(
                    (country) => country.Activities && country.Activities.some((act) => act.name === activity)
                );
                return {
                    ...state,
                    countries: filteredActivity,
                };
            }


        case ALPHABETIC_ORDER:
            // Verificamos si el usuario seleccionó ordenar de A a Z (ascendente) o de Z a A (descendente)
            const order = payload === "from A to Z" ? 1 : -1;

            // Creating array copy (original countries) 
            const alphaOrder = [...state.countries].sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();

                if (nameA < nameB) {
                    return -1 * order;
                }
                if (nameA > nameB) {
                    return 1 * order;
                }
                return 0; 
            });

            return {
                ...state,
                countries: alphaOrder,
            };

        case POPULATION_ORDER:
            // Checking order asc or desc
            const populationOrder = payload === 'asc' ?
                [...state.countries].sort((a, b) => b.population - a.population)
                :
                [...state.countries].sort((a, b) => a.population - b.population)

            return {
                ...state,
                countries: populationOrder
            }

        case RESET_FILTERS: 
        return {
            ...state,
            countries: state.allCountries
        }

        default:
            return { ...state }
    }
}

export default rootReducer;