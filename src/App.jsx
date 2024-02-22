import { ThreadPoster } from './components/ThreadPoster'
import { ThreadPosterModal } from './components/ThreadPosterModal'
import toast, { Toaster } from 'react-hot-toast'
function App () {
  return (
    <>
      <div>
        <Toaster
          position='bottom-center'
          reverseOrder={false}
        />
      </div>
      <div className='container-fluid'>
        <ThreadPoster
          isEnabled={false}
          handleAddToThread=''
        />
        <ThreadPosterModal />
      </div>
    </>
  )
}

export default App
