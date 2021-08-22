import React, { useContext, Fragment, useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Room from './Pages/Room'
import Settings from './Pages/Settings'
import Privacy from './Pages/Privacy'
import Upcoming from './Pages/Upcoming'
import Profile from './Pages/Profile'
import Requests from './Pages/Requests'
import LinksBar from './Pages/LinksBar'
import RequestProblem from './Pages/RequestProblem'
import NotFoundPage from './Pages/NotFoundPage'
import Terms from './Pages/Terms'
import MobileSearchPage from './Pages/Mobile/MobileSearchPage'

import NavBar from './Components/NavBar'
import SideBar from './Components/SideBar'
import MessageBar from './Components/MessageBar'
import MobileBottomNav from './Components/Mobile/MobileBottomNav/MobileBottomNav'

import { UserContext } from './Contexts/UserContext/userContext'
import { ModalViewContext } from './Contexts/ModalViewContext/modalViewContext'

function AppRouter() {

  const [isInRoom, setIsInRoom] = useState(false)

  const desktopView = useMediaQuery({
    query: '(min-width: 800px)',
  })
  const phoneView = useMediaQuery({
    query: '(max-width: 800px)',
  })
  const { user } = useContext(UserContext)
  const { modalView } = useContext(ModalViewContext)

  const path = window.location.pathname.split('/')[1]
  useEffect(() => {
    if (path === 'job'){
      console.log(path)
      setIsInRoom(true)
    }else{
      console.log(path)
      setIsInRoom(false)
    }
  }, [path])
  return (
    <BrowserRouter>
      <div className="home-container">
        {user.fbID && (
          <Fragment>
            <NavBar user={user} modalView={modalView} />
          </Fragment>
        )}
        <div className="sections">
          {desktopView && (
            <div style={{ position: 'sticky' }}>
              {user.fbID && <LinksBar />}
            </div>
          )}

          <main className="main-content">
            <Switch>
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/upcoming" component={Upcoming} />
              <Route exact path="/requests" component={Requests} />
              <Route exact path="/terms" component={Terms} />
              <Route exact path="/privacy" component={Privacy} />
              <Route exact path="/job/:id" component={Room} />
              <Route exact path="/profile" component={Profile} />
              {phoneView && <Route exact path="/search" component={MobileSearchPage} />}
              <Route exact path="/error" component={RequestProblem} />
              {user.fbID && (
                <Route exact path="/" component={Home} />
              )}
              {!user.fbID && (
                <Route exact path="/" component={Auth} />
              )}
              <Route exact path="*" component={NotFoundPage} />
            </Switch>
          </main>

          {/* Desktop SideBar */}
          <div className="side-bar" style={{ position: 'sticky' }}>
            {desktopView && isInRoom === false && user.fbID && <SideBar user={user} />}
            {desktopView && isInRoom && <MessageBar />}
          </div>
        </div>
        {/* Mobile Bottom Navigation */}
        {phoneView && user.fbID && <MobileBottomNav />}
      </div>
    </BrowserRouter>
  )
}

export default AppRouter
