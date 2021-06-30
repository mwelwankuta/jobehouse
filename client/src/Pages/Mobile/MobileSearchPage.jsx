import React, { useContext } from 'react'
import MobileSearch from '../../Components/Mobile/MobileSearch/MobileSearch'
import { PostsContext } from '../../Contexts/viewContext'

function MobileSearchPage() {
  const [posts] = useContext(PostsContext)

  return (
    <div className="mobile-search-page">
      <h2 className="page-title">Search</h2>
      <MobileSearch jobs={posts} />
    </div>
  )
}

export default MobileSearchPage
