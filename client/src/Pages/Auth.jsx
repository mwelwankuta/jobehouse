import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import ReactModal from 'react-modal'
import FacebookAuth from 'react-facebook-auth'
import axios from 'axios'

import logo from '../Resources/icon-with-text.svg'

import '../Styles/Pages/Auth.css'
import { useMutation } from '@apollo/client'
import { AUTHENTICATE_USER } from '../Graphql/Mutations'

ReactModal.setAppElement(document.getElementById('root'))

function Auth() {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const phoneView = useMediaQuery({
    query: '(max-width: 800px)',
  })

  const desktopView = useMediaQuery({
    query: '(min-width: 800px)',
  })

  const [authenticateUser, { data, error }] = useMutation(AUTHENTICATE_USER)


  if (data) {
    console.log(data)
    // sessionStorage.setItem('client', JSON.stringify(serverResponse))
    setModalIsOpen(false)
    window.location.reload()
  } else if (error) {
    window.location = '/error'
  }


  const MyFacebookButton = ({ onClick }) => (
    <button className="auth-login-btn" onClick={onClick}>
      {loading ? '...' : 'Login with facebook'}
    </button>
  )

  const authenticate = (response) => {
    setLoading(true)

    if (response && !response.status) {
      const user = {
        name: response.name,
        fbID: response.id,
        email: response.email ? response.email : '',
        picture: response.picture.data.url,
      }

      authenticateUser({ variables: user })

    } else {
      window.location = '/error'
    }
  }

  return (
    <ReactModal isOpen={modalIsOpen} className="react-modal">
      <div className="modal-child">
        <img src={logo} alt="house logo" />
        <div
          className="buttons"
          style={{ backgroundColor: phoneView ? '' : '#f2f2f2' }}
        >
          {desktopView && <h2 className="page-title">Welcome to JobeHouse</h2>}
          <p>
            by using JobeHouse you accept to our{' '}
            <a href="/privacy">Terms of use</a>
          </p>
          <div className="auth-holder">
            <FacebookAuth
              appId="1782110335329820"
              callback={authenticate}
              component={MyFacebookButton}
            />
          </div>
        </div>
      </div>
    </ReactModal>
  )
}

export default Auth
