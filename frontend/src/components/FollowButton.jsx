import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import socketIOClient from 'socket.io-client'
import { ENDPOINT } from '../constants/endpoint'

export const FollowButton = ({ user: userView, setFollowers = null }) => {

  const { findFollow, follow, unfollow, user: userLogged } = useAuth()

  const [hasFollow, setHasFollow] = useState()

  useEffect(() => {
    async function findFollowUser() {
      const hasFollowUser = await findFollow(userView.id)
      hasFollowUser ? setHasFollow(true) : setHasFollow(false)
    }
  
    findFollowUser()
  
    try {
      const socket = socketIOClient(ENDPOINT)
      
      socket.on(`has-follow-${userView.id}`, userFollowers => {
        setFollowers ? setFollowers(userFollowers) : ''
        findFollowUser()
      }) 
      
      return () => {
        socket.disconnect()
      }
    } catch (error) {
      console.log(error)
    }
  }, [userView])

  const followUser = async() => {
    await follow(userView.id)
    toast.success('Following user')
    setHasFollow(true)
  }
  const unfollowUser = async() => {
    await unfollow(userView.id)
    toast.success('User unfollowed')
    setHasFollow(false)
  }

  return (
    <>
      {
        userView.id === userLogged._id ? (
          <NavLink to={'/profile-settings'} className='btn btn-outline-light btn-sm'>
                  Edit profile
          </NavLink>
        ) : (
          hasFollow == true ? (
            <button className='btn btn-outline-light btn-sm' onClick={followUser}>
                    Follow
            </button>
          ) : (
            <button className='btn btn-outline-primary' onClick={unfollowUser}>
                    Following <i className='bi bi-check text-success'></i>
            </button>
          )
        )
      }
    </>
  )
}
