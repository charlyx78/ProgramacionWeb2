import React from 'react'
import { useEffect, useState } from 'react'
import { ThreadPoster } from '../components/ThreadPoster'
import toast from 'react-hot-toast'
import { Post } from '../components/Post'
import { NavLink } from 'react-router-dom'
import { getPosts } from '../api/posts'

export const FeedPage = () => {
  const [postsFeed, setPostsFeed] = useState([])
  
  const getPostsFeed = async () => {
    const posts = await getPosts()
    setPostsFeed(posts.data.posts)
  }

  useEffect(() => {
    getPostsFeed()
  }, [])

  return (
    <main className='bg-body-tertiary'>
      <div className='d-flex flex-column gap-3 feed-container'>
        {/* POSTER DEl HOME */}
        <ThreadPoster
          isEnabled={false}
        />
        {postsFeed.map((post) => {
          if (post.parent == null) {
            return (
              <div key={post.id}>
                <Post post={post} />
              </div>
            )
          }
        })}
      </div>
    </main>
  )
}
