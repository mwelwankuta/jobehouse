import React, { useState } from 'react'

import { ModalViewContext } from './modalViewContext'
import { PostModalContext } from './postModalContext'
import { UpcomingModalContext } from './upcomingModalContext'

function ModalViewContextProvider({ children }) {

  const [modalView, setModalView] = useState(false)
  const [postModalIsOpen, setPostModalIsOpen] = useState(false)
  const [upcomingModalIsOpen, setUpcomingModalIsOpen] = useState(false)

  const modalViewValue = { modalView, setModalView }
  const postModalIsOpenValue = { postModalIsOpen, setPostModalIsOpen }
  const upcomingModalIsOpenValue = { upcomingModalIsOpen, setUpcomingModalIsOpen }

  return (
    <ModalViewContext.Provider value={modalViewValue}>
      <PostModalContext.Provider value={postModalIsOpenValue}>
        <UpcomingModalContext.Provider value={upcomingModalIsOpenValue}>
          {children}
        </UpcomingModalContext.Provider>
      </PostModalContext.Provider>
    </ModalViewContext.Provider>
  )
}

export default ModalViewContextProvider
