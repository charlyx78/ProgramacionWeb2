import React from 'react'
import { PageHeader } from '../components/PageHeader'
import { ContactList } from '../components/ContactList'

export const ContactsPage = () => {
  return (
    <main>
      <PageHeader>
        <h5 className="m-0">Your contacts</h5>
      </PageHeader>
      <section className='container-fluid py-3'>
        <ContactList>
        </ContactList>
      </section>
    </main>
  )
}
