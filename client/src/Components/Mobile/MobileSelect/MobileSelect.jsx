import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import './MobileSelect.css'

function MobileSelect() {
  return (
    <div className="mobile-select-holder">
      <SearchIcon height="20px" />
      <select>
        <option value="">Search by category</option>
        <option value="">Engineering</option>
        <option value="">Electronics</option>
        <option value="">Computers</option>
      </select>
    </div>
  )
}

export default MobileSelect
