const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Like {
    id: ID!
    fbID: ID!
    name: String!
  }

  type Comment {
    id: ID!
    fbID: ID!
    name: String!
    text: String!
  }

  type Post {
    id: ID!
    fbID: ID
    text: String
    imageUrl: String
    comments: Comment
    date: String!
  }

  type Follow {
    id: ID!
    fbID: ID!
    name: String!
  }

  type User {
    id: ID!
    fbID: ID
    name: String!
    picture: String
    bio: String
    followers: [Follow]
    following: [Follow]
    email: String
    createdAt: String!
  }

  type Query {
    getUser(fbID: ID!): User!
    getUsers: [User!]!
    getPost(id: ID!): Post!
    getPosts: [Post!]!
  }

  type Mutation {
    authenticateUser(
      fbID: ID!
      name: String!
      picture: String!
      bio: String
      email: String
      createdAt: String!
    ): User!
    editBio(fbID: ID!, bio: String!): User!
    addPost(text: String, imageUrl: String, fbID: ID!): Post!
    deletePost(id: ID!): Post!
    addComment(fbID: ID!, text: String, name: ID!, id: ID!): Post
  }
`;

module.exports = typeDefs;
