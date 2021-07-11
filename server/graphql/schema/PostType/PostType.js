import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import UserModel from '../../../models/UserModel.js'

import UserType from '../UserType/UserType.js'
import RequestType from './RequestType.js'
import CommentType from './CommentType.js'

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    authorid: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    requests: { type: GraphQLList(RequestType) },
    image: { type: GraphQLString },
    status: { type: GraphQLString },
    date: { type: GraphQLString },
    comments: { type: new GraphQLList(CommentType) },
    user: {
      type: UserType,
      resolve(parent, args) {
        return UserModel.findOne({ fbID: parent.authorid })
      },
    },
  }),
})

export default PostType
