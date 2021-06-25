import React from 'react'
import { Link } from 'react-router-dom'
import { ClockIcon } from '@heroicons/react/solid'
import '../Styles/Components/JobCard.css'
import { ReplyIcon } from '@heroicons/react/outline'

function PostCard({ id, title, description, status }) {
  const joblink = `/job/${id}`
  return (
    <Link to={joblink}>
      <div className="job-card-holder">
        <div className="job-header">
          <p className="job-title">{title}</p>
          <div className="job-time">
            <ClockIcon height="20px" />
            <span>1 minute ago</span>
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
          <button>
            <ReplyIcon height="15px" />
            Request
          </button>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
