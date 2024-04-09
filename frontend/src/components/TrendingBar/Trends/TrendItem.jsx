import React from 'react'
import { NavLink } from 'react-router-dom'

export const TrendItem = ({isNew = false}) => {
  return (
    <NavLink to='/' className='list-group-item border-0 bg-transparent d-flex justify-content-between align-items-start'>
      <div className='d-flex flex-column align-items-start'>
        <p className='m-0 fw-semibold'>Trend Name</p>
        <p className='text-muted m-0'>2.1k posts</p>
      </div>
      {isNew && (
        <span className='badge bg-primary text-bg-primary'>NEW!</span>
      )}
    </NavLink>

  )
}
