import './components/PublishPost'
import { Post } from './components/PublishPost'

function App() {

  return (
    <>
      <main className='bg-body-secondary vw-100 vh-100'>
        <div className="container py-4">
          <Post/>
        </div>
      </main>
    </>
  )
}

export default App
