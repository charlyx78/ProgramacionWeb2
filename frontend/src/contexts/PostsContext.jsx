import { React, createContext, useState, useContext } from 'react'
import { createPostRequest, replyPostRequest, likeRequest, getPostResquest, getRepliesRequest, getProfilePostsResquest, getTagsPostsRequest, getFollowedPostsRequest, findLikeRequest } from '../api/posts'

export const PostContext = createContext()

export const usePosts = () => {
  const context = useContext(PostContext)
  if(!context) throw new Error('usePosts must be used with PostProvider')
  return context
}

export const PostProvider = ({ children }) => {
  
  const [errors, setErrors] = useState([])

  const getTagsPosts = async() => {
    try {
      const res = await getTagsPostsRequest()
      return res.data.posts
    } catch (error) {
      setErrors([error.response.data])
    }
  }
  
  const getFollowedPosts = async() => {
    try {
      const res = await getFollowedPostsRequest()
      return res.data.posts
    } catch (error) {
      setErrors([error.response.data])
    }
  }

  const getPost = async(postId) => {
    try {
      const res = await getPostResquest(postId)
      return res.data
    } catch (error) {
      setErrors([error.response.data])
    }
  }
  
  const getProfilePosts = async(userId) => {
    try {
      const res = await getProfilePostsResquest(userId)
      return res.data.posts
    } catch (error) {
      setErrors([error.response.data])
    }
  }

  const createMainPost = async (post) => {
    try {
      const res = await createPostRequest(post)
      return res.data
    } catch(error) {
      setErrors([error.response.data])
    }
  }

  const findLike = async(postId) => {
    try {
      const res = await findLikeRequest(postId)
      return res.data
    } catch (error) {
      return setErrors([error.response.data])
    }
  }

  const like = async (postId) => {
    try {
      const res = await likeRequest(postId)
      return res.data
    } catch(error) {
      setErrors([error.response.data])
    }
  }

  const replyToPost = async (post) => {
    try {
      console.log(post)
      const res = await replyPostRequest(post)
      return res.data
    } catch(error) {
      setErrors([error.response.data])
    }
  }
  
  const getReplies = async(parentId) => {
    try {
      const res = await getRepliesRequest(parentId) 
      return res.data.posts
    } catch (error) {
      setErrors([error.response.data])
    }
  }

  return (
    <PostContext.Provider value={{ getTagsPosts, getFollowedPosts, createMainPost, getProfilePosts, findLike, like, replyToPost, getReplies, getPost, errors }}>
      {children}
    </PostContext.Provider>
  )
}
