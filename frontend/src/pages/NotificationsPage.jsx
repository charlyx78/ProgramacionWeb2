import React from 'react'
import { PeageHeader } from '../components/PeageHeader'
import { NotificationItem } from '../components/NotificationItem'

export const NotificationsPage = () => {
  return (
    <main className='notifications-container'>
      <PeageHeader title='Notifications'></PeageHeader>
      <ul className="notification-item list-group list-group-flush">
        <NotificationItem></NotificationItem>
        <NotificationItem></NotificationItem>
        <NotificationItem></NotificationItem>
      </ul>
    </main>
  )
}
