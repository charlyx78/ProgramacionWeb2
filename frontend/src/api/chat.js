import axios from './axios.js'

export const sendMessageRequest = (message) => axios.post(`/message/${message.receiver}`, message)

export const getMessagesRequest = (userId) => axios.get(`/message/${userId}`)

export const getContactsRequest = () => axios.get('/contacts')


