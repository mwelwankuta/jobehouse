import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import ReactModal from 'react-modal'
import FacebookAuth from 'react-facebook-auth'

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
    localStorage.setItem('client', JSON.stringify(data.authenticateUser))
    window.location.reload()
    setModalIsOpen(false)
  } else if (error) {
    alert('an error occured...')
    // window.location = '/error'
  }


  const MyFacebookButton = ({ onClick }) => (
    <button className="auth-login-btn" onClick={onClick}>
      {loading ? '...' : 'Login with facebook'}
    </button>
  )

  const authenticate = (response) => {
    setLoading(true)

    if (response && !response.status) {
      authenticateUser({
        variables: {
          name: response.name,
          fbID: response.id,
          email: response.email ? response.email : '',
          picture: response.picture.data.url,
        }
      })

    } else {
      window.location = '/error'
    }
  }

  return (
    <ReactModal isOpen={modalIsOpen} className="react-modal">
      <div className="modal-child">
        <img src={logo} alt="jobe house logo" />
        <div
          className="auth-parent"
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
