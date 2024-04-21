import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavbarBottomItem = () => {
  return (
    <NavLink to='/feed' className='nav-link'>
      <i className='bi bi-house-door-fill fs-3' />
    </NavLink>
  )
}
