import React from 'react'
import { NavLink } from 'react-router-dom'
import sad_cat from '../assets/sad_cat.jpg'

export const NotFoundPage = () => {
  return (
    <div className='w-100 vh-100'>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="card">
          <div className="card-body text-center">
            <h1>404</h1> <br />
            <h4 className='mb-4 fw-normal'>Sorry! This page doesn't exists or has been deleted</h4>
            <img src={sad_cat} width='300px' className='mb-4 rounded' />
            <br />
            <NavLink className="btn btn-primary" to='/feed'>
              Go home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
