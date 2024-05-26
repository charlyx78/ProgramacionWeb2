import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import socketIOClient from 'socket.io-client'
import { ENDPOINT } from '../constants/endpoint'

export const FollowButton = ({ user, setFollowers = null }) => {

  const { findFollow, follow, unfollow, user: userLogged } = useAuth()

  const [hasFollow, setHasFollow] = useState()

  useEffect(() => {
    async function findFollowUser() {
      if(user && user.id) {
        const hasFollowUser = await findFollow(user.id)
        hasFollowUser.message ? setHasFollow(true) : setHasFollow(false)
      }
    }
  
    findFollowUser()

    try {
      const socket = socketIOClient(ENDPOINT)
      
      socket.on(`has-follow-${user.id}`, userFollowers => {
        setFollowers ? setFollowers(userFollowers) : ''
      }) 
      
      return () => {
        socket.disconnect()
      }
    } catch (error) {
      console.log(error)
    }
  }, [user])

  const followUser = async() => {
    await follow(user.id)
    toast.success('Following user')
    setHasFollow(true)
  }
  const unfollowUser = async() => {
    await unfollow(user.id)
    toast.success('User unfollowed')
    setHasFollow(false)
  }

  if (!user) {
    return <div>Loading...</div> // Mostrar un mensaje de carga si user no está definido
  }

  return (
    <>
      {
        user.id === userLogged.id ? (
          <NavLink to={'/profile-settings'} className='btn btn-outline-light btn-sm'>
                  Edit profile
          </NavLink>
        ) : (
          !hasFollow == true ? (
            <button className='btn btn-outline-light btn-sm' onClick={followUser}>
                    Follow
            </button>
          ) : (
            <div className='d-flex gap-3'>
              <NavLink className='btn btn-outline-primary' to={`/chat/${user.id}`}>
                Message
              </NavLink>
              <button className='btn btn-outline-primary' onClick={unfollowUser}>
                    Following <i className='bi bi-check text-success'></i>
              </button>
            </div>
          )
        )
      }
    </>
  )
}
