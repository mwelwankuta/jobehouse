import React, { useContext } from 'react'
import UpcomingJobCard from '../Components/UpcomingJobCard'
import './../Styles/Pages/Upcoming.css'
import { jobRequestContext } from '../Contexts/viewContext'
import CreateUpcomingModal from '../Components/CreateUpcomingModal'

function Requests() {
  const [jobRequests] = useContext(jobRequestContext)

  return (
    <div className="upcoming-holder">
      <div className="page-header">
        <h1 className="page-title">Requests</h1>
      </div>
      <div className="upcoming-jobs-list">
        {jobRequests.map((job) => (
          <UpcomingJobCard key={job} data={job} />
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
