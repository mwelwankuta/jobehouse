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
export const JOIN_ROOM = gql`
  mutation joinRoom($userId: ID!, $userName:String!, $jobId:ID!, $picture:String!){
    joinRoom(userId: $userId, userName:$userName, jobId:$jobId, picture: $picture){
      fbID
      name
    }
  }
`
export const GET_ROOM = gql`
  mutation getRoom($roomid: ID!){
    getRoom(roomid: $roomid){
      title
      description
      date
      people{
        name
        picture
      }
    }
  }
`