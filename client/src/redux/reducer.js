import {
    GET_ALL_DOGS,
    GET_DOG_DETAIL,
    GET_DOG_NAME,
    GET_ALL_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENT,
    FILTER_ABC,
    FILTER_CREATED_DOG,
    FILTER_BY_WEIGHT,
    //FILTER_BY_TEMPERAMENTS,
    POST_DOG,
    CLEAR_DETAIL,
    
} from './actions';

const initialState = {
    dogs: [],
    dogDetail: {},
    allDogs: [],
    allTemperaments: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_DOGS : return {
            ...state,
            dogs: action.payload,
            allDogs: action.payload
        }
        case GET_DOG_DETAIL: return {
            ...state,
            dogDetail: action.payload
        }
        case GET_DOG_NAME: return {
            ...state,
            dogs: action.payload
        }
        case FILTER_ABC:
            const filterAbcDogs = action.payload === 'asc'?
            state.dogs.sort((a, b) => {
                if(a.name > b.name) return 1
                if(a.name < b.name) return -1
                return 0;
            })
            :
            state.dogs.sort((a, b) => {
                if(a.name > b.name) return -1
                if(a.name < b.name) return -1
                return 0
            })
            //console.log(filterAbcDogs)
            return {
                ...state,
                dogs: filterAbcDogs
            }
        case FILTER_CREATED_DOG:
            
            const allDogs02 = state.allDogs
            const filterCreated = action.payload === 'created' ? allDogs02.filter(d => d.createdInDb)
            :
            allDogs02.filter(d => !d.createdInDb)
            return {
                ...state,
                dogs: action.payload === 'all' ? state.allDogs : filterCreated
            }
        case FILTER_BY_WEIGHT:
            const allDogsP = state.allDogs.filter(d => d.weight)
            console.log(action.payload, 'soy el PAYLOAD')
            const filterWeight = action.payload === 'min' ? allDogsP.sort((a, b) => {
                return a.weight - b.weight
            }) :
            allDogsP.sort((a, b) => {
                return a.weight - b.weight
            }).reverse()
            return {
                ...state,
                dogs: filterWeight
            }
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        //     case FILTER_BY_TEMPERAMENT:
        //   if(action.payload !== undefined){
        //     const filtered = state.allDogs.filter((e) => e.temperament?.includes(action.payload.charAt(0).toUpperCase() + action.payload.slice(1)))
        //     let arr = []
        //       state.created.forEach(e => {
        //       e.temperaments.forEach(el => {
        //         if(el.name.includes(action.payload.charAt(0).toUpperCase() + action.payload.slice(1))){
        //           arr.push(e)}
        //         });
        //       })
        //     const all = filtered.concat(arr)
        //     return{
        //       ...state,
        //       dogs: all
        //     }
        //   }else{
        //     return{
        //       ...state,
        //       breeds: state.allBreeds
        //     }
        //   }
        case FILTER_BY_TEMPERAMENT:
            const allDogs2 = [...state.allDogs];
            const filteredTemperament = action.payload === 'All Temperaments' ? allDogs2 
            : allDogs2.filter(e => e.temperament?.includes(action.payload)
            )
            console.log(filteredTemperament)
            return {
                ...state,
                dogs: filteredTemperament
            }
        case CLEAR_DETAIL: {
            return {
                ...state,
                dogDetail: {}
            }
        }
        case POST_DOG: return {
            ...state
        }
        default: return state
    }
}

export default rootReducer;