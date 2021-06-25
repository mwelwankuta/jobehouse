import React, { useContext } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import UpcomingJobCard from '../Components/UpcomingJobCard'
import './../Styles/Pages/Upcoming.css'
import {
  ModalViewContext,
  UpcomingContext,
  UpcomingModalContext,
} from '../Contexts/viewContext'
import CreateUpcomingModal from '../Components/CreateUpcomingModal'

function Upcoming() {
  const [upcomings] = useContext(UpcomingContext)
  const [, setUpcomingModalIsOpen] = useContext(UpcomingModalContext)
  const [, setModalView] = useContext(ModalViewContext)
  return (
    <div className="upcoming-holder">
      <div className="page-header">
        <h1 className="page-title">Upcoming Jobs</h1>
        <button
          onClick={() => {
            setUpcomingModalIsOpen(true)
            setModalView(true)
          }}
          className="add-upcoming-btn"
        >
          <PlusIcon height="24px" />
        </button>
      </div>
      <div className="upcoming-jobs-list">
        {upcomings.map((job) => (
          <UpcomingJobCard key={job} data={job} />
        ))}
        {upcomings.length === 0 && (
          <small style={{ textAlign: 'center' }}>
            There are no upcoming jobs at the moment, consider adding one
          </small>
        )}
      </div>
      <CreateUpcomingModal />
    </div>
  )
}

export default Upcoming
