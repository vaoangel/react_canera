import ActionTypes from '../ActionTypes'

const initialState = {
    currentRivia: 'vacio'
}




const rivia = (state,action) =>{
   console.log(action);
   
    return{
        ...state,
        currentRivia:  action.error ? null : action.payload
    }
}
// const getAnimales = (state,action) =>{
//     // console.log(action.payload);
    
//     return{
//         ...state,
//         animals: action.error ? null : action.payload
//     }
// }

const Action = ActionTypes.RIVIA_TYPE

export default (state = initialState, action) =>{
    switch(action.type){
        case Action.INSERT_RIVIA:
            return rivia(state,action);
        default:
            return {...state}
    }
}

