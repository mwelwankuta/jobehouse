import React, { useContext, Fragment } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { useMediaQuery } from 'react-responsive'

import { PostsContext } from '../Contexts/PostsContext/postsContext'
import { UserContext } from '../Contexts/UserContext/userContext'
import { PostModalContext } from '../Contexts/ModalViewContext/postModalContext'
import { ModalViewContext } from '../Contexts/ModalViewContext/modalViewContext'

import JobCard from '../Components/JobCard'
import JobModal from '../Components/JobModal'
import JobCardLoader from '../Components/Loaders/JobCardLoader.jsx'

import '../Styles/Pages/Home.css'

function Home() {
  const phoneView = useMediaQuery({
    query: '(max-width: 800px)',
  })

  const { setModalView } = useContext(ModalViewContext)
  const { setPostModalIsOpen } = useContext(PostModalContext)
  const { posts } = useContext(PostsContext)
  const { user } = useContext(UserContext)

  return (
    <div className="home-container">
      <div className="header-holder">
        <h2 className="page-title">Dash</h2>
        <button
          onClick={() => {
            setPostModalIsOpen(true)
            setModalView(true)
          }}>Post Job</button>
      </div>

      <div className="posts-list">
        {phoneView &&
          <div className="mobile-select-holder">
            <SearchIcon height="20px" />
            <input
              type="text"
              className="search-bar"
              placeholder="Search for jobs"
              onClick={() => window.location = '/search'}
            />
          </div>}
        {posts.length > 0 ? <small>{posts.length} {posts.length > 1 ? 'Rooms' : 'Room'}</small> : <small>Loading...</small>}
        {user.fbID &&
          posts.length > 0 &&
          posts.map((post) => {
            return (
              <JobCard
                key={post.id}
                description={post.description}
                title={post.title}
                id={post.id}
                status={post.status}
                requests={post.requests}
                date={post.date}
                user={user}
              />
            )
          })
        }
        {posts.length === 0 &&
          <Fragment>
            <JobCardLoader />
            <JobCardLoader />
            <JobCardLoader />
            <JobCardLoader />
            <JobCardLoader />
            <JobCardLoader />
          </Fragment>
        }

      </div>
      <JobModal />
    </div>
  )
}

export default Home
