import axios from './axios.js'

export const registerRequest = (user) => axios.post('/register', user, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export const loginRequest = (user) => axios.post('/login', user)

export const verifyTokenRequest = () => axios.get('/verify')

export const getUser = (id) => axios.get(`/profile/${id}`)