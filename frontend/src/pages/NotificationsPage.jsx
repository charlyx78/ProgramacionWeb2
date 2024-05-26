import React from 'react'
import { PageHeader } from '../components/PageHeader'
import { NotificationItem } from '../components/NotificationItem'

export const NotificationsPage = () => {
  return (
    <main className='notifications-container'>
      <PageHeader title='Notifications'><h5 className="m-0">Notifications</h5></PageHeader>
      <ul className="notification-item list-group list-group-flush border-bottom">
        <NotificationItem></NotificationItem>
        <NotificationItem></NotificationItem>
        <NotificationItem></NotificationItem>
      </ul>
    </main>
  )
}
