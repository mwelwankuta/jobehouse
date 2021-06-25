import React, { useState, useContext } from 'react'
import {
  ModalViewContext,
  PostModalContext,
  PostsContext,
  UserContext,
} from '../Contexts/viewContext'
import ReactModal from 'react-modal'
import '../Styles/Components/Modal.css'
import { XIcon } from '@heroicons/react/outline'
import axios from 'axios'

function PostModal() {
  const [, setModalView] = useContext(ModalViewContext)
  const [postModalIsOpen, setPostModalIsOpen] = useContext(PostModalContext)
  const [posts, setPosts] = useContext(PostsContext)
  const user = useContext(UserContext)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [picture, setPicture] = useState('')
  const [counter, setCounter] = useState(0)

  const addPost = (e) => {
    e.preventDefault()
    setCounter(counter + 1)
    const post = {
      title: title,
      description: picture,
      picture: picture,
      id: counter,
    }

    setPosts([...posts, post])
    setModalView(false)
    setPostModalIsOpen(false)

    axios
      .post('http://localhost:4000/posts', {
        title: title,
        description: description,
        picture: picture,
        authorid: user.id,
        status: 'available',
      })
      .then((res) => {
        setPosts(res.data)
      })
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

        <form onSubmit={(e) => addPost(e)}>
          <div className="input-holder">
            <label htmlFor="title">
              <small>title</small>
            </label>
            <input name="title" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="input-holder">
            <label htmlFor="description">
              <small>description</small>
            </label>
            <input
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-holder">
            <label htmlFor="picture">
              <small>picture</small>
            </label>
            <input
              name="picture"
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
