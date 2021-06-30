import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import './MobileNav.css'

function MobileNav({ session, user }) {
  const router = useHistory()
  return (
    <nav>
      <Link to="/">
        <h2 className="jobe-house-log">JobeHouse</h2>
      </Link>

      {/* User Profile Picture */}
      <div>
        {session && (
          <div className="image-holder" onClick={() => router.push('/profile')}>
            <img src={user.picture} alt="profile" loading="eager" />
          </div>
        )}
      </div>
    </nav>
  )
}

export default MobileNav
