import toast, { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import { MenuBar } from './components/MenuBar'

function App () {
  return (
    <main className='d-flex container'>
      <MenuBar />
      <Outlet />
      <div>
        <Toaster
          position='bottom-center'
          reverseOrder={false}
        />
      </div>
    </main>
  )
}

export default App
