import React from 'react'
import { PageHeader } from '../components/PageHeader'
import { ContactList } from '../components/ContactList'

export const ContactsPage = () => {
  return (
    <>
      <PageHeader>
        Your contacts
      </PageHeader>
      <main className='container-fluid py-3'>
        <ContactList>
        </ContactList>
      </main>
    </>
  )
}
