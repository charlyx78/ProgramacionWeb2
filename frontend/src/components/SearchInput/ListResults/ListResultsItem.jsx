import React from 'react'
import { NavLink } from 'react-router-dom'

export const ListResultsItem = () => {
  return (
    <NavLink to='/' className='list-group-item border-0 fw-medium'>
      <li className='d-flex align-items-center gap-3'>
        <i className="bi bi-search"></i>
        Hola
      </li>
    </NavLink>
  )
}
