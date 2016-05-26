import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import count from './count'

const rootReducer = combineReducers({
  count,
  routing
})

export default rootReducer
