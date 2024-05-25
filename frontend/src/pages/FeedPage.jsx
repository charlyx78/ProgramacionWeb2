import React from 'react'
import { useEffect, useState } from 'react'
import { PostFormLink } from '../components/PostFormLink'
import { Post } from '../components/Post'
import { usePosts } from '../contexts/PostsContext'

export const FeedPage = () => {

  const { getTagsPosts, getFollowedPosts } = usePosts()

  const [loading, setLoading] = useState(true)

  const [postsFeed, setPostsFeed] = useState([])
  const [postsFeedRealTime, setPostsFeedRealTime] = useState([])
  
  useEffect(() => {
    const getPosts = async () => {
      const postsTags = await getTagsPosts()
      const followedPosts = await getFollowedPosts()

      const mergedPosts = [...postsTags, ...followedPosts]

      const uniquePosts = mergedPosts.filter((post, index, self) =>
        index === self.findIndex((p) => p._id === post._id)
      )
      
      setPostsFeed(uniquePosts)
    }

    getPosts()

    setLoading(false)
  }, [getTagsPosts, getFollowedPosts])

  if(loading) {
    return <p>Loading...</p>
  } else {
    return (
      <main className='bg-body-primary'>
        <div className='d-flex flex-column gap-3 pt-3 feed-container'>
          {/* POSTER DEl HOME */}
          <PostFormLink />
          {postsFeed.map((post) => {
            if (post.parent == null) {
              return (
                <div key={post._id}>
                  <Post post={post} />
                </div>
              )
            }
          })}
        </div>
      </main>
    )
  }
}
