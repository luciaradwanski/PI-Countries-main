import {
    GET_ALL_COUNTRIES,
    GET_COUNTRY_BY_NAME,
    GET_CONTINENTS,
    CLEAR_COUNTRY,
    GET_COUNTRY_BY_ID,
    FILTER_CONTINENTS,
    FILTER_ACTIVITIES,
    ORDER_COUNTRIES,
    LOAD_COUNTRIES,
    GET_ACTIVITIES,
} from ('../Actions/Types');

import axios from "axios";

// const SERVER = process.env.REACT_APP_SERVER || "http://localhost:3001";

export const getAllCountries = () => { 
    return async function(dispatch){
      const api = await axios.get(`http://localhost:3001/countries`) //countries?name=${name ? name : ""}
      const countries = api.data;
      dispatch({type: GET_ALL_COUNTRIES, payload: countries})
    }
    
};

export const getCountriesByName = (name) => {
    return async (dispatch) => {
      const apiName = await axios.get(`http://localhost:3001/countries?name=${name}`)
      const country = apiName.data;
      dispatch({ type: GET_COUNTRY_BY_NAME, payload: country })
    }    
};

export const getCountryById = (id) => {
  return async function(dispatch){
    const apiData = await axios.get(`http://localhost:3001/countries/${id}`)
    dispatch({type: GET_COUNTRY_BY_ID, payload: apiData.data})
  }
}

export const orderCountries = (sort) => { //order
    return function (dispatch) {
        dispatch({ type: ORDER_COUNTRIES, payload: sort});
    };
}

export const loadCountries = () => {
    return function (dispatch) {
        dispatch({ type: LOAD_COUNTRIES });
    };
}

export const clearCountryDetail = () => {
    return function (dispatch) {
        dispatch({ type: CLEAR_COUNTRY });
    };
};

export const getContinents = () => {
    return function (dispatch) {
        dispatch({ type: GET_CONTINENTS });
    };
}

export const filterByName = (payload) => {
  return {
    type: FILTER_BY_NAME,
    payload,
  };
}

export const filterByDifficulty = (payload) => {
  return {
    type: FILTER_BY_DIFFICULTY,
    payload,
  };
}

export const filterByPopulation = (payload) => {
    return {
        type: FILTER_BY_POPULATION,
        payload,
    };
}

export const filterContinent = (filter) => {
    return function (dispatch) {
        dispatch({ type: FILTER_CONTINENTS, payload: filter });
    };
}

export const filterBySeasson = (payload) => {
    return {
        type: FILTER_BY_SEASSON,
        payload,
    };
}

export const filterByActivity = (filter) => { //filter--> payload
    return function (dispatch) {
        dispatch({ type: FILTER_ACTIVITIES, payload: filter});
    };
}

export const filterByArea = (payload) => {
  return {
    type: FILTER_BY_AREA,
    payload,
  }
};

export const getActivities = () => {
    // return async function(dispatch){
    //     const act = await axios.get("http://localhost:3001/activities/activities/", {} );
    //     return dispatch({type: GET_ACTIVITIES, payload: act.data})
    // }

    return async function (dispatch) {
        axios.get(`${SERVER}/activities`).then((response) => {
            return dispatch({ type: GET_ACTIVITIES, payload: response.data });
        })
        .catch((err) => console.log(err));
    };
};

export const createActivity = ({name, difficulty, duration, season, countries}) => {
    return async function() {
        await axios.post(`${SERVER}/activity`, {
            name,
            difficulty,
            duration,
            season,
            countries,
        });
    };
};



export const getActivityDetails = (id) => {
  return async function(dispatch){
    const actD = await axios.get(`http://localhost:3001/activities/activities/${id}`)
    const aDetail = actD.data;
    dispatch({ type: GET_ACTIVITY_DETAILS, payload: aDetail })
  }
};

export const updateActivity = ({id, payload}) => {
    return async function(dispatch){
      const modif = await axios.put(`http://localhost:3001/activities/activity/${id}`, payload)
      const modifyA = modif.data;
      dispatch({type: UPDATE_ACTIVITY, payload: modifyA })
    }
};

export const deleteActivity = (id) => {
    return async function(dispatch){
      const delet = await axios.delete(`http://localhost:3001/activities/activity/${id}`)
      const deleteA = delet.data;
      dispatch({type: DELETE_ACTIVITY, payload: deleteA })
    }
};


