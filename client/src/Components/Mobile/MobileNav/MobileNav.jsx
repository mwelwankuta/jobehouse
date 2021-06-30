import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import NavPopup from './NavPopup'

import './MobileNav.css'

function MobileNav({ user }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <nav className="mobile-nav">
      <Link to="/">
        <h2 className="jobe-house-log">JobeHouse</h2>
      </Link>

      <Fragment>
        {user && (
          <div className="image-holder" onClick={() => setModalIsOpen(true)}>
            <img src={user && user.picture} alt="profile" loading="eager" />
          </div>
        )}
      </Fragment>
      <NavPopup isOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </nav>
  )
}

export default MobileNav
