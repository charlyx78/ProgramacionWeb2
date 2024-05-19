import React, { useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { useForm } from 'react-hook-form'
import { useSearch } from '../contexts/SearchContext'
import { Post } from '../components/Post'
import toast from 'react-hot-toast'
import { ProfileCard } from '../components/ProfileCard'

export const SearchPage = () => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  const [showPage, setShowPage] = useState(false)

  const [searchResultsUser, setSearchResultsUser] = useState([])
  const [searchResultsPost, setSearchResultsPost] = useState([])

  const [noUsers, setNoUsers] = useState(false)
  const [noPosts, setNoPosts] = useState(false)

  const [loading, setLoading] = useState(false)

  const { searchUser, searchPosts } = useSearch()

  const onSubmit = handleSubmit(async (values) => {   
    if(values.searchInput != '') {
      setLoading(true)
      
      const users = await searchUser(values)
      users.length == 0 ? setNoUsers(true) : setNoUsers(false)
      setSearchResultsUser(users)
      
      const posts = await searchPosts(values)
      posts.length == 0 ? setNoPosts(true) : setNoPosts(false)
      setSearchResultsPost(posts)

      setLoading(false)
      setShowPage(true)
    } else {
      toast.error('Search cannot be empty')
    }
  })

  return (
    <main className="search-container">
      <PageHeader showBackButton='false'>
        <form onSubmit={onSubmit} className='w-100'>
          <input 
            name='searchInput'
            {...register('searchInput')}
            autoComplete='off' 
            type="text" 
            className='form-control search-input bg-body rounded-pill w-100 py-2 position-relative px-3' 
            placeholder='Search' 
          />
        </form>
      </PageHeader>

      {loading && (
        <h5 className='text-center py-2'>Loading...</h5>
      )}

      {showPage && (
        <section className="search-content container-fluid position-relative padding-top-content py-3">
          <div className='card border-0 bg-body-tertiary mb-3'>
            <div className='card-body'>
              <h5 className='mb-0 text-center'>Users</h5>
            </div>
          </div>
          {noUsers && (
            <p className='text-center mb-0'>No results available</p>    
          )}
          <div className="d-flex flex-column gap-3">
            {searchResultsUser.map((user) => {
              return (
                <ProfileCard key={user._id} user={user}>
                </ProfileCard>
              )
            })}
          </div>
          <hr />
          <div className='card border-0 bg-body-tertiary mb-3'>
            <div className='card-body'>
              <h5 className='mb-0 text-center'>Posts</h5>
            </div>
          </div>    
          {noPosts && (
            <p className='text-center mb-0'>No results available</p>    
          )}
          <div className="d-flex flex-column gap-3">
            {searchResultsPost.map((post) => {
              return (
                <Post post={post} key={post._id}></Post>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}
