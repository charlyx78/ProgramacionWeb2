import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBarBottom = () => {
  return (
    <nav className='navbar fixed-bottom navbar-expand-sm navbar-light bg-white navbar-bottom d-lg-none'>
      <div className='container'>
        <ul className='navbar-nav d-flex flex-row w-100 justify-content-around'>
          <li className='nav-item'>
            <NavLink to='/Feed' className='nav-link active'>
              <i className='bi bi-house-door-fill fs-3' />
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/Login' className='nav-link'>
              <i className='bi bi-search fs-3' />
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/Login' className='nav-link'>
              <i className='bi bi-bell-fill fs-3' />
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/Login' className='nav-link'>
              <i className='bi bi-chat-fill fs-3' />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
