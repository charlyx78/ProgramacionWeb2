import React, { useState } from 'react'
import { MenuBarItem } from './MenuBarItem'
import { useAuth } from '../contexts/AuthContext'

export const NavBarBottom = () => {

  const { user: userLogged } = useAuth()

  return (
    <nav className='navbar fixed-bottom navbar-expand-sm bg-body d-lg-none border-top'>
      <div className='container'>
        <ul className='navbar-bottom navbar-nav d-flex flex-row w-100 justify-content-around'>
          <MenuBarItem url='/feed' icon='house'></MenuBarItem>
          <MenuBarItem url='/search' icon='search'></MenuBarItem>
          <MenuBarItem url='/create-post' icon='plus-circle'></MenuBarItem>
          <MenuBarItem url={`/profile/${userLogged.id}`} icon='person'></MenuBarItem>
          <MenuBarItem url='/contacts' icon='chat'></MenuBarItem>
        </ul>
      </div>
    </nav>
  )
}
