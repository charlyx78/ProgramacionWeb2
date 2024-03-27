import { UserImage } from './UserImage'
import reactLogo from '../assets/react.svg'
import { useState } from 'react'
import React from 'react'

export const Post = ({ postObject }) => {
  const [showCompleteText, setShowCompleteText] = useState(false)
  return (
    <div className='post-container card bg-transparent rounded-0 border-bottom w-100'>
      <div className='card-body d-flex gap-3 align-items-start w-100'>
        <UserImage sourceImage={reactLogo} width='36px' height='36px' />
        <div className='d-flex flex-column justify-content-center align-items-start w-100'>

          <div className="row w-100">
            <div className="col-10 pe-0">
              <div className="d-flex gap-2 overflow-hidden">
                <p className='m-0 post-name text-break' title='Carlos Adrian Ruiz Hernandez'>Carlos Adrian Ruiz Hernandez</p>
                <p className='m-0 post-username text-muted fw-light text-nowrap post-username'>@charly78ruiz</p>
              </div>
            </div>
            <div className="col-2 pe-0">
              <div className="d-flex justify-content-end">
                <p className='m-0 text-muted post-date fw-light'>15m</p>
              </div>
            </div>
          </div>

          <p className='mb-3 post-string-content'>
            {showCompleteText ? postObject.stringContent : postObject.stringContent.substring(0, 250)}
            {postObject.stringContent.length > 250 && (
              <a className='text-primary ms-2' onClick={() => { setShowCompleteText(!showCompleteText) }}>
                Show {showCompleteText ? 'Less' : 'More'}
              </a>
            )}
          </p>

          <div className='post-buttons-container'>
            <div className="row w-100">
              <div className="col-md-8">
                <div className="d-flex justify-content-between w-100">
                  <button className='btn-icon post-button' title='Like'><i className='bi bi-heart me-2'></i> 2.3k</button>
                  <button className='btn-icon post-button' title='Comments'><i className='bi bi-chat me-2'></i> 510</button>
                  <button className='btn-icon post-button' title='Shared'><i className='bi bi-share me-2'></i> 2k</button>
                  <button className='btn-icon post-button' title='Saved'><i className='bi bi-bookmark me-2'></i> 112</button>  
                </div>
              </div>
              <div className="d-none col-md-4 d-md-flex justify-content-end gap-3 pe-0">
                <button className='btn-icon post-button' title='Sended'><i className='bi bi-send me-2'></i></button>
                <button className='btn-icon post-button' title='Seen'><i className='bi bi-bar-chart me-2'></i> 112</button>  
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='card-body d-flex gap-3 align-items-start'>
        <div className='post-content'>
        </div>
      </div> */}
      {/* {postObject.parent && (
        <div className="card-footer pt-2 text-center text-primary border-top">
          <a>Show Thread</a>
        </div>
      )} */}
    </div>
  )
}
