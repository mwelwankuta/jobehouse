import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ClockIcon } from '@heroicons/react/solid'
import { ReplyIcon } from '@heroicons/react/outline'
import moment from 'moment'
import axios from 'axios'
import TimeStampToDate from 'timestamp-to-date'

import { PostsContext } from '../Contexts/viewContext'

import '../Styles/Components/JobCard.css'

function PostCard({ id, title, description, status, date, user, requests }) {
  const [posts, ] = useContext(PostsContext)
  const [haveIRequested, setHaveIRequested] = useState(false)
  
  const joblink = `/job/${id}`
  const dateFromTimeStamp = TimeStampToDate(date, 'yyyy-MM-dd HH:mm:ss')
  const readableDate = moment(dateFromTimeStamp).fromNow()

    useEffect(() => {
      if(requests){
        if(requests.length > 0){
          if(requests.filter(request => request.fbID === user.fbID)[0].fbID){
              setHaveIRequested(true)
          }
        }
        else{
          setHaveIRequested(false)
        }
    }
    },[haveIRequested, requests, user.fbID, posts])

  const workRequest = () => {
    axios
      .post('http://localhost:7000/requestwork', {
        jobId: id,
        userId: user.fbID,
        userName: user.name,
      })
      .then((res) => {
        console.log(res)
      })
  }

  const addRequest = () => {
    //
    setHaveIRequested(true)
    workRequest()
  }

  const removeRequest = () => {
    //
    setHaveIRequested(false)
    workRequest()
  }

  return (
    <div className="job-card-holder">
      <Link to={joblink}>
        <div className="job-header">
          <p className="job-title">{title}</p>
          <div className="job-time">
            <ClockIcon height="20px" />
            <small>{readableDate}</small>
          </div>
        </div>
        <p className="job-description">{description}</p>
        <div className="job-bottom">
          <small
            style={{
              color:
                status === 'Taken' ? 'rgb(209, 22, 22)' : 'rgb(22, 209, 78)',
            }}
          >
            {status}
          </small>
        </div>
      </Link>

      {status === 'Available'  && haveIRequested === true && (
        <button onClick={() => removeRequest()} className="cancle-request-btn">
          <ReplyIcon height="15px" />
          Cancle
        </button>
      )}


      {status === 'Available' && haveIRequested === false && (
        <button onClick={() => addRequest()}>
          <ReplyIcon height="15px" />
          Request
        </button>
      )}
    </div>
  )
}

export default PostCard
