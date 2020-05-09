
import ActionTypes from '../ActionTypes'

const initialState = {
    animals:undefined,
    currentAnimal: undefined,
    loading:false,
    municipis:undefined,
    provincies: undefined,
}




const animales = (state,action) =>{
   
    return{
        ...state,
         currentAnimal:  action.error ? null : action.payload
    }
}
// const getAnimales = (state,action) =>{
//     // console.log(action.payload);
    
//     return{
//         ...state,
//         animals: action.error ? null : action.payload
//     }
// }

const Action = ActionTypes.ANIMALS_TYPE

export default (state = initialState, action) =>{
    // console.log(action.type);
    // console.log(action.payload);
    
    
    switch(action.type){
        case Action.INSERT_ANIMAL:
            return animales(state,action);
        case Action.INSERT_ANIMAL_SUCCESS:
            return {...state, loading:false, currentAnimal: action.payload}

        case Action.FETCH_ANIMALS:
            
            return {...state,animals:action.payload}

        case Action.FETCH_ANIMAL:
            return {...state,currentAnimal:action.payload}

        case Action.FETCH_MUNICIPIS:  
        // console.log("adssdasdadsa");
            return {...state,municipis:action.payload}

        case Action.FETCH_PROVINCIES:  
            return {...state,provincies:action.payload}

        case Action.FETCH_MUNICIPIS_SUCCESS:  
            return {...state,loading:false,municipis:action.payload}

        case Action.FETCH_PROVINCIES_SUCCESS:
            return {...state,loading:false,provincies:action.payload}

        case Action.FETCH_ANIMALS_SUCCESS:
            return {...state, loading:false, animals: action.payload}

        case Action.FETCH_ANIMALS_PENDING:            
            return {...state,loading:true}

        case Action.FETCH_MUNICIPIS_PENDING:            
            return {...state,loading:true}

        case Action.FETCH_PROVINCIES_PENDING:            
            return {...state,loading:true}


        case Action.INSERT_ANIMAL_PENDING:            
            return {...state,loading:true}

        case Action.FETCH_CURRENT:
            return{...state,currentAnimal: action.payload}

        default:
            return {...state}
    }
}