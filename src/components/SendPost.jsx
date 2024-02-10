import { useEffect, useState } from 'react'
import Picker from 'emoji-picker-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faTimesCircle, faFileImage } from '@fortawesome/free-regular-svg-icons'
import reactLogo from '../assets/react.svg'
import { SetTextareaAutoHeight } from '../logic/SetTextareaAutoHeight'
import { SendPostFiles } from './SendPostFiles'

export function Post () {
  const [inputString, setInputString] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const [fileImage, setFileImage] = useState(null)

  useEffect(() => {
    console.log(fileImage)
  }, [fileImage])

  const addEmoji = (e) => {
    setInputString(prevInputString => prevInputString + e.emoji)
  }

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0]
    console.log(selectedFile)
    setFileImage(selectedFile)
  }

  const removeFileImage = () => {
    const newFile = null
    setFileImage(newFile)
  }

  return (
    <>
      <div className='sendPost-container card shadow-sm border-0'>
        <div className='sendPost-content card-body'>
          <aside className='userPicture sendPost-userPicture-container'>
            <img
              src={reactLogo}
              className='border rounded-circle sendPost-userPicture'
              alt='Profile picture'
            />
          </aside>
          <section className='sendPost-editor-container'>
            <form action='' className='sendPost-editor-form'>
              <textarea
                name='postInpt'
                className='textarea sendPost-textarea form-control'
                rows={1}
                placeholder='What is happening?'
                onChange={(e) => {
                  setInputString(e.target.value)
                  SetTextareaAutoHeight(e, '40px')
                }}
                value={inputString}
                required
              />

              {fileImage !== null &&
                <SendPostFiles
                  removeFileImage={removeFileImage()}
                  fileImage={fileImage}
                />}

              <div className='progress hr' role='progressbar' aria-label='Limit characters progress' aria-valuenow={(inputString.length / 255) * 100} aria-valuemin={0} aria-valuemax={100} style={{ height: '2px' }}>
                <div className='progress-bar' style={{ width: `${(inputString.length / 255) * 100}%` }} />
              </div>

              <div className='sendPost-editor-options-container'>
                <div className='sendPost-editor-options-content'>
                  <label
                    className='sendPost-editor-optionBtn btn rounded text-primary'
                    htmlFor='postImageInpt'
                  >
                    <FontAwesomeIcon
                      icon={faFileImage}
                    />
                  </label>
                  <input
                    type='file'
                    name='postImageInpt'
                    id='postImageInpt'
                    className='d-none'
                    accept='image/jpg,image/jpeg,image/png,video/mp4,video/wmv,video/avi'
                    onChange={handleFileInputChange}
                  />
                  <button
                    type='button'
                    className='sendPost-editor-optionBtn btn rounded text-primary'
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <FontAwesomeIcon
                      icon={showEmojiPicker ? faTimesCircle : faSmile}
                    />
                  </button>
                  <button type='button' className='sendPost-editor-postBtn btn btn-primary rounded'>Post</button>
                </div>
              </div>
            </form>
          </section>
        </div>
        {
            showEmojiPicker &&
              <Picker
                className='emoji-picker-container'
                emojiStyle='twitter'
                onEmojiClick={addEmoji}
              />
        }
      </div>
    </>
  )
}
