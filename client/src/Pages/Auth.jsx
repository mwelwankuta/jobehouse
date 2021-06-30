import React, { useContext, useState } from 'react'
import ReactModal from 'react-modal'
import FacebookAuth from 'react-facebook-auth'
import { DesktopViewContext, PhoneViewContext } from '../Contexts/viewContext'
import axios from 'axios'

import bannerImage from '../Resources/icon-with-text.svg'

import '../Styles/Pages/Auth.css'

ReactModal.setAppElement(document.getElementById('root'))

function Auth() {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const phoneView = useContext(PhoneViewContext)
  const desktopView = useContext(DesktopViewContext)

  const MyFacebookButton = ({ onClick }) => (
    <button className="login-btn" onClick={onClick}>
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

      axios
        .post('https://jobe-house.herokuapp.com/authenticate', user)
        .then((res) => {
          const serverResponse = res.data
          if (serverResponse) {
            sessionStorage.setItem('client', JSON.stringify(serverResponse))
            setModalIsOpen(false)
            window.location.reload()
          }
        })
        .catch((err) => (window.location = '/error'))
    } else {
      window.location = '/error'
    }
  }

  return (
    <ReactModal isOpen={modalIsOpen} className="react-modal">
      <div className="modal-child">
        <img src={bannerImage} alt="doge house logo" />
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
