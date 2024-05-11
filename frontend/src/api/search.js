import axios from './axios.js'

export const searchUserRequest = (input) => axios.post('/search-user', input)
export const searchPostRequest = (input) => axios.post('/search-post', input)


