import React from 'react'
import { Link } from 'react-router-dom'
import { ClockIcon } from '@heroicons/react/solid'
import { ReplyIcon } from '@heroicons/react/outline'
import moment from 'moment'
import TimeStampToDate from 'timestamp-to-date'

import '../Styles/Components/JobCard.css'
import axios from 'axios'

function PostCard({ id, title, description, status, date, user, requests }) {
  const joblink = `/job/${id}`
  const dateFromTimeStamp = TimeStampToDate(date, 'yyyy-MM-dd')

  const readableDate = moment(dateFromTimeStamp).fromNow()

  const addRequest = () => {
    axios
      .post('http://localhost:7000/requestwork', {
        jobId: id,
        userId: user.id,
        userName: user.name,
      })
      .then((res) => {
        console.log(res)
      })
  }

  const cancleRequest = () => {
    axios
      .post('http://localhost:7000/unrequestwork', {
        jobId: id,
        userId: user.id,
        userName: user.name,
      })
      .then((res) => {
        console.log(res)
      })
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
      {requests.filter((worker) => worker.userId === user.fbID) > 0 &&
        status === 'Available' && (
          <button onClick={() => cancleRequest}>
            <ReplyIcon height="15px" />
            Cancle
          </button>
        )}

      {status === 'Available' && (
        <button onClick={() => addRequest}>
          <ReplyIcon height="15px" />
          Request
        </button>
      )}
    </div>
  )
}

export default PostCard
