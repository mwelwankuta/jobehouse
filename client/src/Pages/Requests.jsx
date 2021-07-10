import React, { useContext } from 'react'
import './../Styles/Pages/Upcoming.css'
import { JobRequestContext } from '../Contexts/RequestsContext/jobRequestContext'
import CreateUpcomingModal from '../Components/CreateUpcomingModal'
import JobRequestCard from '../Components/JobRequestCard'

function Requests() {
  const { jobRequests } = useContext(JobRequestContext)

  return (
    <div className="upcoming-holder">
      <div className="page-header">
        <h2 className="page-title">Requests</h2>
      </div>
      <div className="upcoming-jobs-list">
        {jobRequests.map((job) => (
          <JobRequestCard key={job._id} data={job} />
        ))}
        {jobRequests.length === 0 && (
          <small style={{ textAlign: 'center' }}>
            You do not have any requests at the moment
          </small>
        )}
      </div>
      <CreateUpcomingModal />
    </div>
  )
}
export default Requests
