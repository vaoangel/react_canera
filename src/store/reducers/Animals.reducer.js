import ActionTypes from '../ActionTypes'

const initialState = {
    animals:[],
}




const animales = (state,action) =>{
   
    return{
        ...state,
        animals:  action.error ? null : action.payload.animals
    }
}

const Action = ActionTypes.ANIMALS_TYPE

export default (state = initialState, action) =>{
    switch(action.type){
        case Action.InsertAnimal:
            return animales(state,action);
    }
}