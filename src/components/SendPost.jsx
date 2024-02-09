import { useState } from 'react'
import Picker from 'emoji-picker-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faTimesCircle, faFileImage, faFileVideo, faFile } from '@fortawesome/free-regular-svg-icons'
import reactLogo from '../assets/react.svg'
import { SetTextareaAutoHeight } from '../logic/SetTextareaAutoHeight'
import { SendPostFiles } from './SendPostFiles'

export function Post () {
  const [inputString, setInputString] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const [filesImages, setFilesImages] = useState(new Array(0))

  const addEmoji = (e) => {
    setInputString(prevInputString => prevInputString + e.emoji)
  }

  const removeFileImage = (index) => {
    const newArray = [...filesImages.slice(0, index), ...filesImages.slice(index + 1)]
    setFilesImages(newArray)
  }

  return (
    <>
      <div className='sendPost-container card shadow-sm border-0'>
        <div className='sendPost-content card-body'>
          <aside className='sendPost-userPicture-container'>
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
                className='sendPost-textarea form-control border-0'
                rows={1}
                placeholder='What is happening?'
                onChange={(e) => {
                  setInputString(e.target.value)
                  SetTextareaAutoHeight(e, '40px')
                }}
                value={inputString}
                required
              />

              {filesImages.length >= 1 &&
                <SendPostFiles
                  filesImages={filesImages}
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
                  <label
                    className='sendPost-editor-optionBtn btn rounded text-primary'
                    htmlFor='postVideoInpt'
                  >
                    <FontAwesomeIcon
                      icon={faFileVideo}
                    />
                  </label>
                  <label
                    className='sendPost-editor-optionBtn btn rounded text-primary'
                    htmlFor='postFileInpt'
                  >
                    <FontAwesomeIcon
                      icon={faFile}
                    />
                  </label>
                  <input
                    type='file'
                    name='postImageInpt'
                    id='postImageInpt'
                    className='d-none'
                    accept='image/jpg,image/jpeg,image/png'
                    multiple
                    onChange={(e) => {
                      const selectedFiles = Array.from(e.target.files)
                      setFilesImages(selectedFiles)
                    }}
                  />
                  <input
                    type='file'
                    name='postVideoInpt'
                    id='postVideoInpt'
                    className='d-none'
                    accept='video/mp4,video/wmv,video/avi'
                  />
                  <input
                    type='file'
                    name='postFileInpt'
                    id='postFileInpt'
                    className='d-none'
                    accept='application/pdf,text/text'
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
