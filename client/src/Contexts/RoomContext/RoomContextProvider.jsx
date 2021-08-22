import React, { useState } from 'react'
import { RoomContext } from './roomContext'

function RoomContextProvider({ children }) {
  const [inRoom, setInRoom] = useState({ isInRoom: false })
  const [isConnected, setIsConnected] = useState({ isConnectedToRoom: false })

  const RoomContextValue = { inRoom, setInRoom, isConnected, setIsConnected }
  return (
    <RoomContext.Provider value={RoomContextValue}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContextProvider
