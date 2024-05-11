import React from 'react'
import { PostForm } from '../components/PostForm'
import { PageHeader } from '../components/PageHeader'

export const CreatePostPage = () => {
  return (
    <main className='create-post-container'>
      <PageHeader>
        Create post
      </PageHeader>
      <div className="py-3">
        <PostForm></PostForm>

      </div>
    </main>
  )
}
