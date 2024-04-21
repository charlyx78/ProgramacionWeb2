import React from 'react'
import { PeageHeader } from '../components/PeageHeader'
import { SearchInput } from '../components/SearchInput/SearchInput'

export const SearchPage = () => {
  return (
    <main className="search-container">
      <PeageHeader showBackButton='false'>
        <SearchInput></SearchInput>
      </PeageHeader>
      <section className="search-content container-fluid position-relative padding-top-content">
      </section>
    </main>
  )
}
