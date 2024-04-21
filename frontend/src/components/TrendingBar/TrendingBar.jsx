import React from 'react'
import { NavLink } from 'react-router-dom'
import { TrendsCard } from './Trends/TrendsCard'
import { SearchInput } from '../SearchInput/SearchInput'

export const TrendingBar = () => {
  return (
    <>
      <div className='menubar-container card border-0 border-start d-flex flex-column d-none d-lg-block'>
        <div className='menubar-content card-body py-0 position-sticky d-flex flex-column gap-4'>
          <SearchInput></SearchInput>
          <TrendsCard></TrendsCard>
        </div>
      </div>
    </>
  )
}
