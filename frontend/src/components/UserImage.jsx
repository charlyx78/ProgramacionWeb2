import React from 'react'
import avatar from '../assets/avatar.svg'

export const UserImage = ({ width = '36px', height = '36px', sourceImage }) => {
  return (
    <aside>
      <img src={sourceImage != 'http://localhost:3000/' ? sourceImage : avatar} alt='User Image' className='bg-body-secondary rounded-circle user-image' style={{width: width, height: height}} />
    </aside>
  )
}
