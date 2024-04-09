import React from 'react'
import { NavLink } from 'react-router-dom'

export const MenuBarItem = ({url = '', icon, children}) => {
  const isActive = () => {
    return location.pathname === url ? true : false
  }
  return (
    <NavLink to={url} className="menubar-item list-group-item list-group-item-action rounded">
      <i className={`bi bi-${icon}${isActive() && icon != 'search' ? '-fill' : ''}`}></i>
      {children}
    </NavLink>
  )
}
