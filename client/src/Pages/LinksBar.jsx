import React, { useContext } from 'react'
import {
  HomeIcon,
  CalendarIcon,
  UserIcon,
  BellIcon,
} from '@heroicons/react/solid'
import { Link, useLocation } from 'react-router-dom'
import { jobRequestContext, UpcomingContext } from '../Contexts/viewContext'

import '../Styles/Components/LinksBar.css'

function LinksBar() {
  const jobRequests = useContext(jobRequestContext)
  const upcomingJobs = useContext(UpcomingContext)
  const router = useLocation()
  const linksdata = [
    { icon: <HomeIcon height="35px" />, label: 'Home', path: '/' },
    {
      icon: 
      <div className="requests-holder">
        <CalendarIcon height="35px" />
        {upcomingJobs[0].length > 0 && 
          <p className="notifications-counter">
            {upcomingJobs && upcomingJobs[0].length}
            {upcomingJobs[0].length > 9 && '+'}
          </p>
        }
      </div>,
      label: 'Scheduled',
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
          {jobRequests[0].length > 0 && 
          <p className="notifications-counter">
            {jobRequests && jobRequests[0].length}
            {jobRequests[0].length > 9 && '+'}
          </p>}
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
                  fontWeight: router.pathname === linkdata.path && '700',
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
