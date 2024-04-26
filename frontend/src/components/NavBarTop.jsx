import { NavLink, useNavigate } from 'react-router-dom'
import { UserImage } from './UserImage'
import reactLogo from '../assets/react.svg'
// import { useUser } from '../contexts/UserContext'
import { useRef } from 'react'
import React from 'react'

export const NavBarTop = () => {
  const offcanvasRef = useRef(null)
  // const { logoutUser } = useUser()
  const navigate = useNavigate()
  // const handleLogOut = () => {
  //   if (offcanvasRef.current) {
  //     offcanvasElement.current.classList.remove('show')
  //   }
  //   logoutUser()
  //   navigate('/')
  // }

  return (
    <nav className='navbar navbar-expand-sm bg-body position-sticky border-bottom top-0 z-3 d-lg-none'>
      <div className='container'>
        <ul className='navbar-nav d-flex flex-row w-100 justify-content-around'>
          <NavLink to='/Feed' className='navbar-brand logo'>
            <div className='ps-3 logo fs-3'><i className="bi bi-dice-6-fill"></i></div>
          </NavLink>
          <li className='nav-item ms-auto'>
            <NavLink to='/profile'>
              <UserImage sourceImage={reactLogo} />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
