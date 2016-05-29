import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import counter from './counter'
import todos from './todos'
import user from './user'
import photos from './photos'
import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  counter,
  user,
  photos,
  routing
})

export default rootReducer
