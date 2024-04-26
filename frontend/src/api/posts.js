import axios from './axios.js'

export const getPosts = () => axios.get('/posts') 

export const createPost = (post) => axios.post('/posts', post, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}) 

export const replyPost = (post) => axios.post(`/posts/${post.id}`, post, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}) 