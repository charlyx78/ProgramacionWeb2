import React from 'react'

export const ProfileInfo = () => {
  return (
    <>
      <div className='profile-info-container'>
        <section className='profile-info-cover-container rounded-top' style={{backgroundImage: 'url()'}}>
        </section>
        <div className='profile-into-content w-100'>
          <div className='d-flex justify-content-between align-items-end mb-4'>
            <img src='' className='profile-info-image rounded-circle' alt='Profile Picture' />
            <button className='btn btn-outline-dark'>Edit profile</button>
          </div>
          <h4 className='mb-2'>Carlos Adrian Ruiz Hernandez</h4>
          <p className='text-muted mb-2'>@charly78ruiz</p>
          <p className='text-muted mb-2'><i className='bi bi-calendar3 me-2'></i> Joined March 2024</p>
          <div className='d-flex gap-3'>
            <p><strong>5k</strong> Following</p>
            <p><strong>5k</strong> Followers</p>
          </div>    
        </div>
      </div>
    </>
  )
}
