import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import count from './count'
import todos from './todos'
import user from './user'
import photos from './photos'
import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  count,
  user,
  photos,
  routing
})

export default rootReducer
