import React from 'react'
import { useEffect, useState } from 'react'
import { ThreadPoster } from '../components/ThreadPoster'
import toast from 'react-hot-toast'
import { Post } from '../components/Post'
import { NavLink } from 'react-router-dom'

export const FeedPage = () => {
  const [postsFeed, setPostsFeed] = useState([])
  const getPosts = async () => {
    await fetch('http://localhost:3000/posts').then((res) => {
      if (!res) {
        throw new Error(res)
      }
      return res.json()
    }).then((posts) => {
      const newPostsFeed = posts
      setPostsFeed(newPostsFeed)
    }).catch((err) => {
      toast.error(`Unable to get posts due to: ${err.message}`)
    })
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <main className='bg-body-tertiary'>
      <div className='d-flex flex-column gap-3 feed-container'>
        {/* POSTER DEl HOME */}
        <ThreadPoster
          isEnabled={false}
        />
        {postsFeed.map((post) => {
          if (post.parent) {
            return (
              <div key={post.id}>
                <Post postObject={post} />
              </div>
            )
          }
        })}
      </div>
    </main>
  )
}
