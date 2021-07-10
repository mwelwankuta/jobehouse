import React, { useContext } from 'react'
import { CalendarIcon, BellIcon, SearchIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import MobileNavBarIcon from '../../../Resources/mobile/MobileNavBarIcon'

import './MainBottomNav.css'
import { UpcomingContext } from '../../../Contexts/PostsContext/upcomingContext'
import { JobRequestContext } from '../../../Contexts/RequestsContext/jobRequestContext'

function MobileBottomNav() {
  const { jobRequests } = useContext(JobRequestContext)
  const { upcomings } = useContext(UpcomingContext)
  return (
    <div className="bottom-nav-holder">
      <ul className="bottom-nav">
        {/* Home Icon */}
        <li>
          <Link to="/">
            <MobileNavBarIcon height="22px" />
          </Link>
        </li>
        <li>
          <Link to="/search">
            <SearchIcon height="25px" />
          </Link>
        </li>

        {/* Upcoming Jobs Icon */}
        <li>
          <Link to="/upcoming">
            <CalendarIcon height="28px" />
            {upcomings && (
              <p className="notifications-counter">
                {upcomings && upcomings.length}
                {upcomings.length > 9 && '+'}
              </p>
            )}
          </Link>
        </li>
        {/* Profile Icon */}

        {/* Job Requets Icon */}
        <li style={{ marginBottom: '-5px' }}>
          <Link to="/requests">
            <BellIcon height="28px" />
            {jobRequests.length > 0 && (
              <p className="notifications-counter">
                {jobRequests && jobRequests.length}
                {jobRequests.length > 9 && '+'}
              </p>
            )}
          </Link>
        </li>
        {/* Search Icon */}
      </ul>
    </div>
  )
}

export default MobileBottomNav
