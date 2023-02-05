import { GET_COUNTRIES, FILTER_BY_CONTINENT, ORDER_BY_NAME, FILTER_POPULATION} from "../Actions";
//GET_ALL_ACTIVITIES, GET_NAME_COUNTRY, GET_DETAIL, FILTER_BY_CONTINENT, ORDER_BY, FILTER_BY_ACTIVITY, POST_ACTIVITY, DELETE_ACTIVITY
const initialState = {
    countries: [],
    activities: [],
    detail: [],
    alertas: [],
    allCountries: [],
}

function rootReducer (state = initialState, action){

    // var allCountries = [];

    switch(action.type){

                
        case GET_COUNTRIES: 
            
            return {...state, countries: action.payload, allCountries: action.payload}

        // case GET_ALL_ACTIVITIES: 
            
        //     return {...state, activities: action.payload}

        // case GET_NAME_COUNTRY: 
            
        //     return {...state, countries: action.payload}       

        // case GET_DETAIL: 
            
        //     return {...state, detail: action.payload}

        // case POST_ACTIVITY: 
        
        //     return {...state}

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

        
    

        // case FILTER_BY_ACTIVITY:
            
        //     var filt=[];
        //     allCountries = state.allCountries;
        //     allCountries.forEach(el => {
        //         el.activities.forEach((act) => {
        //             if (act.name === action.payload){
        //                 filt.push(el)
        //             }
        //         })
        //     }) 
        //         //ALTERNATIVA EN FOR ANTIGUO PARA EL CASO DE ARRIBA
        //      /*for(var i=0; i<allCountries.length;i++){
        //             for(var j=0; j<allCountries[i].activities.length;j++){
        //                 if(allCountries[i].activities[j].name === action.payload){
        //                     filt.push(allCountries[i])
        //                 }
        //             }
        //         } */                          
        //         console.log('reducer filterAct')
        //         console.log(filt)

                

        //         return {...state, countries: filt}

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

            

        //     case DELETE_ACTIVITY:
        //         return {
        //             ...state,                                                      
        //                activities: state.activities.filter(a => a.id !== action.payload)                      
        //         };
                
        default: return {...state}
    }


}

export default rootReducer;