import React from 'react'
import { ProfileInfo } from '../components/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import { PeageHeader } from '../components/PeageHeader'

export const ProfilePage = () => {
  const navigate = useNavigate()

  return (
    <>
      <main className='account-container'>
        <PeageHeader>
          <div className="flex flex-column">
            <h5 className="m-0">Carlos Ruiz</h5>
            <p className='m-0 text-muted'>@charly78ruiz</p>
          </div>
        </PeageHeader>
        <ProfileInfo />
        <div className='account-content card-body'>
        </div>
      </main>
    </>
  )
}
