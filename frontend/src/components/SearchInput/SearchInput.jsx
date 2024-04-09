import React, { useState } from 'react'
import { ListResults } from './ListResults/ListResults'

export const SearchInput = () => {
  const [showListResults, setShowListResults] = useState(false)
  const [searchString, setSearchString] = useState(null)

  const handleShowListResults = () => {
    setShowListResults(true)
  }
  
  const handleHideListResults = () => {
    setShowListResults(false)
  }

  return (
    <div className='w-100'>
      <input 
        onChange={(e) => {setSearchString(e.target.value)}}
        onFocus={handleShowListResults} 
        onBlur={handleHideListResults} 
        autoComplete='off' 
        type="text" 
        className='form-control search-input rounded-pill w-100 py-2 position-relative px-3' 
        placeholder='Search' 
      />
      <div className={showListResults ? 'd-block' : 'd-none'}>
        <ListResults searchString={searchString}></ListResults>
      </div>
    </div>
  )
}
