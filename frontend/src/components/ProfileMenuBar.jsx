import React, { useState, useEffect } from 'react'
import { UserImage } from './UserImage'
import { useAuth } from '../contexts/AuthContext'

export const ProfileMenuBar = () => {
  
  const { user: userLogged, getUserData } = useAuth()

  return (
    <div className='card mb-4 bg-body-tertiary'>
      <div className="card-body d-flex align-items-center py-2 gap-3">
        <UserImage sourceImage={`http://localhost:3000/${userLogged.picture}`} width='40px' height='40px' />
        <div className='d-flex flex-column align-items-start'>
          <p className='mb-0 fw-semibold'>{userLogged.name} {userLogged.last_name}</p>
          <p className='mb-0 text-lighter text-muted'>@{userLogged.username}</p>       
        </div>
      </div>
    </div>
  )
}
