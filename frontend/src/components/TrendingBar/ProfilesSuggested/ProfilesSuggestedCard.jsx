import React from 'react'
import { ProfileSuggestedItem } from './ProfileSuggestedItem'

export const ProfilesSuggestedCard = () => {
  return (
    <section className="trends-container card bg-light">
      <div className="trends-content py-3">
        <h5 className='fw-bold mb-4 px-3'>Who to follow</h5>
        <ul className="who-to-follow-list d-flex flex-column gap-4 mb-0">
          <ProfileSuggestedItem></ProfileSuggestedItem>
          <ProfileSuggestedItem></ProfileSuggestedItem>
          <ProfileSuggestedItem></ProfileSuggestedItem>
        </ul>
      </div>
    </section>
  )
}
