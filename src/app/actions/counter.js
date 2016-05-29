import {
  INCREASE,
  DECREASE,
  GET_COUNTER,
  SET_COUNTER,
  DECREASE_COUNTER,
  INCREASE_COUNTER
} from '../constants/Counter'

export function getCounter() {
  return {
    type: GET_COUNTER,
    payload: 1
  }
}

export function setCounter(counter) {
  return {
    type: SET_COUNTER,
    payload: counter
  }
}

export function increaseCounter(counter) {
  return {
    type: INCREASE_COUNTER,
    payload: counter
  }
}

export function decreaseCounter(n) {
  return {
    type: DECREASE_COUNTER,
    amount: n
  }
}

export function increase(n) {
  return (dispatch) => {
    dispatch({
      type: INCREASE,
      amount: n
    })
  }
}

export function decrease(n) {
  return {
    type: DECREASE,
    amount: n
  }
}
