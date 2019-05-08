import {
  GraphQLObjectType as ObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull as NonNull,
  GraphQLID
} from 'graphql'

const TodoItemType = new ObjectType({
  name: 'TodoItem',
  description: 'CRUD TodoList',
  fields: {
    _id: { type: new NonNull(GraphQLID) },
    text: { type: new NonNull(GraphQLString) },
    completed: { type: new NonNull(GraphQLInt) },
    publishedDate: { type: new NonNull(GraphQLString) },
    updateDate: { type: new NonNull(GraphQLString) }
  }
})

export default TodoItemType
