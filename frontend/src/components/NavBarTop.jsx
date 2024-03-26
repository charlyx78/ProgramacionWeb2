import { NavLink, useNavigate } from 'react-router-dom'
import { UserImage } from './UserImage'
import reactLogo from '../assets/react.svg'
import { useUser } from '../contexts/UserContext'
import { useRef } from 'react'
import React from 'react'

export const NavBarTop = () => {
  const offcanvasRef = useRef(null)
  const { logoutUser } = useUser()
  const navigate = useNavigate()
  const handleLogOut = () => {
    if (offcanvasRef.current) {
      offcanvasElement.current.classList.remove('show')
    }
    logoutUser()
    navigate('/')
  }

  return (
    <>
      <nav className='navbar navbar-top navbar-expand-sm navbar-light bg-white py-3 position-sticky top-0 d-block d-lg-none'>
        <div className='container'>
          <ul className='navbar-nav d-flex flex-row w-100 justify-content-around'>
            <NavLink to='/Feed' className='navbar-brand'>
              <h1 className='logo fs-3'>Trendingverse</h1>
            </NavLink>
            <li className='nav-item ms-auto'>
              <NavLink to='/profile'>
                <UserImage sourceImage={reactLogo} />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className='offcanvas offcanvas-end' ref={offcanvasRef} tabIndex='-1' id='sidebar-profile' aria-labelledby='sidebar-profileLabel'>
        <div className='offcanvas-body'>
          <nav className='navbar'>
            <ul className='navbar-nav'>
              <li className='nav-item' onClick={handleLogOut}>
                Log Out
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
