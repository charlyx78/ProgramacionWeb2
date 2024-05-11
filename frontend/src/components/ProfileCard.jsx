import React, { useState } from 'react'
import { UserImage } from './UserImage'
import { useAuth } from '../contexts/AuthContext'
import { NavLink } from 'react-router-dom'

export const ProfileCard = ({user}) => {

  console.log(user)
  
  const { signOut, user: userLogged } = useAuth()

  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className='position-relative'>
      <NavLink className='card bg-transparent text-decoration-none' data-aos='zoom-in-up' to={`/profile/${user._id}`} onClick={() => setShowDropdown(!showDropdown)}>
        <div className="card-body d-flex align-items-center py-2 gap-3 px-3">
          <UserImage sourceImage={`http://localhost:3000/${user.picture}`} width='40px' height='40px' />
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
}
