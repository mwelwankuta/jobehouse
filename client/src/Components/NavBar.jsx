import React, { Fragment, useContext, useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import {
  DesktopViewContext,
  PhoneViewContext,
  PostsContext,
} from '../Contexts/viewContext'
import MobileNav from './Mobile/MobileNav/MobileNav'
import NavBarPopup from './NavBarPopup'

import logo from '../Resources/icon-with-text.svg'
import '../Styles/Components/NavBar.css'

function NavBar({ user, modalView }) {
  const phoneView = useContext(PhoneViewContext)
  const desktopView = useContext(DesktopViewContext)
  const [jobs] = useContext(PostsContext)

  const [filteredJobs, setFilterdJobs] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [PopupIsOpen, setPopupIsOpen] = useState(false)

  const handleSearch = (event) => {
    setSearchInput(event.target.value)
    const searchWord = event.target.value
    const resultsMatch = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchWord.toLowerCase()),
    )
    console.log(event.target.value.split('') > 0)
    setTimeout(() => {
      setFilterdJobs(resultsMatch)
    }, 300)
  }

  return (
    <Fragment>
      {modalView === false && desktopView && (
        <nav className="desktop-nav">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="jobe-house-logo"
              loading="eager"
            />
            {/* <h2 className="jobe-house-logo">JobeHouse</h2> */}
          </Link>

          <div className="select-container">
            <div className="nav-select-holder">
              <SearchIcon height="20px" />
              <input
                type="text"
                placeholder="Search for jobs"
                className="input"
                onChange={(event) => handleSearch(event)}
              />
            </div>
            {filteredJobs.length > 0 && searchInput.split('').length > 0 && (
              <div className="desktop-search-results">
                <ul className="search-results-list">
                  <h2>Search</h2>
                  {filteredJobs.map((job) => (
                    <li key={job._id} className="search-results">
                      <a href={`/job/${job._id}`}>
                        <p className="search-result-title">{job.title}</p>
                        <small className="search-result-description">
                          {job.description}
                        </small>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {user && (
              <div
                onClick={() => setPopupIsOpen(!PopupIsOpen)}
                className="image-holder"
              >
                <img src={user && user.picture} alt="profile" />
              </div>
            )}
          </div>
        </nav>
      )}

      {phoneView && <MobileNav user={user} />}

      {PopupIsOpen && <NavBarPopup />}
    </Fragment>
  )
}

export default NavBar
