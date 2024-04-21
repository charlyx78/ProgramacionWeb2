import { createContext, useState, useContext } from 'react'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  // Intenta recuperar los datos del usuario del almacenamiento local
  const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  const [user, setUser] = useState(storedUser)

  const loginUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const getUser = () => {
    return user
  }

  const logoutUser = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, loginUser, getUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}
