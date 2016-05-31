import {
  GraphQLObjectType as ObjectType,
  GraphQLInt,
  GraphQLNonNull as NonNull
} from 'graphql'

const CounterType = new ObjectType({
  name: 'counter',
  description: 'CRUD counter',
  fields: {
    number: { type: new NonNull(GraphQLInt) }
  }
})

export default CounterType
