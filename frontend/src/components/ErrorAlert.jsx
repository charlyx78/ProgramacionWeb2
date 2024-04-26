import React from 'react'

export const ErrorAlert = ({ children }) => {
  return (
    <div className="alert alert-danger mt-2 mb-0 d-flex gap-2 py-2" role="alert">
      <i className="bi bi-exclamation-circle"></i>
      {children}
    </div>
      
  )
}
