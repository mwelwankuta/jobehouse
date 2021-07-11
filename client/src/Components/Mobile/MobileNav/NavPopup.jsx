import React from 'react'
import ReactModal from 'react-modal'
import { Link } from 'react-router-dom'
import { XIcon } from '@heroicons/react/outline'
import {
  CogIcon,
  UserIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid'

import './NavPopup.css'

function NavPopup({ isOpen, setModalIsOpen }) {
  const closeModal = () => {
    setModalIsOpen(false)
  }
  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={closeModal}
      className="nav-popup-holder"
    >
      <div className="nav-popup">
        <button onClick={closeModal}>
          <XIcon height="20px" className="close-btn" />
        </button>
        <div className="popup-content">
          <Link className="popup-item" to="/profile" onClick={closeModal}>
            <UserIcon height="24px" />
            <p>Profile</p>
          </Link>
          <a href="https://github.com/mwelwankuta/jobehouse/issues" className="popup-item">
            <InformationCircleIcon height="24px" />
            <p>Report A Bug</p>
          </a>
          <Link className="popup-item" to="/settings" onClick={closeModal}>
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
    </ReactModal>
  )
}

export default NavPopup
