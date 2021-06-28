import React, { useContext } from 'react'
import {
  ModalViewContext,
  PhoneViewContext,
  PostModalContext,
  PostsContext,
  SessionContext,
  UserContext,
} from '../Contexts/viewContext.js'

import JobCard from '../Components/JobCard'
import '../Styles/Pages/Home.css'
import JobModal from '../Components/JobModal'
import { SearchIcon } from '@heroicons/react/solid'
import { useHistory } from 'react-router-dom'

function Home() {
  const phoneView = useContext(PhoneViewContext)
  const session = useContext(SessionContext)
  const [, setModalView] = useContext(ModalViewContext)
  const [, setPostModalIsOpen] = useContext(PostModalContext)
  const [posts] = useContext(PostsContext)

  const [user] = useContext(UserContext)
  const router = useHistory()

  return (
    <div className="home-container">
      <div className="header-holder">
        <h1 className="page-title">Dash</h1>
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
              onClick={(event) => router.push('/search')}
            />
          </div>
        )}
        <small>
          {posts.length} {posts.length > 1 ? 'jobs' : 'job'}
        </small>
        {session && posts.length > 0 ? (
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
        ) : (
          <small style={{ textAlign: 'center' }}>
            There are no posts at the moment, consider adding one
          </small>
        )}

        {!session && (
          <small style={{ textAlign: 'center' }}>
            You need to be signed in to view posts
          </small>
        )}
      </div>
      <JobModal />
    </div>
  )
}

export default Home
