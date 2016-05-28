import {
  GraphQLList as List,
  GraphQLID
} from 'graphql'

import TodoItemType from '../types/TodoItemType'
import { getListOfTodos, getTodoByPosition, getTodoById } from '../../models/todo'

export default {
  todos: {
    type: new List(TodoItemType),
    resolve: getListOfTodos
  },
  todo: {
    type: TodoItemType,
    args: {
      _id: {
        type: GraphQLID
      }
    },
    resolve: getTodoByPosition
  },
  todoId: {
    type: TodoItemType,
    args: {
      _id: {
        type: GraphQLID
      }
    },
    resolve: getTodoById
  }
}
