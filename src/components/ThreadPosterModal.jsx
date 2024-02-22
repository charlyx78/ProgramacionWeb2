import { useEffect, useState } from 'react'
import { ThreadPoster } from './ThreadPoster'
import toast from 'react-hot-toast'

export const ThreadPosterModal = () => {
  // Estado con el array de las publicaciones del hilo
  const [threadArray, setThreadArray] = useState([{ text: '', file: null }])

  const createPost = () => {
    const newThreadArray = [...threadArray, { text: '', file: null }]
    setThreadArray(newThreadArray)
  }

  const updatePostString = (e, index) => {
    const newThreadArray = [...threadArray]
    newThreadArray[index].text = e.target.value
    setThreadArray(newThreadArray)
  }
  const updatePostFile = (file, index) => {
    const newThreadArray = [...threadArray]
    newThreadArray[index].file = file
    setThreadArray(newThreadArray)
  }

  useEffect(() => {
    console.log(threadArray)
  }, [threadArray])

  const removePost = (index) => {
    // No se puede remover el primer elemento del array (post padre)
    if (index !== 0) {
      const newThreadArray = [...threadArray]
      newThreadArray.splice(index, 1)
      setThreadArray(newThreadArray)
    } else {
      toast.error('You cannot remove the parent post')
    }
  }

  return (
    <div className='modal fade' id='threadPosterModal' tabIndex='-1' aria-labelledby='threadPosterModalLabel' aria-hidden='true'>
      <div className='modal-dialog'>
        <h3 className='text-center text-light'>New post</h3>
        <div className='modal-content'>
          <div className='modal-body'>
            <div className='threads-container d-flex flex-column gap-3'>
              {threadArray.map(({ text, file }, index) => (
                // Itera sobre el array y crea componentes de ThreadPoster, por defecto se creara uno ya que el indice 0 del array contiene un dato nulo (eliminarse en backend)
                <ThreadPoster
                  key={index}
                  isEnabled
                  inputStringValue={text}
                  handleNewPostThread={createPost}
                  handleUpdatePostStringThread={(e) => updatePostString(e, index)}
                  handleUpdatePostFileThread={(file) => updatePostFile(file, index)}
                  handleRemovePostThread={() => { removePost(index) }}
                  isLastPost={index === threadArray.length - 1}
                />
              ))}
            </div>
          </div>
          <div className='modal-footer'>
            <button className='btn btn-secondary rounded-pill px-3' onClick={() => { console.log(threadArray) }}>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}
