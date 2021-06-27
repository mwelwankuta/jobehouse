import React, { useContext } from 'react'
import './../Styles/Pages/Upcoming.css'
import { jobRequestContext } from '../Contexts/viewContext'
import CreateUpcomingModal from '../Components/CreateUpcomingModal'
import JobRequestCard from '../Components/JobRequestCard'

function Requests() {
  const [jobRequests, ] = useContext(jobRequestContext)

  return (
    <div className="upcoming-holder">
      <div className="page-header">
        <h1 className="page-title">Requests</h1>
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
