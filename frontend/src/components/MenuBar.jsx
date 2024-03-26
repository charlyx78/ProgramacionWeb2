import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserImage } from './UserImage'
import reactLogo from '../assets/react.svg'
import { useUser } from '../contexts/UserContext'

export const MenuBar = () => {
  const { getUser, logoutUser } = useUser()

  return (
    <>
      <div className='card bg-transparent menubar-container rounded-0 border-end d-flex flex-column py-2 d-none d-lg-block'>
        <ul className='card-body nav nav-pills flex-column mb-auto menubar-content h-100'>
          <li className="nav-item">
            <NavLink to='/Feed' className='logo mb-3 nav-link'>
              <h3 className='fw-bold m-0 text-primary logo-menubar'>Trendingverse</h3>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/Feed' className='nav-link'>
              <i className='bi bi-house-door-fill' />
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/Login' className='nav-link'>
              <i className='bi bi-search' />
              Search   
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/Profile' className='nav-link'>
              <i className='bi bi-person-fill' />
              Profile
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/Login' className='nav-link'>
              <i className='bi bi-bell-fill' />
              Notifications
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/Login' className='nav-link'>
              <i className='bi bi-chat-fill' />
              Chat
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/Login' className='nav-link'>
              <i className='bi bi-bookmark-fill' />
              Saved
            </NavLink>
          </li>
          <li className='nav-item mt-4'>
            <NavLink to='/create-post' className='btn btn-primary btn w-100'>
              Post
            </NavLink>
          </li>
          <li className='nav-item dropup mt-auto d-flex menubar-item-user'>
            <button
              className='d-flex gap-3 align-items-center link-body-emphasis text-decoration-none dropdown-toggle btn-icon rounded-pill'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <UserImage sourceImage={reactLogo} />
              <div className='d-flex flex-column align-items-start'>
                <p className='fw-bold m-0'>{getUser()?.name}</p>
                <p className='text-muted m-0'>@{getUser()?.userName}</p>       
              </div>
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
