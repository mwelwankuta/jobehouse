import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

const RequestType = new GraphQLObjectType({
  name: 'Request',
  fields: () => ({
    fbID: { type: GraphQLID },
    name: { type: GraphQLString },
    picture: { type: GraphQLString },
  }),
})

export default RequestType
