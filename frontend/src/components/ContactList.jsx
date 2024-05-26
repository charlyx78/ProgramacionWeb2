import React, { useEffect, useState } from 'react'
import { ProfileCard } from './ProfileCard'
import { useAuth } from '../contexts/AuthContext'

export const ContactList = () => {

  const { user: userLogged, getUserData } = useAuth()

  const [user, setUSer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const data = await getUserData(userLogged.id)
      if (data) {
        setLoading(false)
        setUSer(data)
      }
    }

    getData()
  }, [userLogged])

  if (!user && loading) {
    return (
      <p>Loading...</p>
    )
  } else {
    return (
      <ul className='list-group'>
        {
            
        }
        {/* <ProfileCard user={}></ProfileCard> */}
      </ul>
    )
  }

}
