import React, { useEffect, useState } from 'react'

import { UserContext } from './userContext'
function UserContextProvider({ children }) {
  const [user, setUser] = useState({})

  useEffect(() => {
    if (localStorage.getItem('client')) {
      const sessionUser = JSON.parse(localStorage.getItem('client'))
      setUser(sessionUser)
    }
  }, [])

  const value = { user, setUser }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
