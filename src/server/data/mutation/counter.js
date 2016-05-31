import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'

import counterType from '../types/CounterType'
import { increase, decrease } from '../../models/counter'

export default {
  increaseCounter: {
    type: counterType,
    args: {},
    resolve: increase
  },
  decreaseCounter: {
    type: counterType,
    args: {},
    resolve: decrease
  }
}
