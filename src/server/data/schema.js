import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType
} from 'graphql'

import todoQueries from './queries/todo'
import todoMutation from './mutation/todo'

// Setup GraphQL RootQuery
const RootQuery = new ObjectType({
  name: 'Query',
  description: 'Realize Root Query',
  fields: () => ({
    todo: todoQueries.todo,
    todos: todoQueries.todos,
    todoId: todoQueries.todoId
  })
})

// Setup GraphQL RootMutation
const RootMutation = new ObjectType({
  name: 'Mutation',
  description: 'Realize Root Mutations',
  fields: () => ({
    addTodo: todoMutation.addTodo,
    updateTodo: todoMutation.updateTodo
  })
})

const schema = new Schema({
  query: RootQuery,
  mutation: RootMutation
})

export default schema
