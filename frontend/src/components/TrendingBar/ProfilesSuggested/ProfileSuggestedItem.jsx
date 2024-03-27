import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserImage } from '../../UserImage'
import reactLogo from '../../../assets/react.svg'

export const ProfileSuggestedItem = ({ user }) => {
  return (
    <NavLink to='/' className='list-group-item border-0 d-flex align-items-center gap-3 px-3'>
      <UserImage sourceImage={reactLogo} width='32px' height='32px' />
      <div className="d-flex flex-column overflow-hidden">
        <p className='fw-bold text-nowrap overflow-hidden m-0'>Carlos Adrian Ruiz Hernandez</p>
        <p className='text-muted text-nowrap overflow-hidden m-0'>@charly78ruiz</p>
      </div>
      <button className='btn btn-sm btn-dark'>Follow</button>
    </NavLink>
  )
}
