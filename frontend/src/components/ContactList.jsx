import React from 'react'
import { ProfileCard } from './ProfileCard'
import { useAuth } from '../contexts/AuthContext'

export const ContactList = () => {

  const { user: userLogged } = useAuth()


  return (
    <ul className='list-group'>
      {/* <ProfileCard user={}></ProfileCard> */}
    </ul>
  )
}
