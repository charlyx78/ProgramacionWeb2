import React from 'react'
import { TrendItem } from './TrendItem'

export const TrendsCard = () => {
  return (
    <section className="trends-container card bg-light">
      <div className="trends-content py-3">
        <h5 className='fw-bold mb-4 px-3'>What is happening</h5>
        <ul className="trends-list d-flex flex-column gap-2 mb-0">
          <TrendItem></TrendItem>
          <TrendItem></TrendItem>
          <TrendItem></TrendItem>
        </ul>
      </div>
    </section>
  )
}
