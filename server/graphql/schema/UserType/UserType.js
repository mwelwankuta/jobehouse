import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import JobModel from '../../../models/JobModel.js'
import PostType from '../PostType/PostType.js'
import VoteType from './VoteType.js'

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    fbID: { type: GraphQLID },
    name: { type: GraphQLString },
    picture: { type: GraphQLString },
    bio: { type: GraphQLString },
    upvotes: { type: new GraphQLList(VoteType) },
    downvotes: { type: new GraphQLList(VoteType) },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return JobModel.find({ authorid: parent.fbID })
      },
    },
  }),
})

export default UserType
