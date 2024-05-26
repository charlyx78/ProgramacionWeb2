import React from 'react'
import avatar from '../assets/avatar.svg'
import { ENDPOINT } from '../constants/endpoint'

export const UserImage = ({ width = '36px', height = '36px', sourceImage }) => {
  return (
    <aside>
      <img src={sourceImage != `${ENDPOINT}/` ? sourceImage : avatar}
        alt='User Image' 
        className='bg-body-secondary rounded-circle user-image' 
        style={{width: width, height: height}} 
        onError={(e) => {
          e.target.src = avatar
        }} 
      />
    </aside>
  )
}
