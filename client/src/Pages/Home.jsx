import React, { useContext, Fragment } from 'react'
import {
  ModalViewContext,
  PhoneViewContext,
  PostModalContext,
  PostsContext,
  UserContext,
} from '../Contexts/viewContext.js'

import JobCard from '../Components/JobCard'
import '../Styles/Pages/Home.css'
import JobModal from '../Components/JobModal'
import { SearchIcon } from '@heroicons/react/solid'
import { useHistory } from 'react-router-dom'
import JobCardLoader from '../Components/Loaders/JobCardLoader.jsx'

function Home() {
  const phoneView = useContext(PhoneViewContext)
  const [, setModalView] = useContext(ModalViewContext)
  const [, setPostModalIsOpen] = useContext(PostModalContext)
  const [posts] = useContext(PostsContext)

  const [user] = useContext(UserContext)
  const router = useHistory()

  return (
    <div className="home-container">
      <div className="header-holder">
        <h2 className="page-title">Dash</h2>
        <button
          onClick={() => {
            setPostModalIsOpen(true)
            setModalView(true)
          }}
        >
          Post Job
        </button>
      </div>

      <div className="posts-list">
        {phoneView && (
          <div className="mobile-select-holder">
            <SearchIcon height="20px" />
            <input
              type="text"
              className="search-bar"
              placeholder="Search for jobs"
              onClick={() => router.push('/search')}
            />
          </div>
        )}
        {posts.length > 0 ? (
          <small>
            {posts.length} {posts.length > 1 ? 'jobs' : 'job'}
          </small>
        ) : (
          <small>Loading...</small>
        )}
        {user && posts.length > 0 ? (
          posts.length > 1 ? (
            posts
              .sort((a, b) => b.date - a.date)
              .map((post) => {
                return (
                  <JobCard
                    key={post._id}
                    description={post.description}
                    title={post.title}
                    id={post._id}
                    status={post.status}
                    requests={post.requests}
                    date={post.date}
                    user={user}
                  />
                )
              })
          ) : (
            posts.map((post) => {
              return (
                <JobCard
                  key={post._id}
                  description={post.description}
                  title={post.title}
                  id={post._id}
                  status={post.status}
                  requests={post.requests}
                  date={post.date}
                  user={user}
                />
              )
            })
          )
        ) : // JobCard loaders
        phoneView ? (
          <Fragment>
            <JobCardLoader />
            <JobCardLoader />
            <JobCardLoader />
          </Fragment>
        ) : (
          <Fragment>
            <JobCardLoader />
            <JobCardLoader />
            <JobCardLoader />
            <JobCardLoader />
            <JobCardLoader />
          </Fragment>
        )}
      </div>
      <JobModal />
    </div>
  )
}

export default Home
