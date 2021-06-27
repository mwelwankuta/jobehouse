import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Job from './Pages/Job'
import Settings from './Pages/Settings'
import Privacy from './Pages/Privacy'
import JobDetails from './Pages/JobDetails'
import Upcoming from './Pages/Upcoming'
import Profile from './Pages/Profile'

import NavBar from './Components/NavBar'
import SideBar from './Components/SideBar'
import LinksBar from './Pages/LinksBar'
import MobileBottomNav from './Components/Mobile/MobileBottomNav/MobileBottomNav'

import {
  UserContext,
  SessionContext,
  DesktopViewContext,
  PhoneViewContext,
  ModalViewContext,
  PostModalContext,
  PostsContext,
  UpcomingModalContext,
  UpcomingContext,
  jobRequestContext,
  haveIRequestedContext,
} from './Contexts/viewContext'

import './index.css'
import axios from 'axios'
import Requests from './Pages/Requests'

function App() {
  const [user, setUser] = useState({})
  const [modalView, setModalView] = useState(false)
  const [postModalIsOpen, setPostModalIsOpen] = useState(false)
  const [upcomingModalIsOpen, setUpcomingModalIsOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const [upcomings, setUpcomings] = useState([])
  const [jobRequests, setJobRequests] = useState([])
  const [haveIRequested, setHaveIRequested] = useState(false)

  const phoneView = useMediaQuery({
    query: '(max-device-width: 800px)',
  })

  const desktopView = useMediaQuery({
    query: '(min-device-width: 800px)',
  })

  const session = sessionStorage.getItem('client')

  useEffect(() => {
    if (session) {
      const sessionUser = JSON.parse(sessionStorage.getItem('client'))
      setUser(sessionUser[0])
    }
  }, [session, desktopView, phoneView])

  useEffect(() => {
    if (session) {
      axios
        .get('http://localhost:7000/jobs')
        .then((res) => setPosts(res.data))
    }
  },[posts, session])

  useEffect(() => {
    axios
      .post('http://localhost:7000/requestnotifications',{
        fbId: user.fbID
      })
      .then((res) => {
        setJobRequests(res.data)
      })
  })

  const Terms = () => {
    return <h1>Terms of Service coming Soon...</h1>
  }

  // 404 Page
  const NotFoundPage = () => {
    return (
      <center>
        <p>Hmm...this page doesn’t exist. Try searching for something else.</p>
        <a href="/" className="go-back-link" style={{ color: '#2d9cdb' }}>
          go Home
        </a>
      </center>
    )
  }

  const RequestProblem = () => {
    return (
      <center>
        <p>There was a problem with your request. Try again after some time.</p>
        <a href="/" className="go-back-link" style={{ color: '#2d9cdb' }}>
          go Home
        </a>
      </center>
    )
  }

  return (
    <DesktopViewContext.Provider value={desktopView}>
      <PhoneViewContext.Provider value={phoneView}>
        <UserContext.Provider value={user}>
          <SessionContext.Provider value={session}>
            <ModalViewContext.Provider value={[modalView, setModalView]}>
              <PostModalContext.Provider
                value={[postModalIsOpen, setPostModalIsOpen]}
              >
                <PostsContext.Provider value={[posts, setPosts]}>
                  <UpcomingModalContext.Provider
                    value={[upcomingModalIsOpen, setUpcomingModalIsOpen]}
                  >
                    <UpcomingContext.Provider value={[upcomings, setUpcomings]}>
                      <jobRequestContext.Provider
                        value={[jobRequests, setJobRequests]}
                      >
                        <haveIRequestedContext.Provider value={[haveIRequested, setHaveIRequested]}>
                        <Router>
                          <div className="home-container">
                            {session && (
                              <NavBar
                                user={user}
                                session={session}
                                modalView={modalView}
                              />
                            )}
                            <div className="sections">
                              {desktopView && (
                                <div style={{ position: 'sticky' }}>
                                  {session && <LinksBar />}
                                </div>
                              )}

                              <main className="main-content">
                                <Switch>
                                  {session && (
                                    <Route exact path="/" component={Home} />
                                  )}
                                  {!session && (
                                    <Route exact path="/" component={Auth} />
                                  )}
                                  <Route
                                    exact
                                    path="/settings"
                                    component={Settings}
                                  />
                                  <Route
                                    exact
                                    path="/job/:id"
                                    component={Job}
                                  />
                                  <Route
                                    exact
                                    path="/upcoming"
                                    component={Upcoming}
                                  />
                                  <Route
                                    exact
                                    path="/requests"
                                    component={Requests}
                                  />
                                  <Route
                                    exact
                                    path="/terms"
                                    component={Terms}
                                  />
                                  <Route
                                    exact
                                    path="/privacy"
                                    component={Privacy}
                                  />
                                  <Route
                                    exact
                                    path="/job/:id"
                                    component={JobDetails}
                                  />
                                  <Route
                                    exact
                                    path="/profile"
                                    component={Profile}
                                  />

                                  <Route
                                    exact
                                    path="/error"
                                    component={RequestProblem}
                                  />
                                  <Route
                                    exact
                                    path="*"
                                    component={NotFoundPage}
                                  />
                                </Switch>
                              </main>
                              {/* Desktop SideBar */}
                              {desktopView && session && (
                                <div className="side-bar">
                                  <SideBar user={user} />
                                </div>
                              )}
                            </div>
                            {/* Mobile Bottom Navigation */}
                            {phoneView && session && <MobileBottomNav />}
                          </div>
                          
                        </Router>
                        </haveIRequestedContext.Provider>
                      </jobRequestContext.Provider>
                    </UpcomingContext.Provider>
                  </UpcomingModalContext.Provider>
                </PostsContext.Provider>
              </PostModalContext.Provider>
            </ModalViewContext.Provider>
          </SessionContext.Provider>
        </UserContext.Provider>
      </PhoneViewContext.Provider>
    </DesktopViewContext.Provider>
  )
}

export default App
