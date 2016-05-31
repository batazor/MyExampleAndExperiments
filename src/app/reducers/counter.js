import {
  COUNTER_INIT,
  COUNTER_INCREASE,
  COUNTER_DECREASE,
  ERROR
} from '../constants/Counter'

const initialState = {
  number: 1,
  fetching: false
}

export default function update(state = initialState, action) {
  switch (action.type) {
  case COUNTER_INIT:
    console.log(action)
    return {...state, number: action.payload.number}
  case COUNTER_INCREASE:
    return {...state, number: action.payload.number}
  case COUNTER_DECREASE:
    return {...state, number: action.payload.number}
  case ERROR:
    return state
  default:
    return state
  }
}
