import axios from 'axios'

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const POST_ACTIVITY = "POST_ACTIVITY"
export const GET_NAME_COUNTRY = "GET_NAME_COUNTRY";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const FILTER_POPULATION = "FILTER_POPULATION";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";

export const getCountries = () => {
    return async function (dispatch){
        var json = await axios("http://localhost:3001/countries")
        return dispatch({ type: GET_COUNTRIES, payload: json.data });
    }
}; 


export const filterByContinent = (payload) => {
    return { type: FILTER_BY_CONTINENT, payload }
}


export const orderByName = (payload) =>{
    return { type: ORDER_BY_NAME, payload }
}

export const filterByPopulation = (payload) => {
    return {type: FILTER_POPULATION, payload}
}

export const getNameCountry = (name) => {
    return async function (dispatch){
        try {
            var json = await axios("http://localhost:3001/countries?name=" + name);
            return dispatch({ type: GET_NAME_COUNTRY, payload: json.data })
        } catch (error) {
            console.log(error)
        }
    }
}; 


export const filterByActivity = (payload) => {

    return { type: FILTER_BY_ACTIVITY, payload: payload }
}

export const getActivities = () => {
    return async function (dispatch){
        const act = await axios.get('http://localhost:3001/activities', {

        })
        return  dispatch({ type: GET_ACTIVITIES, payload: act.data })
    }
}; 

export function postActivity(payload){
    return async function (dispatch){
        const postAct = await axios.post('http://localhost:3001/activities',payload);
        console.log(postAct);
        return postAct;
    }           
}; 




export const getDetail = (id) => {
    return async function (dispatch){
        try {
            const api = await axios('http://localhost:3001/countries/' + id)
            return dispatch({type: GET_DETAIL, payload: api.data})
        } catch (error) {
            console.log(error)
        }
    }
}; 

export const deleteActivity = (id) => {
    
    return async function (dispatch){
        const act = await axios.delete(`http://localhost:3001/activities/${id}`)  
        return dispatch({ type: DELETE_ACTIVITY, payload: act.data })
    }  
}
