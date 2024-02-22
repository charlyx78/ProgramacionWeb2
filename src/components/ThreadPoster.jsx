import { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faSmile, faXmarkCircle } from '@fortawesome/free-regular-svg-icons'
import { UserImage } from './UserImage'
import { SetTextareaAutoHeight } from '../logic/SetTextareaAutoHeight'
import toast from 'react-hot-toast'
import reactLogo from '../assets/react.svg'

export const ThreadPoster = ({
  isEnabled,
  inputStringValue,
  handleNewPostThread,
  handleUpdatePostStringThread,
  handleUpdatePostFileThread,
  handleRemovePostThread,
  isLastPost
}) => {
  // Estado del input string del textarea
  const [inputString, setInputString] = useState(inputStringValue)
  // Estado para monitorear si este componente ya ha agregado una publicacion al hilo o no
  const [lastPost, setLastPost] = useState(isLastPost)
  // Estado para almacenar los archivos
  const [file, setFile] = useState(null)
  // Referencia al input file
  const hiddenFileInput = useRef(null)
  const handleFileInputClick = event => {
    hiddenFileInput.current.click()
  }
  // Solo si el inputString no es vacio, procede a crear un nuevo post
  const createNewPost = () => {
    if (inputString !== '' || file !== null) {
      setLastPost(false)
      handleNewPostThread()
    } else {
      toast.error('You cannot add an empty post')
    }
  }
  // Actualiza el estado d e inputString al activarse el evento
  // onChange del textarea, sirve para imprimir correctamente los textos
  const updateInputString = (e) => {
    const newInputString = e.target.value
    setInputString(newInputString)
  }
  const removeFile = () => {
    setFile(null)
  }
  // Elimina el componente del thread
  const removePost = () => {
    handleRemovePostThread()
  }
  // Obtener url del file cargado
  const getUrlFile = (file) => {
    return URL.createObjectURL(file)
  }

  return (
    <>
      <div className='threadPoster d-flex gap-3 position-relative'>
        <div className='d-flex flex-column'>
          <UserImage
            link=''
            sourceImage={reactLogo}
          />
          {isEnabled && !isLastPost && (
            // Anade la linea de seguimiento del hilo
            <div className='d-flex justify-content-center h-100 pt-3'>
              <div className='vr py-3' />
            </div>
          )}
        </div>
        <section className='d-flex flex-column gap-1 w-100'>
          <textarea
            className='threadPoster-textarea'
            readOnly={!isEnabled}
            placeholder='What is happening?'
            onChange={(e) => {
              SetTextareaAutoHeight(e)
              updateInputString(e)
              handleUpdatePostStringThread(e)
            }}
            value={inputStringValue}
            // Si el componente NO esta habilitado para edicion, entonces se convierte en un acceso al modal de hilos
            {...(!isEnabled ? { 'data-bs-toggle': 'modal', 'data-bs-target': '#threadPosterModal' } : {})}
          />
          {isEnabled && file && (
            // Preview del archivo cargado
            <div className='threadPoster-filePreview-container mb-2'>
              <div className='position-relative'>
                <img src={getUrlFile(file)} alt='File post' className='threadPoster-filePreview rounded' />
                <button
                  className='btn-icon text-light bg-dark p-2 rounded position-absolute top-0 end-0 m-2'
                  onClick={() => {
                    removeFile()
                    handleUpdatePostFileThread(null)
                  }}
                >
                  <FontAwesomeIcon icon={faXmarkCircle} />
                </button>
              </div>
            </div>
          )}
          {isEnabled && (
            // Solo se muestran las opciones si el componente esta habilitado para su edicion
            <div className='threadPoster-buttons d-flex justify-content-between'>
              <div className=' d-flex gap-3'>
                <button className='btn-icon' onClick={handleFileInputClick}>
                  <FontAwesomeIcon icon={faImage} />
                </button>
                <input
                  type='file' name='file' className='d-none'
                  onChange={(e) => {
                    setFile(e.target.files[0])
                    handleUpdatePostFileThread(e.target.files[0])
                  }}
                  ref={hiddenFileInput}
                />
                <button className='btn-icon'>
                  <FontAwesomeIcon icon={faSmile} />
                </button>
              </div>
              {isLastPost && (
                // El boton 'Add to Thread' solo se muestra si no se ha agregado un post previamente en el componente
                <a href='#' className='text-secondary' onClick={createNewPost}>Add another post</a>
              )}
            </div>
          )}
        </section>
        {isEnabled && isLastPost && (
          // El boton 'Remove from Thread' solo se muestra si no se ha agregado un post previamente en el componente
          <button
            className='btn-icon position-absolute end-0'
            onClick={removePost}
          >
            <FontAwesomeIcon icon={faXmarkCircle} />
          </button>
        )}
      </div>
    </>
  )
}
