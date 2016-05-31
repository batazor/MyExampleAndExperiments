import 'whatwg-fetch'

import {
  COUNTER_INIT,
  COUNTER_INCREASE,
  COUNTER_DECREASE,
  ERROR
} from '../constants/Counter'

const API_URL = `http://localhost:${__PORT__}/graphql`

export function init() {

  const query = `
    query {
      counter {
        number
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
    type: COUNTER_INIT,
    payload: json.data.counter
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }))
}

export function increase() {

  const mutation = `
    mutation {
      increaseCounter {
        number
      }
    }
  `.trim()

  return (dispatch) => fetch(API_URL + `?query=${mutation}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql'
    }
  })
  .then(response => response.json())
  .then((json) => dispatch({
    type: COUNTER_INCREASE,
    payload: json.data.increaseCounter
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }))
}

export function decrease() {

  const mutation = `
    mutation {
      decreaseCounter {
        number
      }
    }
  `.trim()

  return (dispatch) => fetch(API_URL + `?query=${mutation}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql'
    }
  })
  .then(response => response.json())
  .then((json) => dispatch({
    type: COUNTER_DECREASE,
    payload: json.data.decreaseCounter
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }))
}
