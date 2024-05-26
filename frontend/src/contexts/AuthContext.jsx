import { React, createContext, useState, useContext, useEffect } from 'react'
import { loginRequest, registerRequest, getUser, verifyTokenRequest, findFollowRequest, followRequest, unfollowRequest, logoutRequest, updateProfileRequest } from '../api/auth.js'
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

  const [userView, setUserView] = useState(null)

  const [token, setToken] = useState(null)

  const signUp = async(user) => {
    try {
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
      setUser(res.data.user)

      sessionStorage.setItem('jwt', res.data.token)
    } catch (error) {
      if(Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      setErrors([error.response.data.message])
    }
  }
  
  const signOut = async() => {
    try {
      await logoutRequest()
      setIsAuthenticated(false)
      setUser(null)
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
      setUserView(userFound.data)
      return userFound.data
    } catch (error) {
      return setErrors([error.response.data])
    }
  }

  const updateProfile = async(user) => {
    try {
      const updatedProfile = await updateProfileRequest(user)
      return updatedProfile.data
    } catch (error) {
      return setErrors([error.response.data])
    }
  }

  const findFollow = async(userId) => {
    try {
      const res = await findFollowRequest(userId)
      return res.data
    } catch (error) {
      return setErrors([error.response.data])
    }
  }

  const follow = async(userId) => {
    try {
      const res = await followRequest(userId)
      return res.data
    } catch (error) {
      return setErrors([error.response.data])
    }
  }

  const unfollow = async(userId) => {
    try {
      const res = await unfollowRequest(userId)
      return res.data
    } catch (error) {
      return setErrors([error.response.data])
    }
  }

  useEffect(() => {
    async function checkLogin() {
      const cookie = sessionStorage.getItem('jwt')
      if(!cookie) {

        setIsAuthenticated(false)
        setLoading(false)
        return setUser(null)
        
      }
      else {

        try {

          const res = await verifyTokenRequest({
            token: cookie
          })

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
    <AuthContext.Provider value={{ signUp, userView, signOut, user, updateProfile, findFollow, follow, unfollow, isAuthenticated, errors, signIn, getUserData, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
