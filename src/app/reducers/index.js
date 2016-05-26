import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import count from './count'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  count,
  routing
})

export default rootReducer
