import React from 'react'
import { PageHeader } from '../components/PageHeader'
import { ContactList } from '../components/ContactList'

export const ContactsPage = () => {
  return (
    <>
      <PageHeader>
        <h5 className="m-0">Your contacts</h5>
      </PageHeader>
      <main className='container-fluid py-3'>
        <ContactList>
        </ContactList>
      </main>
    </>
  )
}
