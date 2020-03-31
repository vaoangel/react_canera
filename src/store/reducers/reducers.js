const initialState = {
    animals:[],
}




const animales = (state = initialState,action) =>{
    switch(action.type){
        case "GET_ANIMALS":

            return state.animals
    }
}


export default animales