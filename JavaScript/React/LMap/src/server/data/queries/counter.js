import CounterType from '../types/CounterType'
import { getCounter } from '../../models/counter'

export default {
  getCounter: {
    type: CounterType,
    args: {},
    resolve: getCounter
  }
}
