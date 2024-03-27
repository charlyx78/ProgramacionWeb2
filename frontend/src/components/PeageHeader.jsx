import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PeageHeader = ({ title = '', subtitle = '' }) => {
  const navigate = useNavigate()

  return (
    <div className="page-header position-sticky top-0 border-bottom container-fluid py-2">
      <div className="d-flex align-items-center gap-3">
        <button onClick={()=>{navigate(-1)}} className='btn-icon'>
          <i className="bi bi-arrow-left fs-3"></i>
        </button>
        <div className="d-flex flex-column">
          <h5 className='m-0 fw-bold'>{title}</h5>
          <p className="m-0 text-muted">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
