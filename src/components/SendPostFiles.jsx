import { getPreviewImage } from '../logic/GetPreviewImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

export function SendPostFiles ({ filesImages }) {
  return (
    <div
      className='sendPost-editor-files-container'
    >
      {filesImages.map((fileImage, index) => (
        <div className='sendPost-editor-file' key={index}>
          <img
            src={getPreviewImage(fileImage)}
            className='sendPost-image rounded border ratio ratio-16x9'
            alt='Post Image'
          />
          <button
            type='button'
            className='sendPost-image-btnRemove btn btn-dark'
            style={{ zIndex: 1000000 }}
          >
            <FontAwesomeIcon
              icon={faTimesCircle}
            />
          </button>
        </div>
      ))}
    </div>
  )
}
