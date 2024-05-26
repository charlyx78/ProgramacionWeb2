import { React, createContext, useState, useContext } from 'react'
import { getContactsRequest, getMessagesRequest, sendMessageRequest } from '../api/chat.js'

export const ChatContext = createContext()

export const useChat = () => {
  const context = useContext(ChatContext)
  if(!context) throw new Error('useChat must be used with AuthProvider')
  return context
}

export const ChatProvider = ({ children }) => {

  const [errors, setErrors] = useState([])

  const sendMessage = async(message) => {
    try {
      const res = await sendMessageRequest(message)
      return res.data
    } catch (error) {
      return setErrors([error.response.data])
    }
  }

  const getMessages = async(userId) => {
    try {
      const res = await getMessagesRequest(userId)
      return res.data.messages
    } catch (error) {
      return setErrors([error.response.data])
    }
  }

  const getContacts = async() => {
    try {
      const res = await getContactsRequest()
      return res.data.contacts
    } catch (error) {
      return setErrors([error.response.data])
    }
  }

  return (
    <ChatContext.Provider value={{ sendMessage, getMessages, getContacts, errors }}>
      {children}
    </ChatContext.Provider>
  )
}