import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserImage } from './UserImage'
import reactLogo from '../assets/react.svg'

export const NotificationItem = () => {
  return (
    <NavLink to='/' className='list-group-item py-4 d-flex gap-3 align-items-start'>
      <UserImage sourceImage={reactLogo} width='36px' height='36px'></UserImage>
      <p className='m-0'><strong>charly78ruiz</strong> and <strong>852</strong> other persons has shared your post</p>
    </NavLink>
  )
}
