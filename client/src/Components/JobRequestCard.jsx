import React, { useState } from 'react'
import TimeStampToDate from 'timestamp-to-date'
import '../Styles/Components/JobRequestCard.css'
import moment from 'moment'
import { ArrowDownIcon, ArrowUpIcon, UsersIcon } from '@heroicons/react/outline'

function JobRequestCard(props) {
  const { title, date, requests } = props.data

  const [showRequestsList, setShowRequetsList] = useState(false)

  const readableDate = TimeStampToDate(date, 'yyyy-MM-dd HH:mm')
  const time = TimeStampToDate(date, 'HH:mm')

  return (
    <div
      className="request-card-holder"
      onClick={() => setShowRequetsList(!showRequestsList)}
    >
      <div className="request-header">
        <div className="drop-down-holder">
          <p className="request-title">{title}</p>
          <div className="arrow-down-icon-holder">
            <button onClick={() => setShowRequetsList(!showRequestsList)}>
              {showRequestsList && <ArrowUpIcon height="15px" />}
              {!showRequestsList && <ArrowDownIcon height="15px" />}
            </button>
          </div>
        </div>
        <small className="request-time">
          <span>added {moment(readableDate).fromNow()}</span>{' '}
          <span>{time}</span>
        </small>
      </div>
      {showRequestsList && (
        <ul className="requests-list">
          {requests.map((request) => (
            <li key={request.fbID}>
              <div className="user-profile">
                <img
                  src="https://i1.sndcdn.com/avatars-rhWoQsoMEmGdNU32-Qq1oYg-t500x500.jpg"
                  alt="worker profile"
                />
                <p>{request.name}</p>
              </div>
              <button
                onClick={() =>
                  alert(`are you sure you want to admit ${request.name}`)
                }
              >
                Admit
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="workers-counter">
        <UsersIcon height="18px" style={{ color: '#5d7290' }} />
        <small>{requests.length}</small>
      </div>
    </div>
  )
}

export default JobRequestCard
