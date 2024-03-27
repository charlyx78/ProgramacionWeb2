import React from 'react'
import { ListResultsItem } from './ListResultsItem'

export const ListResults = ({ searchString }) => {
  return (
    <ul className='list-group border bg-white shadow-sm rounded list-group-flush list-search-results position-absolute z-3'>
      {searchString == '' && (
        <p className="text-center text-muted pt-3">Try searching for people, lists, or keywords</p>
      )}
      {searchString != '' && (
        <ListResultsItem></ListResultsItem>
      )}
    </ul>
  )
}
