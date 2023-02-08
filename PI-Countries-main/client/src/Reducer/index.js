import { GET_COUNTRIES, FILTER_BY_CONTINENT, ORDER_BY_NAME, FILTER_POPULATION, GET_NAME_COUNTRY, GET_ACTIVITIES, POST_ACTIVITY, GET_DETAIL, FILTER_BY_ACTIVITY, DELETE_ACTIVITY} from "../Actions";

const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: [],
    alertas: [],
}

function rootReducer (state = initialState, action){

    // var allCountries = [];

    switch(action.type){

                
        case GET_COUNTRIES: 
            
            return {
                ...state, 
                countries: action.payload, 
                allCountries: action.payload
            }

        case GET_ACTIVITIES: 
            
            return {
                ...state, 
                activities: action.payload
            }

        case GET_NAME_COUNTRY:   
            
            return {
                ...state, 
                countries: action.payload
            }       

        case GET_DETAIL: 
            
            return {...state, detail: action.payload}

        case POST_ACTIVITY: 
        
            return {
                ...state
            }

        case FILTER_BY_CONTINENT: 

            const allCountries = state.allCountries;
            const continentFilter = action.payload === 'All' ? allCountries : allCountries.filter(el => el.continent === action.payload)

            return {
                ...state, 
                countries: continentFilter
            }
        case FILTER_POPULATION:
            let sortPopulation;
            if (action.payload === "all") sortPopulation = state.allCountries;
            else
            sortPopulation =
            action.payload === "ASC"
            ? state.countries.sort(
                (a, b) => a.population - b.population
              )
            : state.countries.sort(
                (a, b) => b.population - a.population
              );
            return {
                ...state,
                countries: sortPopulation,
            };

        
    

        case FILTER_BY_ACTIVITY:
            
            var filt=[];
            const filterCountries = state.allCountries;
            filterCountries.forEach(el => {
                el.activities.forEach((act) => {
                    if (act.name === action.payload){
                        filt.push(el)
                    }
                })
            }) 
                                       
                console.log('reducer filterAct')
                console.log(filt)

                

                return {...state, countries: filt}

        case ORDER_BY_NAME:
            let sortedArr = action.payload === 'asc' ? 
            state.countries.sort(function(a,b) {
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1;
                }
                return 0;
            }) 
            : state.countries.sort(function(a,b) {
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0;
            }) 
            return {...state, countries: sortedArr}

            

            case DELETE_ACTIVITY:
                return {
                    ...state,                                                      
                       activities: action.payload        
                };
                
        default: return {...state}
    }


}

export default rootReducer;