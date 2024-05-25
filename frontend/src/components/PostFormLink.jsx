import React from 'react'
import { UserImage } from './UserImage'
import { useAuth } from '../contexts/AuthContext'
import { NavLink } from 'react-router-dom'
import { ENDPOINT } from '../constants/endpoint'

export const PostFormLink = () => {

  const { user: userLogged } = useAuth()

  return (
    <div className="card border-0 bg-body-tertiary">
      <div className="card-body d-flex gap-3 align-items-center">
        <UserImage sourceImage={`${ENDPOINT}/${userLogged.picture}`}></UserImage>
        <NavLink to='/create-post' className='btn bg-body-secondary w-100 text-start py-2 rounded-pill'>What is happening, {userLogged.name}?</NavLink>
      </div>
    </div>
  )
}
