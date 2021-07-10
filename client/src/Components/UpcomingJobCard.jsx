import moment from 'moment'
import React from 'react'

import '../Styles/Components/UpcomingJobCard.css'

function UpcomingJobCard({ data }) {
  return (
    <div className="upcoming-card-holder">
      <p className="upcoming-time">
        {moment(data.time).fromNow()} {data.date}
      </p>
      <p className="upcoming-title">{data.title}</p>
    </div>
  )
}

export default UpcomingJobCard
