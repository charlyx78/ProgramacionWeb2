import { ThreadPoster } from '../components/ThreadPoster'
import { ThreadPosterModal } from '../components/ThreadPosterModal'

export const HomePage = () => {
  return (
    <main className='container'>

      <ThreadPoster
        isEnabled={false}
        handleAddToThread=''
      />
      <ThreadPosterModal />

    </main>
  )
}
