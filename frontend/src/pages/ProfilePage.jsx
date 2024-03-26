import React from 'react'
import { ProfileInfo } from '../components/ProfileInfo'
import { useNavigate } from 'react-router-dom'

export const ProfilePage = () => {
  const navigate = useNavigate()

  return (
    <>
      <main className='account-container'>
        <div className="page-header position-sticky top-0 border-bottom container-fluid py-2">
          <div className="d-flex align-items-center gap-3">
            <button onClick={()=>{navigate(-1)}} className='btn-icon'>
              <i className="bi bi-arrow-left fs-3"></i>
            </button>
            <div className="d-flex flex-column">
              <h5 className='m-0 fw-bold'>Carlos Ruiz</h5>
              <p className="m-0 text-muted">0 Posts</p>
            </div>
          </div>
        </div>
        <ProfileInfo />
        <div className='account-content card-body'>
        </div>
      </main>
    </>
  )
}
