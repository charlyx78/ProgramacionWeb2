import React from 'react'
import { NavBarBottom } from '../components/NavBarBottom'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import { NavBarTop } from '../components/NavBarTop'
import { MenuBar } from '../components/MenuBar'
import { TrendingBar } from '../components/TrendingBar'

export const HomePage = () => {
  const { getUser } = useUser()
  const navigate = useNavigate()

  // Redirige a login page si no hay una sesion iniciada
  useEffect(() => {
    if (!getUser()) {
      navigate('/Login')
    }
  }, [getUser, navigate])

  return (
    <div className='bg-gray-100'>
      <div className='home-container'>
        <NavBarTop></NavBarTop>
        <div className="home-content container-fluid padding-top-content padding-bottom-content">
          <MenuBar />
          <Outlet />
          <TrendingBar />
        </div>
        <NavBarBottom></NavBarBottom>
      </div> 
    </div>
  )
}
