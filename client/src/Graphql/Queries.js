import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query{
    getPosts {
      title
      description
      authorid
      status
      date
    }
  }
`