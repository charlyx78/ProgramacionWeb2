import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { LoginPage } from './pages/LoginPage'
import { FeedPage } from './pages/FeedPage'
import { SignUpPage } from './pages/SignUpPage'
import { ProfileSettingsPage } from './pages/ProfileSettingsPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { SearchPage } from './pages/SearchPage'
import { CreatePostPage } from './pages/CreatePostPage'

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
        path: '',
        element: <HomePage />,
        children: [
          {
            path: 'create-post',
            element: <CreatePostPage />
          },
          {
            path: 'profile/:username',
            element: <ProfilePage />
          },
          {
            path: 'profile-settings',
            element: <ProfileSettingsPage />
          },
          {
            path: 'feed',
            element: <FeedPage />
          },
          {
            path: 'search',
            element: <SearchPage />
          },
          {
            path: 'notifications',
            element: <NotificationsPage />
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
