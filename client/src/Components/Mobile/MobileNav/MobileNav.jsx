import React, { useState, Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import NavPopup from './NavPopup'

import { PostModalContext } from '../../../Contexts/ModalViewContext/postModalContext'
import { UpcomingModalContext } from '../../../Contexts/ModalViewContext/upcomingModalContext'
import './MobileNav.css'

function MobileNav({ user }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { postModalIsOpen } = useContext(PostModalContext)
  const { upcomingModalIsOpen } = useContext(UpcomingModalContext)

  if (postModalIsOpen === true || upcomingModalIsOpen === true) {
    return <nav></nav>
  }

  return (
    <nav className="mobile-nav">
      <Link to="/">
        <h2 className="jobe-house-log">JobeHouse</h2>
      </Link>
      <Fragment>
        {user.fbID && (
          <div className="image-holder" onClick={() => setModalIsOpen(true)}>
            <img src={user.fbID && user.picture} alt="profile" loading="eager" />
          </div>)}
      </Fragment>
      <NavPopup isOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </nav>
  )
}

export default MobileNav
