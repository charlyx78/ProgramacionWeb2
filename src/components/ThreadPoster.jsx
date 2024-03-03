import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faSmile, faXmarkCircle } from '@fortawesome/free-regular-svg-icons'
import { UserImage } from './UserImage'
import { SetTextareaAutoHeight } from '../logic/SetTextareaAutoHeight'
import reactLogo from '../assets/react.svg'

export const ThreadPoster = ({
  isEnabled,
  inputStringValue,
  fileValue,
  handleUpdatePostStringThread,
  handleUpdatePostFileThread,
  handleRemovePostThread,
  isFirstPost,
  isLastPost,
  ...props
}) => {
  const [showComponent, setShowComponent] = useState(true)

  // Valor del texto
  const [inputString, setInputString] = useState(inputStringValue)

  // Valor del archivo cargado
  const [file, setFile] = useState(fileValue)

  // Referencia al input file
  const hiddenFileInput = useRef(null)
  const handleFileInputClick = () => {
    hiddenFileInput.current.click()
  }

  // Elimina el componente del thread
  const removePostThread = () => {
    setShowComponent(false)
    handleRemovePostThread()
  }

  // Obtener url del file cargado
  const getUrlFile = (fileValue) => {
    return URL.createObjectURL(fileValue)
  }

  return (
    <>
      {showComponent && (
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
            /* Si el componente NO esta habilitado para edicion, entonces se convierte en un acceso al modal de hilos */
              {...(!isEnabled ? { 'data-bs-toggle': 'modal', 'data-bs-target': '#threadPosterModal' } : {})}
              className='threadPoster-textarea'
              readOnly={!isEnabled}
              placeholder='What is happening?'
              onChange={(e) => {
                SetTextareaAutoHeight(e)
                setInputString(e.target.value)
                handleUpdatePostStringThread(e.target.value)
              }}
              value={inputStringValue}
            />
            {/* Preview del archivo cargado */}
            {isEnabled && file && (
              <div className='threadPoster-filePreview-container mb-2'>
                <div className='position-relative'>
                  <img src={getUrlFile(fileValue)} alt='File post' className='threadPoster-filePreview rounded' />
                  <button
                    className='btn-icon text-light bg-dark p-2 rounded position-absolute top-0 end-0 m-2'
                    onClick={() => {
                      setFile(null)
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
                    type='file' name='file' className='d-none' accept='image/jpeg,image/jgp,image/png'
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
              </div>
            )}
          </section>
          {isEnabled && (inputString === '' && file === null && !isFirstPost) && (
          // Solo se activa la opcion de eliminar hilo a aquellos que estan vacios y sean diferentes al hilo padre
            <button
              className='btn-icon position-absolute end-0'
              onClick={removePostThread}
            >
              <FontAwesomeIcon icon={faXmarkCircle} />
            </button>
          )}
        </div>
      )}
    </>
  )
}
