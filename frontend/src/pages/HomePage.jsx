import React, { useState } from 'react'
import { NavBarBottom } from '../components/NavBarBottom'
import { Outlet, useNavigate, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { NavBarTop } from '../components/NavBarTop'
import { MenuBar } from '../components/MenuBar'
import { TrendingBar } from '../components/TrendingBar/TrendingBar'
import { useAuth } from '../contexts/AuthContext'

export const HomePage = () => {

  const { user, isAuthenticated, loading } = useAuth()

  if(loading) return <h1>Loading...</h1>
  if(!loading && !isAuthenticated) return <Navigate to='/login' replace />

  return (
    <div className='home-container'>
      {/* <NavBarTop></NavBarTop> */}
      <div className="home-content container-lg">
        <MenuBar />
        <Outlet />
        <TrendingBar />
      </div>
      <NavBarBottom></NavBarBottom>
    </div> 
  )
}
