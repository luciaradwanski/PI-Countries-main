import { 
    GET_ALL_COUNTRIES, 
    FILTER_BY_NAME,
    GET_ALL_ACTIVITIES, 
    FILTER_BY_CONTINENT, 
    FILTER_BY_ACTIVITY,
    ORDER_COUNTRIES,
    GET_COUNTRY_BY_ID,
    EMPTY_COUNTRY_DETAILS,
    FILTER_BY_DIFFICULTY,
    FILTER_BY_SEASSON,
    FILTER_BY_POPULATION,
    FILTER_BY_AREA,
    GET_ACTIVITY_DETAILS,
    CREATE_ACTIVITY,
    DELETE_ACTIVITY,
    UPDATE_ACTIVITY,
    GET_COUNTRY_BY_NAME,
} from './types';

  


const initialState = {
    allCountries: [],
    countries: [],
    detail: [],
    activities: [], 
    activityDetail: [],
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:

            /* Retorna una copia del estado ---> un estado nuevo  en donde tenga las prop del state,
            se modifican la prop que quiero modificar, en el llamado allCountries tambien seteamos toda 
            la info en countries para despues filtrarlos!*/
            
            return { 
                ...state, 
                countries: action.payload, 
                allCountries: action.payload 
            };
        case GET_COUNTRY_BY_NAME:

             /* Retorna una copia del estado ---> un estado nuevo  en donde tenga las prop del state,
            se modifican la prop que quiero modificar, en el llamado allCountries tambien seteamos toda 
            la info por los nombres de los countries para despues filtrarlos!*/

            return {
                ...state,
                countries: action.payload,
            };
        
        case FILTER_BY_CONTINENT:

            /* Declaro const, me traigo lo que quiero filtrar, acceso a eso a través del state.countries, 
            declaro otra constante en donde me voy a preguntar action.payload, que me puede llegar por 
            payload? --> 'All', 'Africa', 'Asia', 'Europa', etc El valor del select es lo que va de repente 
            va a hacer el e.target.value(de la f handler) y va a llegar al action.payload. Me pregunto si el 
            action.payload es igual a 'All' devuelvo el allCountries y sino : agarro el allCountries y le hago 
            un filter y voy a agarrar y decir el elemento que estoy filtrando,  me fijo si el estado es igual 
            a action.payload filtramelo y devolvelo. Guardo esto, devuelvo el status concatenado y en allCountries 
            debo pasar el estado filtrado.*/


            const allCountries = state.countries;
            const continent = action.payload === "All" ? allCountries : allCountries.filter((el) => el.continent === action.payload);
            return {
                ...state,
                allCountries: continent, /* Es una copia del estado countries */
            };
        case GET_COUNTRY_BY_ID:

            /* Retorna una copia del estado ---> un estado nuevo  en donde tenga las prop del state,
            se modifican la prop que quiero modificar, en el llamado countryDetails tambien seteamos toda 
            la info de los detalles de los countries para despues filtrarlos!*/

            return {
                ...state,
                detail: action.payload,
            }

        case EMPTY_COUNTRY_DETAILS:

            /* Retorna una copia del estado ---> un estado nuevo  en donde tenga las prop del state,
            se devuelve un [] con la info de los detalles de los countries */

            return{
                ...state,
                detail: [],
            }

        case FILTER_BY_DIFFICULTY:

            
            const allDifficulty = state.countries;
            const dificultad = action.payload === "All" ? allDifficulty : allDifficulty.filter((el) => 
                el.Activities && el.Activities.filter((activity) => activity.difficulty === action.payload).length > 0);
            
            return {
                ...state,
                allCountries: dificultad,
            };
        case FILTER_BY_SEASSON:

            /* Retorna una copia del estado ---> un estado nuevo  en donde tenga las prop del state,
           se modifican la prop que quiero modificar, en el llamado allCountries tambien seteamos toda 
           la info de actividades por temporadas para despues filtrarlos! Devuelve all o devuelve por
           el filtro, */
            const temporadaS = state.countries;
            const temporada = action.payload === "All" ? temporadaS : temporadaS.filter((el) => 
                el.Activities && el.Activities.filter((activity) => activity.seasson === action.payload).length > 0);
        
           return {
               ...state,
               allCountries: temporada,
           };
            
        
        case FILTER_BY_NAME:

            /* Retorna una copia del estado ---> un estado nuevo  en donde tenga las prop del state,
            se modifican la prop que quiero modificar, en el llamado allCountries tambien seteamos toda 
            la info en countries para despues filtrarlos!*/

            var sortCountries;
            if (action.payload === "all") sortCountries = state.countries;
            else if (action.payload.length === 3) {
                sortCountries = action.payload === "ASC"
                ? state.allCountries.sort((a, b) => { // el sort compara 
                    if (a.name > b.name) return 1; // compara el que encuentra primero con el que encuentra después, si es mayor retorna 1 (retorna b), en posicion 0 esta a
                    if (a.name < b.name) return -1;
                    return 0; // si son iguales los devuelve igual, los deja como esta
                })
                : state.allCountries.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                });
            }
            return {
                ...state,
                allCountries: sortCountries,
            };
        case FILTER_BY_POPULATION:
            let sortPopulation;
            if (action.payload === "all") sortPopulation = state.countries;
            else
            sortPopulation =
            action.payload === "ASC"
            ? state.allCountries.sort(
                (a, b) => a.population - b.population
              )
            : state.allCountries.sort(
                (a, b) => b.population - a.population
              );
            return {
                ...state,
                allCountries: sortPopulation,
            };
        case FILTER_BY_AREA:
            let sortArea;
            if (action.payload === "all") sortArea = state.countries;
            else
            sortArea =
            action.payload === "ASC"
            ? state.allCountries.sort((a, b) => a.area - b.area)
            : state.allCountries.sort((a, b) => b.area - a.area)
            return {
                ...state, 
                allCountries: sortArea
            }
        
        case GET_ALL_ACTIVITIES:

            /* Retorna una copia del estado ---> un estado nuevo  en donde tenga las prop del state,
            se modifican la prop que quiero modificar, en el llamado activities tambien seteamos toda 
            la info de los actividades para despues filtrarlos!*/

            return { 
                ...state, 
                activities: action.payload,
            };
        case GET_ACTIVITY_DETAILS:
            return {
                ...state,
                activityDetail: action.payload,
            }
        case CREATE_ACTIVITY:
            return {
                ...state,
            }
        case DELETE_ACTIVITY:
            return {
                ...state,
            }
        case UPDATE_ACTIVITY:
            return {
                ...state,
            }
        case FILTER_BY_ACTIVITY:

            /* Retorna una copia del estado ---> un estado nuevo  en donde tenga las prop del state,
           se modifican la prop que quiero modificar, en el llamado allCountries tambien seteamos toda 
           la info de activity por nombre para despues filtrarlos!*/

            let filterActivityName;
            if (action.payload === "all") filterActivityName = state.countries;
            else filterActivityName = state.countries.filter((country) =>
               country.Activities.filter((activity) => activity.name === action.payload).length > 0
            );
           
           
            return {
               ...state,
               allCountries: filterActivityName,
            };
        case ORDER_COUNTRIES:
            let order = state.countries;

            action.payload === "Asc" && order.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            action.payload === "Desc" && order.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
            action.payload === "Max" && order.sort((a, b) => {
                return b.population - a.population;
            });
            action.payload === "Min" && order.sort((a, b) => {
                return a.population - b.population;
            });

            return { ...state, countries: order };

       
            
        default:
            return {...state};
    }
};
export default rootReducer;
