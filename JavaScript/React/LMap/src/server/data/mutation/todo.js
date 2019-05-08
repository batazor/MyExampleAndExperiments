import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'

import todoType from '../types/TodoItemType'
import { addTodo, updateTodo } from '../../models/todo'

export default {
  addTodo: {
    type: todoType,
    args: {
      text: {
        name: 'text',
        type: new GraphQLNonNull(GraphQLString)
      },
      completed: {
        name: 'completed',
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: addTodo
  },
  updateTodo: {
    type: todoType,
    args: {
      _id: {
        type: GraphQLID
      },
      text: {
        name: 'text',
        type: new GraphQLNonNull(GraphQLString)
      },
      completed: {
        name: 'completed',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: updateTodo
  }
}
