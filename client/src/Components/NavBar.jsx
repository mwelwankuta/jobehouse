import React, { Fragment, useContext } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { useHistory, Link } from 'react-router-dom'
import { DesktopViewContext, PhoneViewContext } from '../Contexts/viewContext'
import MobileNav from './Mobile/MobileNav/MobileNav'

import logo from '../Resources/icon-only.png'
import '../Styles/Components/NavBar.css'

function NavBar({ user, session, modalView }) {
  const phoneView = useContext(PhoneViewContext)
  const desktopView = useContext(DesktopViewContext)

  const router = useHistory()

  return (
    <Fragment>
      {modalView === false && desktopView && (
        <nav>
          <Link to="/">
            <img src={logo} alt="logo" className="job-house-logo-icon" />
            <h2 className="jobe-house-logo">JobeHouse</h2>
          </Link>

          <div className="select-container">
            <div className="nav-select-holder">
              <SearchIcon height="20px" />
              <select>
                <option value="">Search by category</option>
                <option value="">Engineering</option>
                <option value="">Electronics</option>
                <option value="">Computers</option>
              </select>
            </div>

            {session && (
              <div
                onClick={() => router.push('/profile')}
                className="image-holder"
              >
                <img src={user.picture} alt="profile" />
              </div>
            )}

            {!session && (
              <a href="/login" className="login-link">
                Login
              </a>
            )}
          </div>
        </nav>
      )}

      {modalView === false && phoneView && (
        <MobileNav session={session} user={user} />
      )}
    </Fragment>
  )
}

export default NavBar
