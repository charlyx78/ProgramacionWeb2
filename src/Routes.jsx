import { Navigate, createBrowserRouter } from 'react-router-dom'

import App from './App'
import { HomePage } from './pages/HomePage'
import { AccountPage } from './pages/AccountPage'
import { NotFoundPage } from './pages/NotFoundPage'

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'Home',
        element: <HomePage />
      },
      {
        path: 'Account',
        element: <AccountPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
])
