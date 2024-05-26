import React, { useEffect, useState } from 'react'
import { ProfileCard } from './ProfileCard'
import { useAuth } from '../contexts/AuthContext'
import { useChat } from '../contexts/ChatContext'

export const ContactList = () => {

  const  { getContacts } = useChat()

  const [contacts, setContacts] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const data = await getContacts()
      if (data) {
        setLoading(false)
        setContacts(data)
      }
    }

    getData()
  }, [])

  if (!contacts && loading) {
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
