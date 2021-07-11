import React from 'react'
import '../../Styles/Components/Loaders/JobCardLoader.css'

function JobCardLoader() {
  return (
    <div className="job-card-loader">
      <div className="title"></div>
      <div className="description"></div>
      <div className="flex">
        <div className="status"></div>
        <div className="button"></div>
      </div>
      <div className="time"></div>
    </div>
  )
}

export default JobCardLoader
