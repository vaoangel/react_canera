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


const Action = ActionTypes.RIVIA_TYPE

export default (state = initialState, action) =>{
    switch(action.type){
        case Action.INSERT_RIVIA:
            return rivia(state,action);
        case Action.FETCH_RIVIA:
            return {...state,currentRivia:action.payload}
        case Action.FETCH_RIVIA_SUCCESS:
            return {...state}
        default:
            return {...state}
    }
}

