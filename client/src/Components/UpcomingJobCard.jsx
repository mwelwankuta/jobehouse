import React from 'react'
import '../Styles/Components/UpcomingJobCard.css'

function UpcomingJobCard(props) {
  console.log(props)
  const { title, date, time } = props.data
  return (
    <div className="upcoming-card-holder">
      <p className="upcoming-time">
        {time} {date}
      </p>
      <p className="upcoming-title">{title}</p>
    </div>
  )
}

export default UpcomingJobCard
