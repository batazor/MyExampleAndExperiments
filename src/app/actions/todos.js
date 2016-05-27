import 'whatwg-fetch'

import {
  INIT_TODO,
  ADD_TODO,
  SET_VISIBILITY_FILTER,
  TOGGLE_TODO,
  ERROR
} from '../constants'

let nextTodoId = 0
const API_URL = `http://localhost:${__PORT__}/graphql`

export const initTodo = (text) => {

  const query = `
    query {
      todos {
        _id
        text
        completed
      }
    }
  `

  return (dispatch) => fetch(API_URL + `?query=${query}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/graphql'
    })
  })
  .then(response => response.json())
  .then(
    json => dispatch({
      type: INIT_TODO,
      payload: json
    })
  )
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }))
}

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    id
  }
}
