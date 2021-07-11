import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_POSTS } from '../../Graphql/Queries'

import { PostsContext } from './postsContext'
import { UpcomingContext } from './upcomingContext'

function PostsContextProvider({ children }) {

  const [upcomings, setUpcomings] = useState([])
  const [posts, setPosts] = useState([])

  const { data } = useQuery(GET_POSTS)

  useEffect(() => {
    if (data) {
      if (data.getPosts) {
        const theposts = data.getPosts
        setPosts(theposts)
      }
    }

  }, [data])

  const PostContextValue = { posts, setPosts }
  const UpcomingContextValue = { upcomings, setUpcomings }
  return (
    <PostsContext.Provider value={PostContextValue}>
      <UpcomingContext.Provider value={UpcomingContextValue}>
        {children}
      </UpcomingContext.Provider>
    </PostsContext.Provider>
  )
}

export default PostsContextProvider
