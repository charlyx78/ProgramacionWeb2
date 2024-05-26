import React from 'react'
import { MenuBarItem } from './MenuBarItem'
import { NavLink } from 'react-router-dom'
import { ProfileCard } from './ProfileCard'
import { useAuth } from '../contexts/AuthContext'

export const MenuBar = () => {

  const { user: userLogged } = useAuth()

  return (
    <div className="menubar-container list-group list-group-flush d-none d-lg-block min-vh-100">
      <div className="menubar-content position-sticky pe-3">
        <div className='mb-3 ps-3 logo fs-3'><i className="bi bi-dice-6-fill"></i><span className='ms-3'>dice</span></div>
        <MenuBarItem url='/feed' icon='house'>Feed</MenuBarItem>
        <MenuBarItem url='/search' icon='search'>Search</MenuBarItem>
        <MenuBarItem url={`/profile/${userLogged._id}`} icon='person'>Profile</MenuBarItem>
        <MenuBarItem url='/contacts' icon='chat'>Chats</MenuBarItem>
        <NavLink to='create-post' className='btn btn-primary mt-4 ms-3'>Create Post</NavLink>
        <hr className='ms-3' />
        <div className="ps-3">
          <ProfileCard user={userLogged}></ProfileCard>
        </div>
      </div>
    </div>
  )
}
