import axios from "axios";

import { 
    GET_ALL_COUNTRIES, 
    GET_ALL_ACTIVITIES, 
    CREATE_ACTIVITY,
    FILTER_BY_CONTINENT, 
    FILTER_BY_ACTIVITY,
    FILTER_BY_NAME,
    ORDER_COUNTRIES,
    GET_COUNTRY_BY_ID,
    EMPTY_COUNTRY_DETAILS,
    FILTER_BY_DIFFICULTY,
    FILTER_BY_SEASSON,
    FILTER_BY_POPULATION,
    FILTER_BY_AREA,
    GET_ACTIVITY_DETAILS,
    DELETE_ACTIVITY,
    UPDATE_ACTIVITY,
    GET_COUNTRY_BY_NAME} from './types';
    

export const getAllCountries = (name) => { 
    return async function(dispatch){
      const api = await axios.get(`http://localhost:3001/countries/countries?name=${name ? name : ""}`)
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
    const apiData = await axios.get(`http://localhost:3001/countries/countries/${id}`)
    dispatch({type: GET_COUNTRY_BY_ID, payload: apiData.data})
  }
}


export const emptyCountryDetail = () => {
  return {
    type: EMPTY_COUNTRY_DETAILS,
  }
};

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

export const filterByContinent = (payload) => {
  return {
      type: FILTER_BY_CONTINENT,
      payload,
  };
}

export const filterBySeasson = (payload) => {
  return {
    type: FILTER_BY_SEASSON,
    payload,
  };
}

export const filterByActivity = (payload) => {
  return {
      type: FILTER_BY_ACTIVITY,
      payload,
  };
}

export const filterByArea = (payload) => {
  return {
    type: FILTER_BY_AREA,
    payload,
  }
};

export const getActivities = () => {
  return async function(dispatch){
    const act = await axios.get("http://localhost:3001/activities/activities/", {} );
   
    return dispatch({type: GET_ALL_ACTIVITIES, payload: act.data})
  }
};

export const createActivity = (payload) => {
  return async function(dispatch) {
    
      const res = await axios.post("http://localhost:3001/activities/activity", payload);
      console.log(res)
      return res;
          
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

export const orderCountries = (payload) => {
    return {
        type: ORDER_COUNTRIES,
        payload,
    };
}


  







