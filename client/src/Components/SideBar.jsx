import React, { useContext } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import { useHistory } from 'react-router'

import UpcomingJobCard from '../Components/UpcomingJobCard'

import '../Styles/Components/SideBar.css'
import {
  ModalViewContext,
  UpcomingContext,
  UpcomingModalContext,
} from '../Contexts/viewContext'
import CreateUpcomingModal from './CreateUpcomingModal'

function SideBar({ user }) {
  const [, setUpcomingModalIsOpen] = useContext(UpcomingModalContext)
  const [, setModalView] = useContext(ModalViewContext)
  const [upcomings] = useContext(UpcomingContext)

  // const upvotes = user.upvotes
  // const downvotes = user.downvotes

  const router = useHistory()

  return (
    <div className="side-bar">
      <div className="profile-card">
        <div className="profile-stats-holder">
          <div onClick={() => router.push('/profile')} className="image-holder">
            <img src={user && user.picture} alt="profile" />
          </div>
          <div className="profile-name-stats">
            <div className="user-name-holder">
              <p className="username-text">{user.name}</p>
              <small>#{user.fbID}</small>
            </div>
            {/* <div className="recommendations-holder">
              <div id="votes" className="upvotes-holder">
                <span>{upvotes && upvotes.length}</span>
                <p>Up votes</p>
              </div>
              <div id="votes" className="downvotes-holder">
                <span>{downvotes && downvotes.length}</span>
                <p>Down votes</p>
              </div>
            </div> */}
          </div>
        </div>
        <p className="bio-text">{user.bio}</p>
      </div>
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
        <div className="upcoming-jobs-list-holder">
          <div className="upcoming-jobs-list">
            {upcomings.slice(0, 3).map((job) => (
              <UpcomingJobCard key={job} data={job} />
            ))}
            <button onClick={() => router.push('/upcoming')}>See more</button>
          </div>
        </div>
      </div>
      <CreateUpcomingModal />
    </div>
  )
}

export default SideBar
