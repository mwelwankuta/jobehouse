import React, { useEffect, useState } from 'react'

import { UserContext } from './userContext'
function UserContextProvider({ children }) {
  const [user, setUser] = useState({})

  useEffect(() => {
    if (sessionStorage.getItem('client')) {
      const sessionUser = JSON.parse(sessionStorage.getItem('client'))
      setUser(sessionUser[0])
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
