import React, { useContext } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import UpcomingJobCard from '../Components/UpcomingJobCard'
import './../Styles/Pages/Upcoming.css'

import { ModalViewContext } from '../Contexts/ModalViewContext/modalViewContext'
import { UpcomingModalContext } from '../Contexts/ModalViewContext/upcomingModalContext'
import { UpcomingContext } from '../Contexts/PostsContext/upcomingContext'

function Upcoming() {
  const { upcomings } = useContext(UpcomingContext)
  const { setUpcomingModalIsOpen } = useContext(UpcomingModalContext)
  const { setModalView } = useContext(ModalViewContext)


  return (
    <div className="upcoming-holder">
      <div className="page-header">
        <h2 className="page-title">Upcoming Jobs</h2>
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
        {upcomings &&
          upcomings.map((job) => (
            <UpcomingJobCard key={job._id} data={job} />
          ))
        }
        {upcomings && (
          <small style={{ textAlign: 'center' }}>
            There are no upcoming jobs at the moment, consider adding one
          </small>
        )}
      </div>
    </div>
  )
}

export default Upcoming
