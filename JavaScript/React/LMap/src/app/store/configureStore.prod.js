import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { redirect } from '../middlewares/redirect'

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, redirect),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}
