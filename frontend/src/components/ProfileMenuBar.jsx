import React from 'react'
import reactLogo from '../assets/react.svg'

export const ProfileMenuBar = () => {
  return (
    <div className='card mb-4 bg-body-tertiary'>
      <div className="card-body d-flex align-items-start gap-3">
        <img src={reactLogo} width='35px' height='35px' className='rounded-circle border' />
        <div className='d-flex flex-column align-items-start'>
          <p className='mb-0 fw-semibold'>Carlos Ruiz</p>
          <p className='mb-0 text-lighter text-muted'>@charly78ruiz</p>       
        </div>
        {/* <section className='d-flex gap-2 mt-2'>
          <p className='m-0 text-center'>14 <br /> Followers</p>
          <div className="vr"></div>
          <p className='m-0 text-center'>14 <br /> Following</p>
        </section> */}
      </div>
    </div>
  )
}
