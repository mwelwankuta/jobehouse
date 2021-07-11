import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import UserType from './schema/UserType/UserType.js'
import PostType from './schema/PostType/PostType.js'
import RequestType from './schema/PostType/RequestType.js'
import CommentType from './schema/PostType/CommentType.js'

import {
  addPostResolver,
  authenticateUserResolver,
  addCommentResolver,
  deletePostResolver,
  editBioResolver,
  getPostResolver,
  getUserResolver,
  requestWorkResolver
} from './resolvers/mutations/Resolvers.js'

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    authenticateUser: {
      type: UserType,
      args: {
        fbID: { type: GraphQLID },
        name: { type: GraphQLString },
        picture: { type: GraphQLString },
        bio: { type: GraphQLString },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLString },
      },
      resolve(parent, args) {
        return authenticateUserResolver(args.fbID, args.name, args.picture, args.email)
      },
    },
    getUser: {
      type: new GraphQLList(PostType),
      args: { fbID: { type: GraphQLID } },
      resolve(parent, args) {
        return getUserResolver(args.fbID)
      },
    },
    editBio: {
      type: UserType,
      args: {
        fbID: { type: GraphQLID },
        bio: { type: GraphQLString },
      },
      resolve(parent, args) {
        return editBioResolver(args.fbID, args.bio)
      },
    },
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        authorid: { type: GraphQLID },
        picture: { type: GraphQLString },
      },
      resolve(parent, args) {
        return addPostResolver(args.title, args.description, args.authorid, args.picture, 0)/* 0 for comments */
      },
    },
    getPosts: {
      type: new GraphQLList(PostType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return getPostResolver(args.id)
      },
    },
    deletePost: {
      type: PostType,
      args: { jobId: { type: GraphQLID } },
      resolve(parent, args) {
        return deletePostResolver(args.jobId)

      }
    },
    requestWork: {
      type: RequestType,
      args: {
        userId: { type: GraphQLID },
        userName: { type: GraphQLString },
        jobId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return requestWorkResolver(args.userId, args.userName, args.jobId)
      },
    },
    addComment: {
      type: CommentType,
      args: {
        fbID: { type: GraphQLID },
        comment: { type: GraphQLString },
        postId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return addCommentResolver(args.fbID, args.comment, args.postId)
      }
    },
  },
})

export default Mutation
