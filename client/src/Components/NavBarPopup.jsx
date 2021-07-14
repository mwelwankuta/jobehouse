import React from 'react'
import { Link } from 'react-router-dom'
import {
  CogIcon,
  InformationCircleIcon,
  UserIcon,
} from '@heroicons/react/solid'
import '../Styles/Components/NavBarPopup.css'

function NavBarPopup({ setPopupIsOpen }) {
  const closePopup = () => {
    setTimeout(() => {
      setPopupIsOpen(false)
      
    }, 800)
  }
  return (
    <div className="navbar-popup" 
      onMouseLeave={() => closePopup()}
      onMouseOver={() => setPopupIsOpen(true)}
    >
      <div className="popup-content">
        <Link className="popup-item" to="/profile" onClick={() => setPopupIsOpen(false)}>
          <UserIcon height="24px" />
          <p>Profile</p>
        </Link>
        <a href="https://github.com/mwelwankuta/jobehouse/issues" className="popup-item" onClick={() => setPopupIsOpen(false)}>
          <InformationCircleIcon height="24px" />
          <p>Report A Bug</p>
        </a>
        <Link className="popup-item" to="/settings" onClick={() => setPopupIsOpen(false)}>
          <CogIcon height="24px" />
          <p>Settings</p>
        </Link>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem('client')
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
