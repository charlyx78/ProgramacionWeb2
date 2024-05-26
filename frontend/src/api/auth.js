import axios from './axios.js'

export const registerRequest = (user) => axios.post('/register', user, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export const loginRequest = (user) => axios.post('/login', user)

export const logoutRequest = () => axios.post('/logout')

export const findFollowRequest = (userId) => axios.get(`/find-follow/${userId}`)
export const followRequest = (userId) => axios.post(`/follow/${userId}`)
export const unfollowRequest = (userId) => axios.post(`/unfollow/${userId}`)

export const verifyTokenRequest = (token) => axios.post('/verify', token)

export const getUser = (id) => axios.get(`/profile/${id}`)

export const updateProfileRequest = (user) => axios.put('/profile', user, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})