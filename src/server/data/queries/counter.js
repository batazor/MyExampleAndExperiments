import {
  GraphQLInt
} from 'graphql'

import CounterType from '../types/CounterType'
import { increase, dicrease, getCounter } from '../../models/counter'

export default {
  getCounter: {
    type: CounterType,
    args: {},
    resolve: getCounter
  }
}
