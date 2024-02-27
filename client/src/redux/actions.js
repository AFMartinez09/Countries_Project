import axios from 'axios';
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
} from './types.js';


const URL_COUNTRY = "http://localhost:3001/countries";
const URL_ACTIVITY = "http://localhost:3001/activities"

const getCountries = () => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get(URL_COUNTRY);
            const countries = apiData.data;
            dispatch({ type: GET_COUNTRIES, payload: countries });
        } catch (error) {
            console.log(error);
        }
    }
};

const getCountryById = (id) => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get(`${URL_COUNTRY}/${id}`);
            const countryId = apiData.data;
            dispatch({ 
                type: GET_COUNTRY_ID, 
                payload: countryId });
        } catch (error) {
            console.log(error);
        }
    }
};

const getCountryByName = (name) => {
    return async (dispatch) => {
        if(isNaN(name)){
            
        try {
            const apiData = await axios.get(`${URL_COUNTRY}?name=${name}`);
            const countryName = apiData.data;
            dispatch({ 
                type: GET_COUNTRY_NAME, 
                payload: countryName });
        } catch (error) {
            alert("Country not found");
        }
    }else{
        return alert('Numbers is not allowed');
    }
}
};

const getActivities = () => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get(URL_ACTIVITY);
            const activities = apiData.data;
            dispatch({ type: GET_ACTIVITIES, payload: activities });
        } catch (error) {
            console.log(error);
        }
    }
};

const postActivity = (newActivity) => {
    return async (dispatch) => {
        try {
            const apiData = await axios.post(URL_ACTIVITY, newActivity);
            const createActivity = apiData.data;
            if (createActivity) {
                dispatch({ type: POST_ACTIVITY, payload: createActivity });
            }
        } catch (error) {
            console.log(error);
        }
    }
};

const filteredContinent = (continent) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload: { continent }
    }
}

const filteredActivity = (activity) => {
    return {
        type: FILTER_BY_ACTIVITY,
        payload: { activity }
    }
}

const alphabeticOrder = (payload) => {
    return {
        type: ALPHABETIC_ORDER,
        payload
    }
}

const poblationOrder = (payload) => {
    return {
        type: POPULATION_ORDER,
        payload
    }
}

const resetFilters = () => {
    return {
        type: RESET_FILTERS,
    }
}


export {
    getCountries,
    getCountryById,
    getCountryByName,
    getActivities,
    postActivity,
    filteredContinent,
    filteredActivity,
    alphabeticOrder,
    poblationOrder,
    resetFilters
};