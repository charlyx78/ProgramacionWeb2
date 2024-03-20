import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { LoginPage } from './pages/LoginPage'
import { FeedPage } from './pages/FeedPage'
import { SignUpPage } from './pages/SignUpPage'
import { CreatePost } from './pages/CreatePost'

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <SignUpPage />
      },
      {
        path: 'create-post',
        element: <CreatePost />
      },
      {
        path: '',
        element: <HomePage />,
        children: [
          {
            path: 'profile',
            element: <ProfilePage />
          },
          {
            path: 'feed',
            element: <FeedPage />
          }
        ]
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
])
