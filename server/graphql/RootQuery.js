import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql'

import Mutation from './Mutation.js'

import UserModel from '../models/UserModel.js'
import JobModel from '../models/JobModel.js'

import UserType from './schema/UserType/UserType.js'
import PostType from './schema/PostType/PostType.js'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getUser: {
      type: UserType,
      args: { fbID: { type: GraphQLID } },
      resolve(parent, args) {
        return UserModel.findOne({ fbID: args.fbID })
      },
    },
    getUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return UserModel.find({})
      },
    },
    getPost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return JobModel.findOne({ _id: args.id })
      },
    },
    getPosts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return JobModel.find({})
      },
    },

  },
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
