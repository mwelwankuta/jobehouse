import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";


const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    fbID: { type: GraphQLID },
    postId: { type: GraphQLID },
    comment: { type: GraphQLString }
  }),
})


export default CommentType