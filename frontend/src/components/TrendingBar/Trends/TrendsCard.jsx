import React from 'react'
import { TrendItem } from './TrendItem'

export const TrendsCard = () => {
  return (
    <section className="trends-container card bg-body-tertiary">
      <div className="trends-content card-body">
        <h5 className='mb-3 px-3 fw-bold'>Trendings</h5>
        <ul className="trends-list list-group">
          <TrendItem></TrendItem>
          <TrendItem isNew={true}></TrendItem>
          <TrendItem></TrendItem>
          <TrendItem></TrendItem>
          <TrendItem></TrendItem>
        </ul>
      </div>
    </section>
  )
}
