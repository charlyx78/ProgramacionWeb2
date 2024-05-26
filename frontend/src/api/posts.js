import axios from './axios.js'

export const getTagsPostsRequest = () => axios.get('/posts-tags') 

export const getFollowedPostsRequest = () => axios.get('/posts-followed') 

export const getPostResquest = (postId) => axios.get(`/posts/${postId}`) 

export const getProfilePostsResquest = (userId) => axios.get(`/profile-posts/${userId}`) 

export const getRepliesRequest = (parentId) => axios.get(`/posts/replies/${parentId}`) 

export const createPostRequest = (post) => axios.post('/posts', post, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}) 

export const likeRequest = (postId) => axios.post(`/posts/like/${postId}`)

export const findLikeRequest = (postId) => axios.get(`/posts/find-like/${postId}`)

export const replyPostRequest = (post) => axios.post(`/posts/${post.id}`, post, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}) 