import { React, createContext, useState, useContext, useEffect } from 'react'
import { loginRequest, registerRequest, getUser, verifyTokenRequest } from '../api/auth.js'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) throw new Error('useAuth must be used with AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null)
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const [errors, setErrors] = useState([])

  const [loading, setLoading] = useState(true)

  const signUp = async(user) => {
    try {
      console.log(user)
      const res = await registerRequest(user)
      setUser(res.data.user)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors([error.response.data])
    }
  }

  const signIn = async(user) => {
    try {
      const res = await loginRequest(user)
      setIsAuthenticated(true)
      console.log(res.data.user)
      setUser(res.data.user)
    } catch (error) {
      if(Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      setErrors([error.response.data.message])
    }
  }

  const getUserData = async(userId) => {
    try {
      const userFound = await getUser(userId) 
      return userFound.data
    } catch (error) {
      console.log(error)
      return setErrors([error.response.data])
    }
  }

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get()
      if(!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return setUser(null)
      }
      else {
        try {
          const res = await verifyTokenRequest(cookies.token)
          if(!res.data) {
            setIsAuthenticated(false)
            setLoading(false)
            return
          }
          setIsAuthenticated(true)
          setUser(res.data)
          setLoading(false)
        } catch (error) {
          setIsAuthenticated(false)
          setUser(null)
          setLoading(false)
        }
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider value={{ signUp, user, isAuthenticated, errors, signIn, getUserData, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
