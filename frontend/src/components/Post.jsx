import { UserImage } from './UserImage'
import { useState } from 'react'
import React, {useEffect} from 'react'
import { IMAGE_FILES_PERMITTED, VIDEO_FILES_PERMITTED } from '../constants/mimeTypes'
import { getTimePassedFromDate } from '../logic/GetTimePassedFromDate'
import { usePosts } from '../contexts/PostsContext'
import { NavLink } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import { ENDPOINT } from '../constants/endpoint'
import error404 from '../assets/error404.png'


export const Post = ({ post: postView, isReply = false }) => {

  const { like, findLike } = usePosts()

  const [hasLike, setHasLike] = useState(false)
  
  const [post, setPost] = useState(postView)

  const [showCompleteText, setShowCompleteText] = useState(false)

  const handleLike = async() => {
    await like(post._id)
  }

  useEffect(() => {
    async function getHasLike() {
      const hasLikeSearch = await findLike(post._id) 
      hasLikeSearch.message ? setHasLike(true) : setHasLike(false)
    }

    getHasLike()

    try {
      const socket = socketIOClient(ENDPOINT)
    
      socket.on(`add-like-${post._id}`, updatedPost => {
        setPost(updatedPost)
        getHasLike()
      })
      socket.on(`add-comment-${post._id}`, updatedPost => {
        setPost(updatedPost)
        getHasLike()
      })
    
      return () => {
        socket.disconnect()
      }
    } catch (error) {
      console.log(error)
    }
  }, [])


  return (
    <div className="card bg-body-tertiary post-container border-0 rounded" data-aos='zoom-in-up'>
      <div className="card-header d-flex align-items-center gap-3 bg-body-tertiary border-0">
        <UserImage sourceImage={`${ENDPOINT}/${post.user.picture}`} width='36px' height='36px' />
        <div className="d-flex flex-column">
          <NavLink to={`/profile/${post.user._id}`} className='m-0 fw-bold text-break text-decoration-none text-body' title='Carlos Adrian Ruiz Hernandez'>{post.user.name} {post.user.lastname}</NavLink>
          <p className='m-0 text-muted fw-light text-nowrap post-username'>@{post.user.username}</p>
        </div>
        <p className='ms-auto text-muted fw-light d-flex align-items-center gap-2'>
          <i className='bi bi-clock'></i> 
          <span>{getTimePassedFromDate(post.createdAt).value}{getTimePassedFromDate(post.createdAt).unit}</span>
        </p>
      </div>
      <div className="card-body py-0">
        <p className='m-0'>
          {showCompleteText ? post.content : post.content.substring(0, 250)}
          {post.content.length > 250 && (
            <a className='text-primary ms-2' onClick={() => { setShowCompleteText(!showCompleteText) }}>
            Show {showCompleteText ? 'Less' : 'More'}
            </a>
          )}
        </p>    

        <div className='threadPoster-filePreview-container mt-3'>
          {IMAGE_FILES_PERMITTED.includes(post.attachmentType) && (
            <img src={`${ENDPOINT}/${post.attachment}`} alt='File post' className='threadPoster-filePreview rounded border'
              onError={(e) => {
                e.target.src = error404
              }} 
            />
          )}
          {VIDEO_FILES_PERMITTED.includes(post.attachmentType) && (
            <video src={`${ENDPOINT}/${post.attachment}`} alt='File post' controls autoPlay loop className='threadPoster-filePreview rounded border' />
          )}
        </div>

      </div>
      <div className="card-footer bg-body-tertiary border-0">
        <div className="d-flex gap-4 post-buttons-container">
          <button className='post-button' title='Like'><i className={`bi ${hasLike ? 'bi-heart-fill text-danger' : 'bi-heart'}`} onClick={handleLike}></i> {post.likes}</button>
          {!isReply && (
            <NavLink to={`/post/${post._id}`} className='post-button text-decoration-none' title='Comments'>
              <i className='bi bi-chat'></i> {post.comments}
            </NavLink>
          )}
          <button className='post-button' title='Shared'><i className='bi bi-share'></i> {post.shareds}</button>
          <section className="d-none d-md-flex gap-4">
          </section>
        </div>
      </div>
    </div>
  )
}
