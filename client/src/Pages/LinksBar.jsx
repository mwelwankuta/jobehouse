import React from 'react'
import {
  HomeIcon,
  CalendarIcon,
  UserIcon,
  BellIcon,
} from '@heroicons/react/solid'
import { Link, useLocation } from 'react-router-dom'

import '../Styles/Components/LinksBar.css'

function LinksBar() {
  const router = useLocation()
  const linksdata = [
    { icon: <HomeIcon height="35px" />, label: 'Home', path: '/' },
    {
      icon: <CalendarIcon height="35px" />,
      label: 'Scheduled Jobs',
      path: '/upcoming',
    },
    {
      icon: <UserIcon height="35px" />,
      label: 'Profile',
      path: '/profile',
    },
    {
      icon: (
        <div className="requests-holder">
          <BellIcon height="35px" />
          <p className="notifications-counter">9+</p>
        </div>
      ),
      label: 'Requests',
      path: '/requests',
    },
  ]

  return (
    <div className="links-bar">
      <ul>
        {linksdata.map((linkdata, i) => (
          <li key={i}>
            <Link to={linkdata.path}>
              {linkdata.icon}
              <p
                style={{
                  fontWeight: router.pathname === linkdata.path && '600',
                }}
              >
                {linkdata.label}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LinksBar
