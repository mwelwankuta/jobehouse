import React, { useContext, useState } from 'react'
import { UserContext } from '../Contexts/viewContext'
import axios from 'axios'

import '../Styles/Pages/Profile.css'

function Profile() {
  const [user] = useContext(UserContext)

  const [bio, setBio] = useState('')
  const [editBio, setEditBio] = useState(false)
  const [loading, setLoading] = useState(false)

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
      <img src={user && user.picture} alt="profile" loading="eager" />
      <p className="username-text">{user && user.name}</p>
      <div className="votes-holder">
        <p>
          <b>{user && user.upvotes && user.upvotes.length}</b> upvotes
        </p>
        <p>
          <b>{user && user.downvotes && user.downvotes.length}</b> downvotes
        </p>
      </div>
      <small className="bio-text">
        {user && user && user.bio ? user.bio : ''}
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
          {loading ? '...' : 'Done'}
        </button>
      )}
    </div>
  )
}

export default Profile
