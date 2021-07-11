import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

import { UserContext } from '../UserContext/userContext'
import { haveIRequestedContext } from './haveIRequestedContext'
import { JobRequestContext } from './jobRequestContext'

function RequestsContextProvider({ children }) {

  const { user } = useContext(UserContext)

  const [jobRequests, setJobRequests] = useState([])
  const [haveIRequested, setHaveIRequested] = useState(false)

  const jobRequestContextValue = { jobRequests, setJobRequests }
  const haveIRequestedContextValue = { haveIRequested, setHaveIRequested }

  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .post('https://jobe-house.herokuapp.com/requestnotifications', {
  //         fbId: user.fbID,
  //       })
  //       .then((res) => {
  //         setJobRequests(res.data)
  //       })
  //   }
  // }, [user])


  return (
    <JobRequestContext.Provider value={jobRequestContextValue}>
      <haveIRequestedContext.Provider value={haveIRequestedContextValue}>
        {children}
      </haveIRequestedContext.Provider>
    </JobRequestContext.Provider>
  )
}

export default RequestsContextProvider
