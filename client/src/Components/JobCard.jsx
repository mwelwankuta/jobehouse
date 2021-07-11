import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ClockIcon, XIcon } from '@heroicons/react/solid'
import { ReplyIcon } from '@heroicons/react/outline'
import moment from 'moment'
import TimeStampToDate from 'timestamp-to-date'

import { PostsContext } from '../Contexts/PostsContext/postsContext'

import { useMutation } from '@apollo/client'
import { REQUEST_WORK } from '../Graphql/Mutations'

import '../Styles/Components/JobCard.css'

function PostCard({ id, title, description, status, date, user, requests }) {
  const { posts, setPosts } = useContext(PostsContext)

  const [haveIRequested, setHaveIRequested] = useState(false)
  const [loading, setLoading] = useState(false)

  const joblink = `/job/${id}`
  const dateFromTimeStamp = TimeStampToDate(date, 'yyyy-MM-dd HH:mm:ss')
  const readableDate = moment(dateFromTimeStamp).fromNow()

  const [requestWork, { data }] = useMutation(REQUEST_WORK)

  useEffect(() => {
    if (data) {
      setLoading(false)
      setPosts(posts)
    }
  }, [data, setPosts, posts])

  useEffect(() => {
    if (requests) {
      if (requests.length > 0) {
        if (requests.filter((request) => request.fbID === user.fbID)[0]) {
          setHaveIRequested(true)
        }
      } else {
        setHaveIRequested(false)
      }
    }
  }, [requests, user.fbID, posts, setHaveIRequested])

  const workRequest = () => {
    setLoading(false)
    requestWork({
      variables: {
        jobId: id,
        userid: user.fbID,
        userName: user.name,
      }
    })
  }

  const addRequest = () => {
    setLoading(true)
    setHaveIRequested(true)
    workRequest()
  }

  const removeRequest = () => {
    setLoading(true)
    setHaveIRequested(false)
    workRequest()
  }

  return (
    <div className="job-card-holder">
      <Link to={joblink}>
        <div className="job-header">
          <p className="job-title">{title}</p>
        </div>
        <p className="job-description">{description}</p>
      </Link>
      {status === 'Available' && haveIRequested === true && (
        <button onClick={() => removeRequest()} className="cancel-request-btn">
          {loading === false && <XIcon height="15px" />}
          {loading === true ? '...' : 'Cancel'}
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
        <button onClick={() => addRequest()}>
          {loading === false && <ReplyIcon height="15px" />}
          {loading === true ? '...' : 'Request'}
        </button>
      )}
      <div className="job-bottom">
        <div className="job-time">
          <ClockIcon height="15px" />
          <small>{readableDate}</small>
        </div>
      </div>
    </div>
  )
}

export default PostCard
