import {
  GraphQLObjectType as ObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull as NonNull,
  GraphQLID
} from 'graphql'

const CounterType = new ObjectType({
  name: 'counter',
  description: 'CRUD counter',
  fields: {
    number: { type: new NonNull(GraphQLInt) }
  }
})

export default CounterType
