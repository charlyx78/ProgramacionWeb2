import React, {useEffect, useState} from 'react'
import { ProfileInfo } from '../components/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import { PeageHeader } from '../components/PeageHeader'
import { useAuth } from '../contexts/AuthContext'
import { useParams } from 'react-router-dom'

export const ProfilePage = () => {

  const navigate = useNavigate()

  const { username } = useParams()

  const { getUserData } = useAuth()

  const [user, setUser] = useState({})

  useEffect(() => {
    async function getUser() {
      const userData = await getUserData(username)
      setUser(userData)
      if(!userData) navigate('/*')
    }
    getUser()
  }, [username])

  return (
    <>
      <main className='account-container'>
        <PeageHeader>
          <div className="flex flex-column">
            <h5 className="m-0">{user.name} {user.last_name}</h5>
            <p className='m-0 text-muted'>@{user.username}</p>
          </div>
        </PeageHeader>
        <ProfileInfo user={user} />
        <div className='account-content card-body'>
        </div>
      </main>
    </>
  )
}
