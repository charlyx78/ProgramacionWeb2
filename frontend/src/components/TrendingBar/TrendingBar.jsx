import React from 'react'
import { NavLink } from 'react-router-dom'
import { TrendsCard } from './Trends/TrendsCard'
import { ProfilesSuggestedCard } from './ProfilesSuggested/ProfilesSuggestedCard'
import { SearchInput } from '../SearchInput/SearchInput'

export const TrendingBar = () => {
  return (
    <>
      <div className='z-3 menubar-container card rounded-0 bg-transparent border-start d-flex flex-column py-2 d-none d-lg-block'>
        <div className='card-body d-flex flex-column gap-4'>
          <SearchInput></SearchInput>
          <TrendsCard></TrendsCard>
          <ProfilesSuggestedCard></ProfilesSuggestedCard>
        </div>
      </div>
    </>
  )
}
