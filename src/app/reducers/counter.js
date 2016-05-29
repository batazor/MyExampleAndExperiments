import { INCREASE, DECREASE } from '../constants/Counter'

const initialState = {
  step: 1,
  number: 1,
  fetching: false
}

export default function update(state = initialState, action) {
  switch (action.type) {
  case INCREASE:
    return {...state, number: state.number + action.amount}
  case DECREASE:
    return {...state, number: state.number - action.amount}
  default:
    return state
  }
}
