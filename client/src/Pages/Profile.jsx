import React, { useContext, useEffect, useState } from 'react'
import { PhoneViewContext, UserContext } from '../Contexts/viewContext'

import '../Styles/Pages/Profile.css'

function Profile() {
  const user = useContext(UserContext)
  const phoneView = useContext(PhoneViewContext)

  const [bioText] = useState('I love cake')
  const [logoutButtonText, setLogoutButtonText] = useState('Logout')
  const [editprofileTextButton, setEditProfileTextButton] = useState(
    'Edit Profile',
  )
  const [, setBio] = useState('')
  const [counter] = useState(0)
  const [logoutCounter, setLogoutCounter] = useState(0)
  const [editBio, setEditBio] = useState(false)

  useEffect(() => {
    if (logoutCounter === 1) {
      setLogoutButtonText('Yes')
      setEditProfileTextButton('No')
    }
    if (logoutCounter === 2) {
      setLogoutButtonText('Logout')
      sessionStorage.removeItem('client')
      window.location = '/'
    }
    if (logoutCounter === 0) {
      setLogoutButtonText('Logout')
      setEditProfileTextButton('Edit Profile')
    }
  }, [logoutCounter])

  return (
    <div className="profile-holder">
      <img src={user.picture} alt="profile" />
      <p className="username-text">{user.name}</p>
      <div className="votes-holder">
        <p>
          <b>25</b> Upvotes
        </p>
        <p>
          <b>25</b> Downvotes
        </p>
      </div>
      {counter === 0 || counter !== 1 ? (
        <small className="bio-text">{bioText} </small>
      ) : (
        ''
      )}
      {editBio && (
        <textarea onChange={(e) => setBio(e.target.value)} autoFocus />
      )}
      <button
        type="submit"
        onClick={() => {
          setEditBio(!editBio)
        }}
        className="bio-btn"
      >
        {editBio ? 'Done' : 'Edit Bio'}
      </button>
      {logoutCounter === 1 && (
        <small className="logout-confirmation-text">
          Are you sure you want to logout
        </small>
      )}
      {phoneView && (
        <div className="buttons-holder">
          <button
            onClick={() => setLogoutCounter(logoutCounter + 1)}
            className="logout-btn"
          >
            {logoutButtonText}
          </button>

          {logoutCounter === 1 && (
            <button
              onClick={() => logoutCounter === 1 && setLogoutCounter(0)}
              className="nologout-btn"
            >
              {editprofileTextButton}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Profile
