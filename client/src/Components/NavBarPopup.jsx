import React from 'react'
import { Link } from 'react-router-dom'
import {
  CogIcon,
  InformationCircleIcon,
  UserIcon,
} from '@heroicons/react/solid'
import '../Styles/Components/NavBarPopup.css'

function NavBarPopup() {
  return (
    <div className="navbar-popup">
      <div className="popup-content">
        <Link className="popup-item" to="/profile">
          <UserIcon height="24px" />
          <p>Profile</p>
        </Link>
        <a href="https://github.com/mwelwankuta" className="popup-item">
          <InformationCircleIcon height="24px" />
          <p>Report A Bug</p>
        </a>
        <Link className="popup-item" to="/settings">
          <CogIcon height="24px" />
          <p>Settings</p>
        </Link>
      </div>
      <button
        onClick={() => {
          sessionStorage.removeItem('client')
          window.location.reload()
        }}
        className="logout-btn"
      >
        <p>Log out</p>
      </button>
    </div>
  )
}

export default NavBarPopup
