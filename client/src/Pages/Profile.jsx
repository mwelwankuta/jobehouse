import React, { useContext, useState } from 'react'
import { UserContext } from '../Contexts/UserContext/userContext'

import '../Styles/Pages/Profile.css'
import { useMutation } from '@apollo/client'
import { EDIT_BIO } from '../Graphql/Mutations'
import { useEffect } from 'react'

function Profile() {
  const { user, setUser } = useContext(UserContext)

  const [bio, setBio] = useState('')
  const [editTheBio, setEditBio] = useState(false)
  const [loading, setLoading] = useState(false)

  const [editBio, { error, data }] = useMutation(EDIT_BIO)
  const sessionUser = JSON.parse(sessionStorage.getItem('client'))[0]

  if (error) {
    console.error(error)

  }

  useEffect(() => {
    if (data) {
      console.log(data)

      const newUser = {
        upvotes: sessionUser.upvotes,
        downvotes: sessionUser.downvotes,
        fbID: sessionUser.fbID,
        name: sessionUser.name,
        picture: sessionUser.picture,
        email: sessionUser.email,
        bio: bio,
      }
      sessionStorage.setItem('client', JSON.stringify([newUser]))

      setEditBio(false)
      setLoading(false)
    }
  }, [data])

  const changeBio = () => {
    if (bio.length === 0) {
      setEditBio(false)
    } else {

      const newUser = {
        upvotes:
          sessionUser.upvotes && sessionUser.upvotes.length === 0
            ? []
            : sessionUser.upvotes,
        downvotes:
          sessionUser.downvotes && sessionUser.downvotes.length === 0
            ? []
            : sessionUser.downvotes,
        fbID: sessionUser.fbID,
        name: sessionUser.name,
        picture: sessionUser.picture,
        email: sessionUser.email,
        bio: bio,
      }
      setUser(newUser)
      setLoading(false)

      editBio({
        variables: {
          fbID: user.fbID,
          bio: bio
        }
      })
    }
  }

  return (
    <div className="profile-holder">
      <img src={user.fbID && user.picture} alt="profile" loading="eager" />
      <p className="username-text">{user.fbID && user.name}</p>
      {/* <div className="votes-holder">
        <p>
          <b>{user.fbID && user.upvotes && user.upvotes.length}</b> upvotes
        </p>
        <p>
          <b>{user.fbID && user.downvotes && user.downvotes.length}</b> downvotes
        </p>
      </div> */}
      {!editTheBio && (
        <small className="bio-text">
          {user.fbID && user.fbID && user.bio ? user.bio : ''}
        </small>
      )}
      {editTheBio && (
        <textarea onChange={(e) => setBio(e.target.value)} autoFocus />
      )}
      {editTheBio === false && (

        <button
          onClick={() => {
            setEditBio(!editTheBio)
          }}
          className="bio-btn"
        >
          Edit Bio
        </button>
      )}

      {editTheBio === true && (
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
