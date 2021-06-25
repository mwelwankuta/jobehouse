import React, { useContext, useEffect, useState } from 'react'
import { PhoneViewContext, UserContext } from '../Contexts/viewContext'

import '../Styles/Pages/Profile.css'

function Profile() {
  const user = useContext(UserContext)
  const phoneView = useContext(PhoneViewContext)

  //   const [editBio, setEditBio] = useState(false)
  const [editBioButtonText, setEditBioButtonText] = useState('Edit Bio')
  const [logoutButtonText, setLogoutButtonText] = useState('Logout')
  const [editprofileTextButton, setEditProfileTextButton] = useState(
    'Edit Profile',
  )

  const [bio, setBio] = useState('')
  const [counter, setCounter] = useState(0)
  const [logoutCounter, setLogoutCounter] = useState(0)

  useEffect(() => {
    if (counter === 1) {
      setEditBioButtonText('Done')
    }
    if (counter === 2) {
      setEditBioButtonText('Edit Bio')
    }
    if (counter === 0) {
      setEditBioButtonText('Edit Bio')
    }
  }, [counter])

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
        <small className="bio-text">{bio} </small>
      ) : (
        ''
      )}
      {counter === 1 && (
        <textarea onChange={(e) => setBio(e.target.value)} autoFocus />
      )}
      <button
        type="submit"
        onClick={() => {
          setCounter(counter + 1)
        }}
        className="bio-btn"
      >
        {editBioButtonText}
      </button>
      {phoneView && (
        <div className="buttons-holder">
          <button
            onClick={() => {
              if (logoutCounter === 1) {
                setLogoutCounter(0)
              }
            }}
            className="edit-btn"
          >
            <p>{editprofileTextButton}</p>
          </button>

          <button
            onClick={() => setLogoutCounter(logoutCounter + 1)}
            className="logout-btn"
          >
            {logoutButtonText}
          </button>
        </div>
      )}
      {logoutCounter === 1 && <small>Are you sure you want to logout</small>}
    </div>
  )
}

export default Profile
