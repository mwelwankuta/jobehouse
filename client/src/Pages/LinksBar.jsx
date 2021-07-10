import React, { useContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import { HomeIcon, CalendarIcon, BellIcon } from '@heroicons/react/solid'
import { Link, useLocation } from 'react-router-dom'

import { JobRequestContext } from '../Contexts/RequestsContext/jobRequestContext'
import { UpcomingContext } from '../Contexts/PostsContext/upcomingContext'

import '../Styles/Components/LinksBar.css'

function LinksBar() {
  const { jobRequests } = useContext(JobRequestContext)
  const { upcomingJobs } = useContext(UpcomingContext)
  const router = useLocation()

  const hideLabels = useMediaQuery({
    query: '(min-width:950px)',
  })

  const linksdata = [
    {
      icon: <HomeIcon height="35px" color="#fd4d4d" />,
      label: 'Home', path: '/'
    },
    {
      icon: (
        <div className="requests-holder">
          <CalendarIcon height="35px" color="#fd4d4d" />
          {upcomingJobs &&
            upcomingJobs[0].length > 0 && (
              <p className="notifications-counter">
                {upcomingJobs && upcomingJobs[0].length}
                {upcomingJobs[0].length > 9 && '+'}
              </p>
            )
          }
        </div>
      ),
      label: 'Scheduled',
      path: '/upcoming',
    },
    {
      icon: (
        <div className="requests-holder">
          <BellIcon height="35px" color="#fd4d4d" />
          {jobRequests[0] &&
            jobRequests[0].length > 0 && (
              <p className="notifications-counter">
                {jobRequests && jobRequests[0].length}
                {jobRequests[0].length > 9 && '+'}
              </p>
            )
          }
        </div>
      ),
      label: 'Requests',
      path: '/requests',
    },
  ]

  return (
    <div className="links-bar">
      <ul>
        {linksdata.map((linkdata, index) => (
          <li key={index}>
            <Link
              to={linkdata.path}
              style={{
                backgroundColor: router.pathname === linkdata.path && hideLabels && '#fd4d4d2d',
              }}>
              {linkdata.icon}
              {hideLabels && <p>{linkdata.label}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LinksBar
