import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { PageHeader } from '../components/PageHeader'
import { MessageForm } from '../components/MessageForm'
import { useChat } from '../contexts/ChatContext'
import { formatDate } from '../logic/formatDate'
import socketIOClient from 'socket.io-client'
import {ENDPOINT} from '../constants/endpoint'

export const ChatPage = () => {

  const messageContainerRef = useRef(null)

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }

  const { userId } = useParams()

  const [messagesLoader, setMessagesLoader] = useState(true)

  const [user, setUser] = useState(null)

  const [messages, setMessages] = useState(new Array())
  
  const { getUserData, user: userLogged } = useAuth()

  const { getMessages } = useChat()

  useEffect(() => {
    const getUser = async () => {
      const userData = await getUserData(userId)
      setUser(userData)
    }
    getUser()
  }, [userId])

  useEffect(() => {
    if (!user) return

    const getChat = async () => {
      const newMessages = await getMessages(user.id)
      newMessages ? setMessages(newMessages) : setMessages([])
      
      setMessagesLoader(false)
    }

    getChat()
  }, [user])

  useEffect(() => {
    if (!userLogged || !user) return

    const socket = socketIOClient(ENDPOINT)
    const roomId = [userLogged.id, user.id].sort().join('-')

    socket.emit('joinRoom', { userId1: userLogged.id, userId2: user.id })

    socket.on('updateMessages', (newMessages) => {
      setMessages(newMessages)
      setMessagesLoader(false)
    })

    return () => {
      socket.emit('leaveRoom', roomId)
      socket.off('updateMessages')
      socket.disconnect()
    }
  }, [user, userLogged])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      {(!user || !userLogged) ? (
        <p>Loading...</p>
      ) : (
        <main className='clearfix'>
          <header className='float-start w-100'>
            <PageHeader>
              <h5 className="m-0">@{user.username}</h5>
            </PageHeader>
          </header>

          <section className="d-flex flex-column gap-3 py-3 w-100 container-fluid messages-container" ref={messageContainerRef}>
            {messagesLoader ? (
              <p>Loading...</p>
            ) : messages.length === 0 ? (
              <p className='text-center py-3'>Messages not found, start a conversation with {user.name}!</p>
            ) : (
              messages.map((message, index) => (
                <div className={message.sender._id === userLogged.id ? 'd-flex flex-column gap-2 align-items-end' : 'd-flex flex-column gap-2 align-items-start'} key={message._id}>
                  <div className={message.sender._id === userLogged.id ? 'card bg-primary border-0 message-container' : 'card bg-secondary message-container'}>
                    <div className="card-body py-2">
                      {message.content}
                    </div>
                  </div>
                  <p className='m-0 fw-light message-date'>{formatDate(message.createdAt)}</p>
                </div>
              ))
            )}
          </section>

          <footer className='float-end w-100'>
            <MessageForm receiver={user.id} />
          </footer>
        </main>
      )}
    </>
  )
}
