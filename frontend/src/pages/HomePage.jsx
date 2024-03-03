import { ThreadPoster } from '../components/ThreadPoster'
import { ThreadPosterModal } from '../components/ThreadPosterModal'

export const HomePage = () => {
  return (
    <main className='feed'>

      <div className='feed-component'>
        <ThreadPoster
          isEnabled={false}
          handleAddToThread=''
        />

      </div>
      <ThreadPosterModal />

    </main>
  )
}
