import React from 'react'
import { NavLink } from 'react-router-dom'

export const TrendItem = () => {
  return (
    <NavLink to='/' className='list-group-item border-0 mb-2 px-3'>
      <p className='fw-bold m-0'>Trend Name</p>
      <p className='text-muted m-0'>2.1k posts</p>
    </NavLink>

  )
}
