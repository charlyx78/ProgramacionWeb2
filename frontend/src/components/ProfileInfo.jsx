import React from 'react'
import { NavLink } from 'react-router-dom'
import { formatDate } from '../logic/formatDate'

export const ProfileInfo = ({ user }) => {
  return (
    <>
      <div className='profile-info-container'>

        <img src={`http://localhost:3000/${user.cover_picture}`} className='w-100 cover-picture' alt='Profile Picture' />
        <div className='profile-into-content w-100'>
          <div className='d-flex justify-content-between align-items-end mb-3'>
            <img src={`http://localhost:3000/${user.picture}`} className='profile-info-image rounded-circle' alt='Profile Picture' />
            <NavLink to='/profile-settings' className='btn btn-outline-light btn-sm'>
              Edit profile
            </NavLink>
          </div>
          <h4 className='mb-0 fw-bold'>{user.name} {user.last_name}</h4>
          <p className='text-muted mb-2'>@{user.username}</p>
          <p className='text-muted mb-2'><i className='bi bi-calendar3 me-2'></i> Joined in {formatDate(user.createdAt)}</p>
          <div className='d-flex gap-3'>
            <p><strong>5k</strong> Following</p>
            <p><strong>5k</strong> Followers</p>
          </div>    
        </div>
      </div>
    </>
  )
}
