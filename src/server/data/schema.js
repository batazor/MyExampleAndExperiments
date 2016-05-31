import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType
} from 'graphql'

// todo
import todoQueries from './queries/todo'
import todoMutation from './mutation/todo'

// counter
import counterQueries from './queries/counter'
import counterMutation from './mutation/counter'

// Setup GraphQL RootQuery
const RootQuery = new ObjectType({
  name: 'Query',
  description: 'Realize Root Query',
  fields: () => ({
    todo: todoQueries.todo,
    todos: todoQueries.todos,
    todoId: todoQueries.todoId,
    counter: counterQueries.getCounter
  })
})

// Setup GraphQL RootMutation
const RootMutation = new ObjectType({
  name: 'Mutation',
  description: 'Realize Root Mutations',
  fields: () => ({
    addTodo: todoMutation.addTodo,
    updateTodo: todoMutation.updateTodo,
    increaseCounter: counterMutation.increaseCounter,
    dicreaseCounter: counterMutation.dicreaseCounter
  })
})

const schema = new Schema({
  query: RootQuery,
  mutation: RootMutation
})

export default schema
