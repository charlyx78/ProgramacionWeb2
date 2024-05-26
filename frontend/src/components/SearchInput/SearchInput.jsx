import React, { useState } from 'react'
import { ListResults } from './ListResults/ListResults'
import { useForm } from 'react-hook-form'
import { useSearch } from '../../contexts/SearchContext'

export const SearchInput = () => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  const [searchString, setSearchString] = useState('')

  const [searchResultsUser, setSearchResultsUser] = useState([])
  const [searchResultsPost, setSearchResultsPost] = useState([])

  const { searchUser, searchPosts } = useSearch()

  const onSubmit = handleSubmit(async (values) => {   
    const users = await searchUser(values)
    setSearchResultsUser(users)
    const posts = await searchPosts(values)
    setSearchResultsPost(posts)
  })

  return (
    <div className='w-100'>
      <form onSubmit={onSubmit}>
        <input 
          name='searchInput'
          {...register('searchInput')}
          onChange={(e) => {setSearchString(e.target.value)}}
          value={searchString}
          autoComplete='off' 
          type="text" 
          className='form-control search-input bg-body rounded-pill w-100 py-2 position-relative px-3' 
          placeholder='Search' 
        />
      </form>
    </div>
  )
}
