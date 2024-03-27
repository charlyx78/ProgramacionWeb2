import React from 'react'
import { ProfileInfo } from '../components/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import { PeageHeader } from '../components/PeageHeader'

export const ProfilePage = () => {
  const navigate = useNavigate()

  return (
    <>
      <main className='account-container'>
        <PeageHeader title='Carlos Ruiz' subtitle='0 posts'></PeageHeader>
        <ProfileInfo />
        <div className='account-content card-body'>
        </div>
      </main>
    </>
  )
}
