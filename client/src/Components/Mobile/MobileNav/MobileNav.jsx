import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import './MobileNav.css'

function MobileNav({ session, user }) {
  const router = useHistory()
  return (
    <nav>
      <a href="/">
        <h2 className="jobe-house-log">JobeHouse</h2>
      </a>
      <div>
        {session && (
          <div className="image-holder" onClick={() => router.push('/profile')}>
            <img src={user.picture} alt="profile" />
          </div>
        )}

        {!session && (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default MobileNav
