import React, { useEffect, useState } from 'react'
import { formatDate } from '../logic/formatDate'
import gray from '../assets/gray.png'
import avatar from '../assets/avatar.svg'
import { FollowButton } from './FollowButton'

export const ProfileInfo = ({ user: userView }) => {  

  const [followers, setFollowers] = useState(0)

  useEffect(() => {
    setFollowers(userView.followers)
  }, [userView])

  return (
    <>
      <div className='profile-info-container'>

        <img src={userView.cover_picture != '' ? `http://localhost:3000/${userView.cover_picture}` : gray} className='w-100 cover-picture' alt='Profile Picture' />
        <div className='profile-into-content w-100'>
          <div className='d-flex justify-content-between align-items-end mb-3'>
            <img src={userView.picture != '' ? `http://localhost:3000/${userView.picture}` : avatar} className='profile-info-image rounded-circle' alt='Profile Picture' />
            <FollowButton user={userView} setFollowers={setFollowers}></FollowButton>
          </div>
          <h4 className='mb-0 fw-bold'>{userView.name} {userView.last_name}</h4>
          <p className='text-muted mb-2'>@{userView.username}</p>
          <p className='text-muted mb-2'><i className='bi bi-calendar3 me-2'></i> Joined in {formatDate(userView.createdAt)}</p>
          <p>{userView.biography}</p>
          <div className='d-flex gap-3'>
            <p className='mb-0'><strong>{userView.following}</strong> Following</p>
            <p className='mb-0'><strong>{followers}</strong> Followers</p>
          </div>
        </div>
      </div>
    </>
  )
}
