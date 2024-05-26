import React, { useEffect, useState } from 'react'
import { Post } from '../components/Post'
import { useParams } from 'react-router-dom'
import { usePosts } from '../contexts/PostsContext'
import { PostForm } from '../components/PostForm'
import { PageHeader } from '../components/PageHeader'
import { useNavigate } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import { ENDPOINT } from '../constants/endpoint'

export const PostPage = () => {

  const navigate = useNavigate()

  const { postId } = useParams()

  const { getPost, getReplies, errors: postErrors } = usePosts()

  const [replies, setReplies] = useState([])

  const [loading, setLoading] = useState(true)

  const [post, setPost] = useState()

  useEffect(() => {
    async function getPostById() {
      const newPost = await getPost(postId)
      setPost(newPost)

      const newReplies = await getReplies(postId)
      setReplies(newReplies)
        
      setLoading(false)
    }

    getPostById()

  }, [postId])

  useEffect(() => {
    try {
      const socket = socketIOClient(ENDPOINT)
    
      socket.on(`reply-post-${postId}`, updatedReplies => {
        setReplies(updatedReplies)
      })
    
      return () => {
        socket.disconnect()
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    postErrors.map((error, i) => {
      console.log(error)
    })
  }, [postErrors])

  if (loading) {
    return <p>Loading post...</p>
  } else {
    if(post) {
      return (
        <>
          <main>
            <PageHeader>
              <h5 className='m-0'>Post</h5>
            </PageHeader>
            <Post post={post}></Post>
            <br />
            <PostForm isReplying idPostRelying={post._id}></PostForm>
            <br />
            <div className="section post-replies d-flex flex-column gap-3 pb-5">
              {replies.map((reply, index) => {
                return (
                  <Post post={reply} isReply key={index}></Post>
                )
              })}
            </div>
          </main>
        </>
      )
    } else {
      return navigate('/*')
    }
  }



}
