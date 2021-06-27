import React, { useContext, useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import FacebookAuth from 'react-facebook-auth'

import '../Styles/Pages/Auth.css'
import { DesktopViewContext, PhoneViewContext } from '../Contexts/viewContext'
import axios from 'axios'

ReactModal.setAppElement(document.getElementById('root'))

function Auth() {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const phoneView = useContext(PhoneViewContext)
  const desktopView = useContext(DesktopViewContext)

  useEffect(() => {
    console.log(JSON.parse(sessionStorage.getItem('client'))) // without this run auth gets two instances
  }, [])

  const MyFacebookButton = ({ onClick }) => (
    <button className="login-btn" onClick={onClick}>
      Login with facebook
    </button>
  )

  const authenticate = (response) => {
    if (response && !response.status) {
      const user = {
        name: response.name,
        fbID: response.id,
        email: response.email ? response.email : '',
        picture: response.picture.data.url,
      }

      localStorage.setItem('client', JSON.stringify(user))

      axios
        .post('https://jobe-house.herokuapp.com/authenticate', user)
        .then((res) => {
          console.log(res)
          const serverResponse = res.data
          if (serverResponse) {
            if (serverResponse[1]) {
              sessionStorage.setItem(
                'isNewUser',
                JSON.stringify(serverResponse[1].msg),
              )
              if (sessionStorage.getItem('isNewUser')) {
                console.log(serverResponse)
                sessionStorage.setItem(
                  'client',
                  JSON.stringify([serverResponse[0]]), //created user res expected array
                )
                window.location.reload()
                setModalIsOpen(false)
              }
            } else {
              sessionStorage.setItem('client', JSON.stringify(serverResponse))
              window.location.reload()
              setModalIsOpen(false)
            }
          }
        })
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
              // autoLoad={true}
              component={MyFacebookButton}
            />
          </div>
          {/* <p>{loginUser[1].msg ? loginUser[1].msg : ''}</p> */}
        </div>
      </div>
    </ReactModal>
  )
}

export default Auth
