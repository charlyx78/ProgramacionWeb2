import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import AOS from 'aos'

function App () {
  AOS.init()
  return (
    <>
      <Outlet />
      <div>
        <Toaster
          position='bottom-center'
          reverseOrder={false}
          toastOptions={{
            className: '',
            style: {
              border: '1px solid lightgray',
              padding: '16px'
            }
          }}
        />
      </div>
    </>

  )
}

export default App
