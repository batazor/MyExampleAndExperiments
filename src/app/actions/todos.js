import 'whatwg-fetch'

import {
  INIT_TODO,
  ADD_TODO,
  SET_VISIBILITY_FILTER,
  TOGGLE_TODO,
  ERROR
} from '../constants/Todo'

let nextTodoId = 0
const firstTodo = 0
const API_URL = `http://localhost:${__PORT__}/graphql`

export const initTodo = () => {

  const query = `
    query {
      todos {
        _id
        text
        completed
      }
    }
  `.trim()

  return (dispatch) => fetch(API_URL + `?query=${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/graphql'
    }
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: INIT_TODO,
    id: nextTodoId++,
    text: json.data.todos[firstTodo].text
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }))
}

export const addTodo = (text) => {

  const query = `
    mutation {
      addTodo (
        text: "${text}",
        completed: 0
      ) { _id, text, completed }
    }
  `.trim()

  return (dispatch) => fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql'
    },
    body: query
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: ADD_TODO,
    id: nextTodoId++,
    text: json.data.addTodo.text
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }))
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
