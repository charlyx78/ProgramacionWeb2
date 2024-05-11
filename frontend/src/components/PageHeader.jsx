import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PageHeader = ({ children }) => {
  const navigate = useNavigate()

  return (
    <div className="page-header position-sticky top-0 border-bottom bg-body container-fluid z-2 py-2 w-100">
      <div className="d-flex align-items-center gap-3 w-100">
        <button onClick={()=>{navigate(-1)}} className='btn btn-icon'>
          <i className="bi bi-arrow-left fs-3"></i>
        </button>
        {children}
      </div>
    </div>
  )
}
