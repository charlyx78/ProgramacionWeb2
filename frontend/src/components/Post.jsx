import { UserImage } from './UserImage'
import reactLogo from '../assets/react.svg'
import { useState } from 'react'
import React from 'react'

export const Post = ({ postObject }) => {
  const [showCompleteText, setShowCompleteText] = useState(false)
  return (
    <div className='post-container card shadow-sm border-0'>
      <div className='card-header d-flex gap-3 align-items-center'>
        <UserImage sourceImage={reactLogo} />
        <div className='d-flex flex-column flex-column align-items-start'>
          <strong>@charly78ruiz</strong>
          <div className='d-flex gap-2 text-muted'>
            Carlos Adrian Ruiz Hernandez
            15m
          </div>
        </div>
      </div>
      <div className='card-body d-flex gap-3 align-items-start'>
        <div className='post-content'>
          <p className='m-0'>
            {showCompleteText ? postObject.stringContent : postObject.stringContent.substring(0, 250)}
            {postObject.stringContent.length > 250 && (
              <a className='text-primary fs-6 ms-2' onClick={() => { setShowCompleteText(!showCompleteText) }}>
                Show {showCompleteText ? 'Less' : 'More'}
              </a>
            )}
          </p>
          <div className='post-buttons-container'>
            <button className='btn-icon'><i className='bi bi-heart me-2'></i> 2.3k</button>
            <button className='btn-icon'><i className='bi bi-chat me-2'></i> 510</button>
            <button className='btn-icon'><i className='bi bi-share me-2'></i> 2k</button>
            <button className='btn-icon'><i className='bi bi-bookmark me-2'></i> 112</button>
          </div>
        </div>
      </div>
      {postObject.parent && (
        <div className="card-footer pt-2 text-center text-primary border-top">
          <a>Show Thread</a>
        </div>
      )}
    </div>
  )
}
