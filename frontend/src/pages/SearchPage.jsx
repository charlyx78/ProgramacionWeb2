import React from 'react'
import { PeageHeader } from '../components/PeageHeader'
import { SearchInput } from '../components/SearchInput/SearchInput'

export const SearchPage = () => {
  return (
    <main className="search-container">
      <PeageHeader title='Search'></PeageHeader>
      <section className="search-content container-fluid padding-top-content">
        <SearchInput></SearchInput>
      </section>
    </main>
  )
}
