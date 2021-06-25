import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Components/PostCard.css'

function PostCard({ id, title, description }) {
  const joblink = `/job/${id}`
  return (
    <Link to={joblink}>
      <div className="post-card">
        <p className="post-text">{title}</p>
        <p className="post-description">{description}</p>
        <small
          style={{
            color: 1 > 2 ? 'rgb(209, 22, 22)' : 'rgb(22, 209, 78)',
          }}
        >
          Available
        </small>
      </div>
    </Link>
  )
}

export default PostCard
