import React from 'react'
import {
  HomeIcon,
  CalendarIcon,
  UserIcon,
  BellIcon,
} from '@heroicons/react/solid'
import { Link } from 'react-router-dom'

import './MainBottomNav.css'

function MobileBottomNav() {
  return (
    <div className="bottom-nav-holder">
      <ul className="bottom-nav">
        <li>
          <Link to="/">
            <HomeIcon height="35px" />
          </Link>
        </li>
        <li>
          <Link to="/upcoming">
            <CalendarIcon height="35px" />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <UserIcon height="35px" />
          </Link>
        </li>
        <li>
          <Link to="/requests">
            <BellIcon height="35px" />
            <p className="notifications-counter">9+</p>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default MobileBottomNav
