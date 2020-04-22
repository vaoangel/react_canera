
import ActionTypes from '../ActionTypes'

const initialState = {
    animals:null,
    currentAnimal: 'vacio'
}




const animales = (state,action) =>{
   
    return{
        ...state,
        // currentAnimal:  action.error ? null : action.payload
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
    // console.log(action.payload);
    
    switch(action.type){
        case Action.InsertAnimal:
            return animales(state,action);
        case Action.FETCH_ANIMALS:
            return {...state,animals:action.payload}
        case Action.FETCH_ANIMAL:
            return {...state,currentAnimal:action.payload}
        case Action.FETCH_ANIMALS_SUCCESS:
            return {...state}
        default:
            return {...state}
    }
}