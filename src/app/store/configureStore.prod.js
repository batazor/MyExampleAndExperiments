import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  )
}


//
// import * as reducers from './reducers';
//
// const reducer = combineReducers({
//   ...reducers,
//   routing: routerReducer
// });
