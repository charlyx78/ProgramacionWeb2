import React, { useEffect, useState } from 'react'
import { UserImage } from './UserImage'
import { useAuth } from '../contexts/AuthContext'
import { NavLink } from 'react-router-dom'
import { ENDPOINT } from '../constants/endpoint'

export const ProfileCard = ({user}) => {

  const { signOut, user: userLogged } = useAuth()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [user])

  const [showDropdown, setShowDropdown] = useState(false)

  if(user && !loading) {
    return (
      <div className='position-relative'>
        <NavLink className='card bg-transparent text-decoration-none' to={`/profile/${user && user._id ? user._id : user.id}`} onClick={() => setShowDropdown(!showDropdown)}>
          <div className="card-body d-flex align-items-center py-2 gap-3 px-3">
            <UserImage sourceImage={`${ENDPOINT}/${user.picture}`} width='40px' height='40px' />
            <div className='d-flex flex-column align-items-start'>
              <p className='mb-0 fw-semibold'>{user.name} {user.last_name}</p>
              <p className='mb-0 text-lighter text-muted'>@{user.username}</p>       
            </div>
          </div>
        </NavLink>
        {
          user.id == userLogged.id && showDropdown && (
            <div className="card position-absolute end-0 top-100">
              <div className="card-body p-1">
                <button onClick={signOut} className='btn text-danger'>Log out</button>
              </div>
            </div>
          )
        }
      </div>
    )
  } else {
    return (
      <p>Loading...</p>
    )
  }
}
