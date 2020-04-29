import APIS from "../router/index.js"
const promiseMiddleware = store => next => action => {

    if(action.method !== undefined){   
      console.log(APIS.AnimalsApi[action.method])

          store.dispatch({type:action.type+"_PENDING"})
          APIS.AnimalsApi[action.method]().then(res=>{
              console.log(res);
              
      
          store.dispatch({type:action.type+"_SUCCESS",payload:res.results}) 
        },
        err=>{
          store.dispatch({type:action.type+"_FAILURE",error:err})
        })
        return;
    }
    // / Si la accion no necesita de una logica en el servidor la pasaremos directamente al REDUCER 
    next(action)

 }

export default promiseMiddleware