import React from 'react'
import { NavLink } from 'react-router-dom'
import { TrendsCard } from './Trends/TrendsCard'

export const TrendingBar = () => {
  return (
    <>
      <div className='menubar-container card border-0 d-flex flex-column d-none d-lg-block'>
        <div className='menubar-content card-body py-0 position-sticky d-flex flex-column gap-4'>
          <NavLink 
            className='form-control bg-body search-input rounded-pill w-100 py-2 position-relative px-3 text-decoration-none'
            to='/search'>
              Search...
          </NavLink>
          {/* <TrendsCard></TrendsCard> */}
        </div>
      </div>
    </>
  )
}
