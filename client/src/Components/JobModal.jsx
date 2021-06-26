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
  const [category, setCategory] = useState('')

  const addPost = (e) => {
    e.preventDefault()
    setCounter(counter + 1)
    const post = {
      title: title,
      description: description,
      picture: picture,
      id: counter,
      category: category,
    }

    setPosts([...posts, post])
    setModalView(false)
    setPostModalIsOpen(false)

    axios
      .post('https://jobe-house.herokuapp.com/jobs', {
        title: title,
        description: description,
        picture: picture,
        authorid: user.fbID,
        status: 'Available',
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
              <option value=""></option>
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
