import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import './MobileSearch.css'

function MobileSearch({ posts }) {
  const [filteredJobs, setFilterdJobs] = useState([])


  const handleSearch = (e) => {
    console.log(posts, 'search posts')
    const searchWord = e.target.value
    const resultsMatch = posts.filter((post) =>
      post.description.toLowerCase().includes(searchWord.toLowerCase()),
    )
    setFilterdJobs(resultsMatch)
  }

  return (
    <Fragment>
      {/* Input */}
      <div className="mobile-select-holder">
        <SearchIcon height="20px" />
        <input
          type="text"
          className="search-bar"
          placeholder="Search for jobs"
          autoFocus="on"
          onChange={(e) => handleSearch(e)}
        />
      </div>
      {/* Input results */}
      <div className="search-results-holder">
        {filteredJobs.length > 0 && (
          <ul className="search-results-list">
            {filteredJobs.map((job) => (
              <li key={job._id} className="search-results">
                <Link to={`/job/${job._id}`}>
                  <p className="search-result-title">{job.title}</p>
                  <p className="search-reesult-description">
                    {job.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Fragment>
  )
}

export default MobileSearch
