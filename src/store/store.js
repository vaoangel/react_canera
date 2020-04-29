import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducers/reducers'
import promiseMiddleware from './middleware'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(promiseMiddleware)
  ));

export default store;