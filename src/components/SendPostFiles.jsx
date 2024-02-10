import { getPreviewImage } from '../logic/GetPreviewImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

export function SendPostFiles ({ removeFileImage, fileImage }) {
  return (
    <div
      className='sendPost-editor-files-container'
    >
      <div className='sendPost-editor-files-content'>
        <div className='sendPost-editor-file rounded'>
          <img
            src={getPreviewImage(fileImage)}
            className='sendPost-image rounded border ratio ratio-16x9'
            alt='Post Image'
          />
          <button
            type='button'
            className='sendPost-image-btnRemove btn btn-dark'
            onClick={removeFileImage}
            style={{ zIndex: 1000000 }}
          >
            <FontAwesomeIcon
              icon={faTimesCircle}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
