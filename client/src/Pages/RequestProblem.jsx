import React from 'react'

const RequestProblem = () => {
  return (
    <center>
      <p>There was a problem with your request. Try again after some time.</p>
      <a href="/" className="go-back-link" style={{ color: '#2d9cdb' }}>
        go back
      </a>
    </center>
  )
}

export default RequestProblem