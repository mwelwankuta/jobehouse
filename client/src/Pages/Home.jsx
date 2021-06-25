import React, { useContext, useEffect } from 'react'
import {
  ModalViewContext,
  PhoneViewContext,
  PostModalContext,
  PostsContext,
  SessionContext,
  UserContext,
} from '../Contexts/viewContext.js'

import MobileSelect from '../Components/Mobile/MobileSelect/MobileSelect'
import PostCard from '../Components/PostCard'
import '../Styles/Pages/Home.css'
import PostModal from '../Components/PostModal.jsx'

function Home() {
  const phoneView = useContext(PhoneViewContext)
  const session = useContext(SessionContext)
  const [viewModal, setModalView] = useContext(ModalViewContext)
  const [postModalIsOpen, setPostModalIsOpen] = useContext(PostModalContext)
  const [posts] = useContext(PostsContext)

  const user = useContext(UserContext)

  useEffect(() => {
    if (viewModal || postModalIsOpen) {
      console.log(viewModal, postModalIsOpen)
    }
  }, [viewModal, postModalIsOpen])

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
        {phoneView && <MobileSelect />}
        <small>
          {posts.length} {posts.length > 1 ? 'jobs' : 'job'}
        </small>
        {session && posts.length > 0 ? (
          posts.map((post) => {
            return (
              <PostCard
                key={post.title}
                description={post.description}
                title={post.title}
                id={post.id}
                user={user}
              />
            )
          })
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
      <PostModal />
    </div>
  )
}

export default Home
