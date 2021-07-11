import moment from 'moment'
import React from 'react'

import '../Styles/Components/UpcomingJobCard.css'

function UpcomingJobCard({ data }) {
  return (
    <div className="upcoming-card-holder">
      <div className="upcoming-time">
        <p>{moment(data.time).fromNow()}</p>
        <p>{data.date}</p>
      </div>
      <p className="upcoming-title">{data.title}</p>
    </div>
  )
}

export default UpcomingJobCard
