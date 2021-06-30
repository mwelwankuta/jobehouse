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
import MobileSearchPage from './Pages/Mobile/MobileSearchPage'
import MobileBottomNav from './Components/Mobile/MobileBottomNav/MobileBottomNav'

import {
  UserContext,
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
  const [user, setUser] = useState(null)
  const [modalView, setModalView] = useState(false)
  const [postModalIsOpen, setPostModalIsOpen] = useState(false)
  const [upcomingModalIsOpen, setUpcomingModalIsOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const [upcomings, setUpcomings] = useState([])
  const [jobRequests, setJobRequests] = useState([])
  const [haveIRequested, setHaveIRequested] = useState(false)

  const phoneView = useMediaQuery({
    query: '(max-width: 800px)',
  })

  const desktopView = useMediaQuery({
    query: '(min-width: 800px)',
  })

  useEffect(() => {
    if (sessionStorage.getItem('client')) {
      const sessionUser = JSON.parse(sessionStorage.getItem('client'))
      setUser(sessionUser[0])
    }
  }, [])

  useEffect(() => {
    if (user) {
      axios
        .get('https://jobe-house.herokuapp.com/jobs')
        .then((res) => setPosts(res.data))
    }
  }, [user])

  useEffect(() => {
    if (user) {
      axios
        .post('https://jobe-house.herokuapp.com/requestnotifications', {
          fbId: user.fbID,
        })
        .then((res) => {
          setJobRequests(res.data)
        })
    }
  }, [user])

  const Terms = () => {
    return <h2>Terms of Service coming Soon...</h2>
  }

  const NotFoundPage = () => {
    return (
      <center>
        <p>Hmm...this page doesn’t exist. Try searching for something else.</p>
        <a href="/" className="go-back-link" style={{ color: '#2d9cdb' }}>
          go back
        </a>
      </center>
    )
  }

  const RequestProblem = () => {
    return (
      <center>
        <p>There was a problem with your request. Try again after some time.</p>
        <a href="/" className="go-back-link" style={{ color: '#2d9cdb' }}>
          go back
        </a>
      </center>
    )
  }

  return (
    <DesktopViewContext.Provider value={desktopView}>
      <PhoneViewContext.Provider value={phoneView}>
        <UserContext.Provider value={[user, setUser]}>
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
                      <haveIRequestedContext.Provider
                        value={[haveIRequested, setHaveIRequested]}
                      >
                        <Router>
                          <div className="home-container">
                            {user && (
                              <NavBar user={user} modalView={modalView} />
                            )}
                            <div className="sections">
                              {desktopView && (
                                <div style={{ position: 'sticky' }}>
                                  {user && <LinksBar />}
                                </div>
                              )}

                              <main className="main-content">
                                <Switch>
                                  {user && (
                                    <Route exact path="/" component={Home} />
                                  )}
                                  {!user && (
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

                                  {phoneView && (
                                    <Route
                                      exact
                                      path="/search"
                                      component={MobileSearchPage}
                                    />
                                  )}

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
                              <div className="side-bar">
                                {desktopView && user && <SideBar user={user} />}
                              </div>
                            </div>
                            {/* Mobile Bottom Navigation */}
                            {phoneView && user && <MobileBottomNav />}
                          </div>
                        </Router>
                      </haveIRequestedContext.Provider>
                    </jobRequestContext.Provider>
                  </UpcomingContext.Provider>
                </UpcomingModalContext.Provider>
              </PostsContext.Provider>
            </PostModalContext.Provider>
          </ModalViewContext.Provider>
        </UserContext.Provider>
      </PhoneViewContext.Provider>
    </DesktopViewContext.Provider>
  )
}

export default App
