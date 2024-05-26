import { DateTime } from 'luxon'

export const getTimePassedFromDate = (date) => {
  const givenDate = DateTime.fromISO(date)
  const currentDate = DateTime.now()
    
  const diff = currentDate.diff(givenDate)
    
  if (diff.as('years') >= 1) {
    return { value: Math.ceil(diff.as('years')), unit: 'y' }
  } else if (diff.as('months') >= 1) {
    return { value: Math.ceil(diff.as('months')), unit: 'M' }
  } else if (diff.as('days') >= 1) {
    return { value: Math.ceil(diff.as('days')), unit: 'd' }
  } else if (diff.as('hours') >= 1) {
    return { value: Math.ceil(diff.as('hours')), unit: 'h' }
  } else if (diff.as('minutes') >= 1) {
    return { value: Math.ceil(diff.as('minutes')), unit: 'm' }
  } else {
    return { value: Math.ceil(diff.as('seconds')), unit: 's' }
  }
}