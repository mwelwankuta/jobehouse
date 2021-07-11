import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Job from './Pages/Job'
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
import MobileBottomNav from './Components/Mobile/MobileBottomNav/MobileBottomNav'

import { UserContext } from './Contexts/UserContext/userContext'
import { ModalViewContext } from './Contexts/ModalViewContext/modalViewContext'

function AppRouter() {

  const desktopView = useMediaQuery({
    query: '(min-width: 800px)',
  })
  const phoneView = useMediaQuery({
    query: '(max-width: 800px)',
  })
  const { user } = useContext(UserContext)
  const { modalView } = useContext(ModalViewContext)

  return (
    <BrowserRouter>
      <div className="home-container">
        {user.fbID && (
          <div>
            <NavBar user={user} modalView={modalView} />
          </div>
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
              <Route exact path="/job/:id" component={Job} />
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
          <div className="side-bar">
            {desktopView && user.fbID && <SideBar user={user} />}
          </div>
        </div>
        {/* Mobile Bottom Navigation */}
        {phoneView && user.fbID && <MobileBottomNav />}
      </div>
    </BrowserRouter>
  )
}

export default AppRouter
