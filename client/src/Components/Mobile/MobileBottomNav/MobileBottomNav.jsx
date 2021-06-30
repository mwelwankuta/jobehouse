import React, { useContext } from 'react'
import { CalendarIcon, BellIcon, SearchIcon } from '@heroicons/react/solid'
import storiezIcon from '../../../Resources/mobile/pink-icon.svg'
import { Link } from 'react-router-dom'

import './MainBottomNav.css'
import {
  jobRequestContext,
  UpcomingContext,
} from '../../../Contexts/viewContext'

function MobileBottomNav() {
  const notificationCounter = useContext(jobRequestContext)
  const upcomingCounter = useContext(UpcomingContext)
  return (
    <div className="bottom-nav-holder">
      <ul className="bottom-nav">
        {/* Home Icon */}
        <li>
          <Link to="/">
            <img
              src={storiezIcon}
              height="22px"
              alt="jobehouse icon"
              loading="eager"
            />
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
            {upcomingCounter[0].length > 0 && (
              <p className="notifications-counter">
                {upcomingCounter && upcomingCounter[0].length}
                {upcomingCounter[0].length > 9 && '+'}
              </p>
            )}
          </Link>
        </li>
        {/* Profile Icon */}

        {/* Job Requets Icon */}
        <li style={{ marginBottom: '-5px' }}>
          <Link to="/requests">
            <BellIcon height="28px" />
            {notificationCounter[0].length > 0 && (
              <p className="notifications-counter">
                {notificationCounter && notificationCounter[0].length}
                {notificationCounter[0].length > 9 && '+'}
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
