import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Routes } from './Routes'
import { AuthProvider } from './contexts/AuthContext'
import { PostProvider } from './contexts/PostsContext'
import { SearchProvider } from './contexts/SearchContext'
import { ChatProvider } from './contexts/ChatContext'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './styles/main.scss'
import 'aos/dist/aos.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PostProvider>
        <ChatProvider>
          <SearchProvider>
            <RouterProvider router={Routes} />
          </SearchProvider>
        </ChatProvider>
      </PostProvider>
    </AuthProvider>
  </React.StrictMode>
)
