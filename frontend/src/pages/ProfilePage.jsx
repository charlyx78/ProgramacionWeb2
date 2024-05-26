import React, {useEffect, useState} from 'react'
import { ProfileInfo } from '../components/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { useAuth } from '../contexts/AuthContext'
import { useParams } from 'react-router-dom'
import { usePosts } from '../contexts/PostsContext'
import { Post } from '../components/Post'

export const ProfilePage = () => {

  const navigate = useNavigate()

  const { userId } = useParams()

  const [loading, setLoading] = useState(true)

  const { getUserData } = useAuth()

  const { getProfilePosts } = usePosts()

  const [user, setUser] = useState({})

  const [posts, setPosts] = useState([])

  useEffect(() => {

    async function getUser() {
      const userData = await getUserData(userId)
      setUser(userData)
      if(!userData) navigate('/*')
    }

    async function getPosts() {
      const postsData = await getProfilePosts(userId)
      setPosts(postsData)
    }
    
    getUser()
    
    getPosts()

    setLoading(false)

  }, [userId])

  if(loading) {
    return <p>Loading...</p>
  } else {
    return (
      <>
        <main className='account-container'>
          <PageHeader>
            <div className="flex flex-column">
              <h5 className="m-0">{user.name} {user.last_name}</h5>
              <p className='m-0 text-muted'>@{user.username}</p>
            </div>
          </PageHeader>
          <ProfileInfo user={user} />
          <hr />
          <div className="card bg-body-tertiary border-0 mb-4">
            <div className="card-body">
              <h5 className='m-0 text-center'>Posts</h5>
            </div>
          </div>
          <div className='account-content d-flex flex-column gap-3'>
            {
              posts.map((post, index) => (
                <Post post={post} key={index}></Post>
              ))
            }
          </div>
        </main>
      </>
    )
  }

}
