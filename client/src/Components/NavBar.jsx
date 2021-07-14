import React, { Fragment, useContext, useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { PostsContext } from '../Contexts/PostsContext/postsContext'
import { useMediaQuery } from 'react-responsive'

import MobileNav from './Mobile/MobileNav/MobileNav'
import NavBarPopup from './NavBarPopup'
import IconWithText from '../Resources/IconWithText'

import '../Styles/Components/NavBar.css'

function NavBar({ user, modalView }) {
  const phoneView = useMediaQuery({
    query: '(max-width: 800px)',
  })

  const desktopView = useMediaQuery({
    query: '(min-width: 800px)',
  })
  const { posts } = useContext(PostsContext)

  const [filteredJobs, setFilterdJobs] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [PopupIsOpen, setPopupIsOpen] = useState(false)

  const handleSearch = (event) => {
    setSearchInput(event.target.value)
    const searchWord = event.target.value
    const resultsMatch = posts.filter((job) =>
      job.title.toLowerCase().includes(searchWord.toLowerCase()),
    )
    setTimeout(() => {
      setFilterdJobs(resultsMatch)
    }, 300)
  }

  return (
    <Fragment>
      {modalView === false && desktopView && (
        <nav className="desktop-nav">
          <Link to="/">
            <div className="jobe-house-logo">
              <IconWithText/>
            </div>
          </Link>

          <div className="search-container">
            <div className="nav-search-holder">
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
                    <li key={job.id} className="search-results">
                      <a href={`/job/${job.id}`}>
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

            {user.fbID && (
              <div className="image-holder">
                <img src={user.fbID && user.picture} alt="profile" 
                  onClick={() => setPopupIsOpen(!PopupIsOpen)}/>
              </div>
            )}
          </div>
        </nav>
      )}

      {phoneView && <MobileNav user={user} />}

      {PopupIsOpen && <NavBarPopup setPopupIsOpen={setPopupIsOpen}/>}
    </Fragment>
  )
}

export default NavBar
