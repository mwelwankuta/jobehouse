import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query{
    getPosts {
      id
      title
      description
      authorid
      status
      date
      people {
        fbID
        name
      }
    }
  }
`