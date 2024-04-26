import { UserImage } from './UserImage'
import { useEffect, useState } from 'react'
import React from 'react'
import { formatDate } from '../logic/formatDate'
import { useAuth } from '../contexts/AuthContext'

export const Post = ({ post }) => {
   
  const [user, setUser] = useState({})
  
  const { getUserData } = useAuth()
  
  const [showCompleteText, setShowCompleteText] = useState(false)
  
  useEffect(() => {
    async function getUser() {
      const userFound = await getUserData({ id: post.user })
      setUser(userFound)
    }
    getUser()
    
  }, [post.user])

  return (
    <div className="card post-container border-0 border-top border-bottom rounded-0">
      <div className="card-header d-flex align-items-center gap-3 bg-body border-0">
        <UserImage sourceImage={`http://localhost:3000/${user.picture}`} width='36px' height='36px' />
        <div className="d-flex flex-column">
          <p className='m-0 fw-bold text-break' title='Carlos Adrian Ruiz Hernandez'>{user.name} {user.lastname}</p>
          <p className='m-0 text-muted fw-light text-nowrap post-username'>@{user.username}</p>
        </div>
        <p className='ms-auto text-muted fw-light m-0'>{formatDate(post.createdAt)}</p>
      </div>
      <div className="card-body py-2">
        <p className='m-0'>
          {showCompleteText ? post.content : post.content.substring(0, 250)}
          {post.content.length > 250 && (
            <a className='text-primary ms-2' onClick={() => { setShowCompleteText(!showCompleteText) }}>
            Show {showCompleteText ? 'Less' : 'More'}
            </a>
          )}
        </p>    

        {/* <div className='threadPoster-filePreview-container mt-3'>
    <img src={reactLogo} alt='File post' className='threadPoster-filePreview rounded border' />
  </div> */}

      </div>
      <div className="card-footer bg-body border-0">
        <div className="d-flex gap-4 post-buttons-container">
          <button className='post-button' title='Like'><i className='bi bi-heart'></i> {post.likes}</button>
          <button className='post-button' title='Comments'><i className='bi bi-chat'></i> {post.comments}</button>
          <button className='post-button' title='Shared'><i className='bi bi-share'></i> {post.shareds}</button>
          {/* <button className='post-button' title='Saved'><i className='bi bi-bookmark'></i> 112</button>   */}
          <section className="d-none d-md-flex gap-4">
            {/* <button className='post-button' title='Seen'><i className='bi bi-bar-chart'></i> 112</button>  
      <button className='post-button' title='Sended'><i className='bi bi-send'></i></button> */}
          </section>
        </div>
      </div>
    </div>
  )
}
