import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserImage } from './UserImage'
import reactLogo from '../assets/react.svg'
import { useUser } from '../contexts/UserContext'

export const MenuBar = () => {
  const { getUser, logoutUser } = useUser()

  return (
    <>
      <div className='menubar-container shadow-sm card d-flex flex-column py-2 d-none d-lg-block'>
        <ul className='card-body nav nav-pills flex-column mb-auto menubar-content h-100'>
          <NavLink to='/Feed' className='logo fs-3 mb-4 text-center'>Trendingverse</NavLink>
          <li className='nav-item'>
            <NavLink to='/Feed' className='nav-link'>
              <i className='bi bi-house-door-fill fs-3' />
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/Login' className='nav-link'>
              <i className='bi bi-search fs-3' />
              Search   
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/Profile' className='nav-link'>
              <i className='bi bi-person-fill fs-3' />
              Profile
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/Login' className='nav-link'>
              <i className='bi bi-bell-fill fs-3' />
              Notifications
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/Login' className='nav-link'>
              <i className='bi bi-chat-fill fs-3' />
              Chat
            </NavLink>
          </li>
          <li className='nav-item dropup mt-auto d-flex menubar-item-user'>
            <button
              className='d-flex gap-3 align-items-center link-body-emphasis text-decoration-none dropdown-toggle btn-icon rounded-pill'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <UserImage sourceImage={reactLogo} />
              {getUser()?.userName}
            </button>
            <ul className='dropdown-menu text-small'>
              <li>
                <NavLink
                  to='/Login'
                  className='dropdown-item'
                  onClick={logoutUser}
                >
                  Log Out
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>

      </div>
    </>
  )
}
