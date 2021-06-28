import React, { useContext, useEffect, useState } from 'react'
import { PhoneViewContext, UserContext } from '../Contexts/viewContext'
import axios from 'axios'

import '../Styles/Pages/Profile.css'

function Profile() {
  const [user] = useContext(UserContext)
  const phoneView = useContext(PhoneViewContext)

  const [logoutButtonText, setLogoutButtonText] = useState('Logout')
  const [editprofileTextButton, setEditProfileTextButton] = useState(
    'Edit Profile',
  )
  const [bio, setBio] = useState('')
  const [logoutCounter, setLogoutCounter] = useState(0)
  const [editBio, setEditBio] = useState(false) // is user editing the bio ?

  const [loading, setLoading] = useState(false)
  //create edit bio route

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

  const changeBio = (e) => {
    if (bio.length === 0) {
      setEditBio(false)
    } else {
      axios
        .post('https://jobe-house.herokuapp.com/editbio', {
          fbId: user.fbID,
          bio: bio,
        })
        .then((res) => {
          if (res) {
            sessionStorage.setItem('client', JSON.stringify([res.data[0]]))
            setEditBio(false)
            setLoading(false)
          }
        })
    }
  }

  return (
    <div className="profile-holder">
      <img src={user.picture} alt="profile" />
      <p className="username-text">{user.name}</p>
      <div className="votes-holder">
        <p>
          <b>{user.upvotes && user.upvotes.length}</b> upvotes
        </p>
        <p>
          <b>{user.downvotes && user.downvotes.length}</b> downvotes
        </p>
      </div>
      <small className="bio-text">
        {loading ? '...' : user && user.bio ? user.bio : ''}{' '}
      </small>
      {editBio && (
        <textarea onChange={(e) => setBio(e.target.value)} autoFocus />
      )}
      {editBio === false && (
        <button
          onClick={() => {
            setEditBio(!editBio)
          }}
          className="bio-btn"
        >
          Edit Bio
        </button>
      )}

      {editBio === true && (
        <button
          onClick={() => {
            changeBio()
            if (bio.length > 0) {
              setLoading(true)
            }
          }}
          className="bio-btn"
        >
          Done
        </button>
      )}
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
