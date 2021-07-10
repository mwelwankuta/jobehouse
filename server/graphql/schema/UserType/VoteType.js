import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

const VoteType = new GraphQLObjectType({
  name: 'Vote',
  fields: () => ({
    fbID: { type: GraphQLID },
    name: { type: GraphQLString },
    picture: { type: GraphQLString },
  }),
})

export default VoteType
