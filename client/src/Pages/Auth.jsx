import React, { useContext, useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import FacebookAuth from 'react-facebook-auth'

import '../Styles/Pages/Auth.css'
import { DesktopViewContext, PhoneViewContext } from '../Contexts/viewContext'

ReactModal.setAppElement(document.getElementById('root'))

function Auth() {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const phoneView = useContext(PhoneViewContext)
  const desktopView = useContext(DesktopViewContext)

  useEffect(() => {
    console.log(JSON.parse(sessionStorage.getItem('client')))
  }, [])

  const MyFacebookButton = ({ onClick }) => (
    <button className="login-btn" onClick={onClick}>
      Login with facebook
    </button>
  )

  const authenticate = (response) => {
    const user = {
      name: response.name,
      fbID: response.id,
      email: response.email ? response.email : '',
      picture: response.picture.data.url,
    }

    if (!response.status) {
      sessionStorage.setItem('client', JSON.stringify(user))
      setModalIsOpen(false)
      window.location.reload()
    } else {
      window.location = '/error'
    }
  }

  return (
    <ReactModal isOpen={modalIsOpen} className="react-modal">
      <div className="modal-child">
        <h1>JobeHouse</h1>
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
