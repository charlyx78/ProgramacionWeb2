import { useEffect, useState, useRef } from 'react'
import { ThreadPoster } from './ThreadPoster'
import toast from 'react-hot-toast'
import { v4 as uuid } from 'uuid'

export const ThreadPosterModal = () => {
  /* Array de post */
  const [threadArray, setThreadArray] = useState([
    {
      id: uuid(),
      string: '',
      file: null
    }])

  /* Bool: verifica si el post es el ultimo en el thread */
  const [lastPostEmpty, setLastPostEmpty] = useState(true)

  /* Bool: veritica si hay un elemento vacio en el thread */
  const [threadArrayElementEmpty, setThreadArrayElementEmpty] = useState(false)

  /* Actualiza los valores de texto de un post en el thread */
  const updatePostString = (newPostStringValue, index) => {
    const newThreadArray = [...threadArray]
    newThreadArray[index].string = newPostStringValue
    setThreadArray(newThreadArray)
  }

  /* Actualiza el valor del archivo cargado de un post en el thread */
  const updatePostFile = (newFileValue, index) => {
    const newThreadArray = [...threadArray]
    newThreadArray[index].file = newFileValue
    setThreadArray(newThreadArray)
  }

  /* Verifica que el ultimo post sea vacio o no */
  useEffect(() => {
    const threadArrayLastIndex = threadArray[threadArray.length - 1]
    if (threadArrayLastIndex.string === '' && threadArrayLastIndex.file === null) {
      setLastPostEmpty(true)
    } else {
      setLastPostEmpty(false)
    }
  }, [threadArray])

  /* Verifica que ningun post en el array este vacio */
  useEffect(() => {
    let emptyElementFound = false
    threadArray.forEach((thread) => {
      if (thread.string === '' && thread.file === null) {
        emptyElementFound = true
      }
    })
    emptyElementFound ? setThreadArrayElementEmpty(true) : setThreadArrayElementEmpty(false)
  }, [threadArray])
  /* Crea un nuevo post vacio en el thread */
  const createPost = () => {
    if (!lastPostEmpty) {
      const newThreadArray = [...threadArray,
        {
          id: uuid(),
          string: '',
          file: null
        }]
      setThreadArray(newThreadArray)
    }
  }

  /* Elimina un post del thread */
  const removePost = (index) => {
    /* No se puede remover el primer elemento del array (post padre) */
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
      <div className='modal-dialog modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='staticBackdropLabel'>New Post</h1>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
          </div>
          <div className='modal-body'>
            <div className='threads-container d-flex flex-column gap-3'>
              {threadArray.map(({ id, string, file }, index) => (
                /* Itera sobre el array y crea componentes de ThreadPoster */
                <ThreadPoster
                  key={id}
                  isEnabled
                  inputStringValue={string}
                  fileValue={file}
                  handleUpdatePostStringThread={(newPostStringValue) => updatePostString(newPostStringValue, index)}
                  handleUpdatePostFileThread={(newFileValue) => updatePostFile(newFileValue, index)}
                  handleRemovePostThread={() => { removePost(index) }}
                  isFirstPost={index === 0}
                  isLastPost={index === threadArray.length - 1}
                />
              ))}
            </div>
          </div>
          <div className='modal-footer'>
            <button
              className='btn-icon text-primary fs-3 rounded-pill px-3'
              onClick={createPost}
              hidden={!!lastPostEmpty}
            >
              <i className='bi bi-plus-circle' />
            </button>
            <button
              className='btn btn-primary rounded-pill px-3'
              onClick={() => { console.log(threadArray) }}
              disabled={!!lastPostEmpty || threadArrayElementEmpty}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
