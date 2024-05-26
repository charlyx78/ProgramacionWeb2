import React, { useEffect, useState } from 'react'
import { ProfileCard } from './ProfileCard'
import { useAuth } from '../contexts/AuthContext'
import { useChat } from '../contexts/ChatContext'
import socketIOClient from 'socket.io-client'
import { ENDPOINT } from '../constants/endpoint'


export const ContactList = () => {

  const { getContacts } = useChat()
  const { getUserData, user: userLogged } = useAuth()

  const [contacts, setContacts] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const idUserContacts = await getContacts()

      const newContacts = await Promise.all(idUserContacts.map(async (idUserContact) => {
        return await getUserData(idUserContact)
      }))

      setContacts(newContacts)

      setLoading(false)
    }

    getData()

    try {
      const socket = socketIOClient(ENDPOINT)
    
      socket.on(`contacts-${userLogged.id}`, async(socketContacts) => {
        console.log(socketContacts.contacts)

        const newContacts = await Promise.all(socketContacts.contacts.map(async (idUserContact) => {
          return await getUserData(idUserContact)
        }))

        setContacts(newContacts)
      })
    
      return () => {
        socket.disconnect()
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  if (!contacts && loading) {
    return (
      <p>Loading...</p>
    )
  } else {
    return (
      <ul className='list-group list-group-flush'>
        {contacts.map((contact, index) => (
          <div className="list-group-item p-0" key={index}>
            <ProfileCard user={contact} isContact></ProfileCard>
          </div>
        ))
        }
      </ul>
    )
  }

}
