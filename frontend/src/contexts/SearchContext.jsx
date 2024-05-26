import React, { useContext, createContext, useState } from 'react'
import { searchPostRequest, searchUserRequest } from '../api/search'

export const SearchContext = createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)
  if(!context) throw new Error('useSearch must be used with SearchProvider')
  return context
}
  
export const SearchProvider = ({ children }) => {
    
  const [errors, setErrors] = useState([])
  
  const searchUser = async(input) => {
    try {
      const res = await searchUserRequest(input)
      return res.data
    } catch (error) {
      setErrors([error.response.data])
    }
  }

  const searchPosts = async(input) => {
    try {
      const res = await searchPostRequest(input)
      return res.data
    } catch (error) {
      setErrors([error.response.data])
    }
  }

  return (
    <SearchContext.Provider value={{ searchUser, searchPosts, errors }}>
      {children}
    </SearchContext.Provider>
  )
}