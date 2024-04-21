import React from 'react'
import { PeageHeader } from '../components/PeageHeader'
import { NotificationItem } from '../components/NotificationItem'

export const NotificationsPage = () => {
  return (
    <main className='notifications-container'>
      <PeageHeader title='Notifications'><h5 className="m-0">Notifications</h5></PeageHeader>
      <ul className="notification-item list-group list-group-flush border-bottom">
        <NotificationItem></NotificationItem>
        <NotificationItem></NotificationItem>
        <NotificationItem></NotificationItem>
      </ul>
    </main>
  )
}
