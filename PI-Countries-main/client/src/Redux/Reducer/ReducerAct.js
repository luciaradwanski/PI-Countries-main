import { POST_ACTIVITY, GET_ACTIVITIES, GET_COUNTRY_BY_ID, GET_COUNTRY_BY_NAME, GET_COUNTRIES, ORDER_BY_NAME, ORDER_CONTINENT, ORDER_POPULATION, ORDER_BY_ACTIVITY } from "./Actions";

/*

GET_ALL_COUNTRIES 
GET_COUNTRY_BY_NAME";//
GET_CONTINETS";//
CLEAR_COUNTRY";
GET_COUNTRY_BY_ID";//
"FILTER_CONTINENTS";
"FILTER_ACTIVITIES";
"ORDER_COUNTRIES";
"LOAD_COUNTRIES";
GET_ACTIVITIES";
*/

const initialState = {
    AllCountries: [],
    countries: [],
    filter: [],
    activities: [],
    activitiesName: []

};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case GET_COUNTRIES:

            return {   
                ...state,
                AllCountries: action.payload,
                countries: action.payload
            };

        case GET_COUNTRY_BY_NAME:

            return {
                ...state,
                countries: action.payload
            };

        case GET_COUNTRY_BY_ID:

            return {
                ...state,
                countries: action.payload
            };
        case ORDER_BY_NAME: 
            
            //ascendente o descendente

            /**
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
             */

            let arreglo = action.payload === 'asc' ?
            [...state.countries].sort(function (a, b) {
                if (a.Name[0] > b.Name[0]) {return 1}
                if (b.Name[0] > a.Name[0]) { return -1 }
                return 0
            }) :
            [...state.countries].sort(function (a, b) {
                if (a.Name[0] > b.Name[0]) { return -1 }
                if (b.Name[0] > a.Name[0]) { return 1 }
                return 0
            })
            return {
                ...state,
                countries: arreglo.splice(0, 250)
            }
        case ORDER_CONTINENT:

            return {
                ...state,
                countries: state.AllCountries.filter(e => e.Contienente === action.payload)
            }
            case ORDER_BY_ACTIVITY: //ver el ID

            let country = action.payload.map(e => e.countries[0].ID)
            let arr = []
            state.AllCountries.filter(e => {
                if (country.includes(e.ID)) {
                    arr.push(e)
                }
            })
            return {
                ...state,
                countries: arr
            }
        case ORDER_POPULATION:


            /**
             

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
             */

            const ord = action.payload === "min" ?
            [...state.countries].sort(function (a, b) {
                if (a.Poblacion > b.Poblacion) {
                    return 1
                }
                if (b.Poblacion > a.Poblacion) {
                    return -1
                }
                return 0
            }) :
            [...state.countries].sort(function (a, b) {
                if (a.Poblacion > b.Poblacion) {
                    return -1
                }
                if (b.Poblacion > a.Poblacion) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                countries: ord
            }
        case GET_ACTIVITIES:

            return {
                ...state,
                activitis: action.payload
            }
        case POST_ACTIVITY:
      
            return { ...state }

        default: return { ...state, };
    }
};

export default rootReducer;