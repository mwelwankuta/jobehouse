import React, { useState, useContext } from 'react'
import { XIcon } from '@heroicons/react/outline'
import ReactModal from 'react-modal'
import axios from 'axios'

import { UpcomingContext } from '../Contexts/PostsContext/upcomingContext'
import { UpcomingModalContext } from '../Contexts/ModalViewContext/upcomingModalContext'
import { ModalViewContext } from '../Contexts/ModalViewContext/modalViewContext'
import { UserContext } from '../Contexts/UserContext/userContext'

import '../Styles/Components/Modal.css'

function CreateUpcomingModal() {
  const { setModalView } = useContext(ModalViewContext)
  const { upcomingModalIsOpen, setUpcomingModalIsOpen } = useContext(UpcomingModalContext)
  const { upcomings, setUpcomings } = useContext(UpcomingContext)
  const { user } = useContext(UserContext)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')

  const addUpcomingJob = (e) => {

    e.preventDefault()
    const upcoming = {
      title: title,
      time: date.split('T')[0],
      date: date.split('T')[1],
      description: description,
      category: category,
      authorid: user.fbID,
      requests: [],
      status: 'Available',
    }

    setUpcomings([...upcomings, upcoming])
    setModalView(false)
    setUpcomingModalIsOpen(false)

    axios
      .post('https://jobe-house.herokuapp.com/posts', {
        title: title,
        description: description,
        date: date,
        authorid: user.id,
        status: 'available',
      })
      .then((res) => {
        setUpcomings(res.data)
      })
  }

  return (
    <ReactModal
      isOpen={upcomingModalIsOpen}
      shouldCloseOnEsc={true}
      onRequestClose={() => {
        setUpcomingModalIsOpen(false)
        setModalView(false)
      }}
      className="post-modal"
    >
      <div className="modal-child">
        <div className="close-btn">
          <h2>Create a scheduled job</h2>
          <button
            onClick={() => {
              setUpcomingModalIsOpen(false)
              setModalView(false)
            }}
          >
            <XIcon height="20px" />
          </button>
        </div>

        <form onSubmit={(e) => addUpcomingJob(e)}>
          {/* Title Inpute */}
          <div className="input-holder">
            <label htmlFor="title">
              <small>title</small>
            </label>
            <input
              name="title"
              autoComplete="off"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </div>

          {/* Date-time Picker */}
          <div className="input-holder">
            <input
              type="datetime-local"
              name=""
              id=""
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {/* Title Job Category */}
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
            <label htmlFor="description">
              <small>desciption</small>
            </label>
            <input
              name="description"
              autoComplete="off"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button>Create Upcoming Post</button>
        </form>
      </div>
    </ReactModal>
  )
}

export default CreateUpcomingModal
