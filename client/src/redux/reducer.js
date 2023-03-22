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
            console.log(filterAbcDogs)
            return {
                ...state,
                dogs: filterAbcDogs
            }
        case FILTER_CREATED_DOG:
            const allDogs = state.allDogs
            const filterCreated = action.payload === 'created' ? allDogs.filter(d => d.createdInDb)
            :
            allDogs.filter(d => !d.createdInDb)
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
                allTemperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:
            const allDogs2 = state.allDogs
            const filteredTemperament = action.payload === 'all' ? allDogs : allDogs2.filter(e => {
                return e.temperaments.includes(action.payload)
            })
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