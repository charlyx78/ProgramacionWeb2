import React from 'react'

export const UserImage = ({ width, height, sourceImage }) => {
  return (
    <aside>
      <img src={sourceImage} alt='User Image' className='profileImage bg-light' style={{width: width, height: height}} />
    </aside>
  )
}
