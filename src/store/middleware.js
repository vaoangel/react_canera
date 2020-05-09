import APIS from "../router/index.js"
const promiseMiddleware = store => next => action => {

    if(action.method !== undefined){   
      // console.log(APIS[action.api][action.method])

          store.dispatch({type:action.type+"_PENDING"})
          APIS[action.api][action.method](action.payload).then(res=>{
              // console.log(res);
              
      
          store.dispatch({type:action.type+"_SUCCESS",payload:res}) 
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