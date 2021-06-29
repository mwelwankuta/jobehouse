import React, { useContext } from 'react'
import {
  CalendarIcon,
  UserIcon,
  BellIcon,
  SearchIcon,
} from '@heroicons/react/outline'
import storiezIcon from '../../../Resources/mobile/pink-icon.svg'
import { Link } from 'react-router-dom'

import './MainBottomNav.css'
import { jobRequestContext, UpcomingContext } from '../../../Contexts/viewContext'

function MobileBottomNav() {
  const notificationCounter = useContext(jobRequestContext)
  const upcomingCounter = useContext(UpcomingContext)
  return (
    <div className="bottom-nav-holder">
      <ul className="bottom-nav">
        <li>
          <Link to="/">
            <img src={storiezIcon} height="27px" alt="jobehouse icon"/>
          </Link>
        </li>
        <li>
          <Link to="/upcoming">
            <CalendarIcon height="35px" />
            {upcomingCounter[0].length > 0 &&  <p className="notifications-counter">
              {upcomingCounter && upcomingCounter[0].length}
              {upcomingCounter[0].length > 9 && '+'}
            </p>}
          </Link>
        </li>
        
        <li>
          <Link to="/profile">
            <UserIcon height="35px" />
          </Link>
        </li>
        <li>
          <Link to="/requests">
            <BellIcon height="34px" />
            {notificationCounter[0].length > 0 &&  <p className="notifications-counter">
              {notificationCounter && notificationCounter[0].length}
              {notificationCounter[0].length > 9 && '+'}
            </p>}
          </Link>
        </li>
        <li>
          <Link to="/search">
            <SearchIcon height="31px" />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default MobileBottomNav
