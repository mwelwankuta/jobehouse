import { gql } from '@apollo/client'

export const AUTHENTICATE_USER = gql`
  mutation authenticateUser ($fbID: ID!, $name: String!, $picture:String!, $email: String!){
    authenticateUser(fbID: $fbID, name: $name, picture:$picture, email:$email){
      fbID
      name
      picture
      bio
      email
      createdAt
    }
  }
`

export const EDIT_BIO = gql`
  mutation editBio($fbID: ID!, $bio: String!){
    editBio(fbID: $fbID, bio:$bio){
      fbID
      bio
    }
  }
`

export const ADD_POST = gql`
  mutation addPost($title:String!, $authorid:ID!, $description:String!, $picture:String!){
    addPost(title: $title, authorid:$authorid, description: $description, picture:$picture){
      title
    }
  }
`
export const REQUEST_WORK = gql`
  mutation requestWork($userid:ID!, $userName:String!, $jobId:ID!){
    requestWork(userId: $userid, userName:$userName, jobId:$jobId){
      fbID
      name
    }
  }
`