import { React, createContext, useState, useContext, useEffect } from 'react'
import { createPost, replyPost } from '../api/posts'

export const PostContext = createContext()

export const usePosts = () => {
  const context = useContext(PostContext)
  if(!context) throw new Error('usePosts must be used with PostProvider')
  return context
}

export const PostProvider = ({ children }) => {
  
  const [errors, setErrors] = useState([])

  const createMainPost = async (post) => {
    try {
      console.log(post)
      const res = await createPost(post)
      return res.data
    } catch(error) {
      setErrors([error.response.data])
    }
  }

  const replyToPost = async (post) => {
    try {
      const res = await replyPost(post)
      return res.data
    } catch(error) {
      setErrors([error.response.data])
    }
  }

  const createThread = async (posts) => {
    try {
      console.log(posts)
      if(posts.length > 1) {
        
        const mainPost = await createMainPost(posts[0])
        console.log(mainPost)
        let i = 1
        let parentId = mainPost.post.id

        while(i < posts.length) {
          const repliedPost = await replyPost({
            id: parentId,
            content: posts[i].content,
            attachment: posts[i].attachment
          })
          parentId = repliedPost.data.reply.id
          i++
        }
        return mainPost
      }
      else {
        return 'Unable to create thread, more than 1 post is required'
      }
    } catch (error) {
      console.log(error)
      setErrors([error.response.data])
    }
  }

  return (
    <PostContext.Provider value={{ createMainPost, createThread, replyToPost, errors }}>
      {children}
    </PostContext.Provider>
  )
}
