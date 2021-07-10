import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { XIcon } from '@heroicons/react/outline'
import ReactModal from 'react-modal'

import { ModalViewContext } from '../Contexts/ModalViewContext/modalViewContext'
import { PostsContext } from '../Contexts/PostsContext/postsContext'
import { PostModalContext } from '../Contexts/ModalViewContext/postModalContext'
import { UserContext } from '../Contexts/UserContext/userContext'
import { ADD_POST } from '../Graphql/Mutations'

import '../Styles/Components/Modal.css'

function PostModal() {
  const { setModalView } = useContext(ModalViewContext)
  const { postModalIsOpen, setPostModalIsOpen } = useContext(PostModalContext)
  const { posts, setPosts } = useContext(PostsContext)

  const { user } = useContext(UserContext)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [picture, setPicture] = useState('')
  const [counter, setCounter] = useState(0)
  const [category, setCategory] = useState('')

  const [addPost, { error }] = useMutation(ADD_POST)

  const createPost = (e) => {
    e.preventDefault()
    setCounter(counter + 1)
    const post = {
      title: title,
      description: description,
      picture: picture,
      id: counter,
      category: category,
      date: Date.now(),
      status: 'Available',
    }

    setPosts([...posts, post])
    setModalView(false)
    setPostModalIsOpen(false)

    addPost({
      variables: {
        title: title,
        description: description,
        picture: picture,
        authorid: user.fbID
      }
    })
    console.error(error, 'error')
    // setPosts(res.data)
  }

  return (
    <ReactModal
      isOpen={postModalIsOpen}
      shouldCloseOnEsc={true}
      onRequestClose={() => {
        setPostModalIsOpen(false)
        setModalView(false)
      }}
      className="post-modal"
    >
      <div className="modal-child">
        <div className="close-btn">
          <h2>Create a post</h2>
          <button
            onClick={() => {
              setPostModalIsOpen(false)
              setModalView(false)
            }}
          >
            <XIcon height="20px" />
          </button>
        </div>

        <form onSubmit={(e) => createPost(e)}>
          <div className="input-holder">
            <label htmlFor="title">
              <small>title</small>
            </label>
            <input
              name="title"
              autoComplete="off"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-holder">
            <label htmlFor="description">
              <small>description</small>
            </label>
            <input
              name="description"
              autoComplete="off"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-holder">
            <label htmlFor="picture">
              <small>Category</small>
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="modal-select"
            >
              <option value="">Engineering</option>
              <option value="">Garden</option>
              <option value="">Computers</option>
            </select>
          </div>
          <div className="input-holder">
            <label htmlFor="picture">
              <small>picture</small>
            </label>
            <input
              name="picture"
              autoComplete="off"
              onChange={(e) => setPicture(e.target.value)}
            />
          </div>
          <button>Add Post</button>
        </form>
      </div>
    </ReactModal>
  )
}

export default PostModal
