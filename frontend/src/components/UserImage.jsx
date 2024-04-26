import React from 'react'

export const UserImage = ({ width = '36px', height = '36px', sourceImage }) => {
  return (
    <aside>
      <img src={sourceImage} alt='User Image' className='bg-body-secondary rounded-circle user-image' style={{width: width, height: height}} />
    </aside>
  )
}
