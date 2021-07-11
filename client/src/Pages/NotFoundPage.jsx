import React from 'react'

const NotFoundPage = () => {
  return (
    <center>
      <p>Hmm...this page doesn’t exist. Try searching for something else.</p>
      <a href="/" className="go-back-link" style={{ color: '#2d9cdb' }}>
        go back
      </a>
    </center>
  )
}
export default NotFoundPage