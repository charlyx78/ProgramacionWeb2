import React from 'react'
import { useEffect, useState } from 'react'
import { ThreadPoster } from '../components/ThreadPoster'
import toast from 'react-hot-toast'
import { Post } from '../components/Post'

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
    <main className='feed-container'>
      <div className="page-header position-sticky top-0 border-bottom container-fluid py-2">
        <div className="d-flex justify-content-around">
          <button className="btn" type='button'>For you</button>
          <button className="btn" type='button'>Following</button>
        </div>
      </div>
      <div className='feed-content'>
        {/* POSTER DEl HOME */}
        <ThreadPoster
          isEnabled={false}
        />
        <div className='feed-posts-container'>
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
      </div>
      <div></div>
    </main>
  )
}
