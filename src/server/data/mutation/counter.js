import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'

import counterType from '../types/CounterType'
import { increase, dicrease } from '../../models/counter'

export default {
  increaseCounter: {
    type: counterType,
    args: {},
    resolve: increase
  },
  dicreaseCounter: {
    type: counterType,
    args: {},
    resolve: dicrease
  }
}
