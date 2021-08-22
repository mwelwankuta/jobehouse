import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment'
import TimeStampToDate from 'timestamp-to-date'
import { ClockIcon } from '@heroicons/react/solid'
import { useMutation } from '@apollo/client'
import { JOIN_ROOM } from '../Graphql/Mutations'

import { PostsContext } from '../Contexts/PostsContext/postsContext'

import '../Styles/Components/JobCard.css'

function PostCard({ id, title, description, status, date, user, people }) {
  const { posts, setPosts } = useContext(PostsContext)

  const [haveIRequested, setHaveIRequested] = useState(false)
  const [loading, setLoading] = useState(false)

  const joblink = `/job/${id}`
  const dateFromTimeStamp = TimeStampToDate(date, 'yyyy-MM-dd HH:mm:ss')
  const readableDate = moment(dateFromTimeStamp).fromNow()

  const [joinRoom, { data }] = useMutation(JOIN_ROOM)

  useEffect(() => {
    if (data) {
      setLoading(false)
      setPosts(posts)
    }
  }, [data, setPosts, posts])

  useEffect(() => {
    if (people) {
      if (people.length > 0) {
        if (people.filter((person) => person.fbID === user.fbID)[0]) {
          setHaveIRequested(true)
        }
      } else {
        setHaveIRequested(false)
      }
    }
  }, [people, user.fbID, posts, setHaveIRequested])

  const joinRequest = () => {
    setLoading(false)
    joinRoom({
      variables: {
        jobId: id,
        userId: user.fbID,
        userName: user.name,
        picture: user.picture
      }
    })
  }

  const joinARoom = () => {
    setLoading(true)
    setHaveIRequested(true)
    joinRequest()
    window.location = joblink
  }

  const leaveRoom = () => {
    setLoading(true)
    setHaveIRequested(false)
    joinRequest()
  }

  return (
    <div className="bg-gray-100 rounded-md border border-gray-200 py-3 px-2.5">
      <div>
        <div className="flex justify-between">
          <p className="font-semibold text-gray-800 text-xl truncate">{title}</p>
        </div>
        <p className="text-black -mt-1">{description}</p>
      </div>
      {status === 'Available' && haveIRequested === true && (
        <button onClick={() => leaveRoom()} className="text-black bg-gray-300 border border-gray-400 w-auto rounded-md py-1.5 px-3">
          {loading === true ? '...' : 'Leave Room'}
        </button>
      )}
      <small
        style={{
          color: status === 'Taken' ? 'rgb(209, 22, 22)' : 'rgb(22, 209, 78)',
        }}
      >
        {status}
      </small>
      {status === 'Available' && haveIRequested === false && (
        <button onClick={() => joinARoom()} className="text-white bg-gray-800 border border-black w-auto rounded-md py-1 px-3">
          {loading === true ? '...' : 'Join Room'}
        </button>
      )}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-gray-700 gap-1">
          <ClockIcon height="15px" />
          <small>{readableDate}</small>
        </div>
      </div>
    </div>
  )
}

export default PostCard
