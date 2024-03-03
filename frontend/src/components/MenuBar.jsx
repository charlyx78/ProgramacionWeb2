import { NavLink } from 'react-router-dom'

export const MenuBar = () => {
  return (
    <div className='d-flex flex-column flex-shrink-0 p-3 border-end' style={{ width: '280px', height: '100vh' }}>
      <ul className='nav nav-pills flex-column mb-auto'>
        <li className='nav-item'>
          <NavLink
            to='/Home'
            className='nav-link rounded-pill'
          >
            <i className='bi bi-house-door-fill' />
            Home
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            to='/Account'
            className='nav-link rounded-pill'
          >
            <i className='bi bi-person-fill' />
            Account
          </NavLink>
        </li>
      </ul>
      <div>
        <NavLink
          to='/Account'
          className='d-flex align-items-center link-body-emphasis text-decoration-none'
        >
          <img src='https://github.com/mdo.png' alt='' width='32' height='32' className='rounded-circle me-2' />
          Charly78Ruiz
        </NavLink>
      </div>
    </div>
  )
}
