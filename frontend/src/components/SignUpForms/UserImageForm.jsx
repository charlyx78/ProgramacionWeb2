import React from 'react'
import { useRef } from 'react'
import { FormWrapper } from '../FormWrapper'
import avatar from '../../assets/avatar.svg'

export const UserImageForm = ({ register, setValue, errors, picture, coverPicture, updateFields }) => {
  // Referencia al input file
  const hiddenFileInputImage = useRef(null)
  const hiddenFileInputCoverImage = useRef(null)
  const handleFileInputImageClick = () => {
    hiddenFileInputImage.current.click()
  }
  const handleFileInputCoverImageClick = () => {
    hiddenFileInputCoverImage.current.click()
  }
  // Obtener url del file cargado
  const getUrlFile = (file) => {
    return file ? URL.createObjectURL(file) : ''
  }

  return (
    <FormWrapper title='Show your face to the world'>
      <div className='form-field'>
        <label className='text-center mb-3'>Custom your profile picture</label>
        <input
          {...register('picture')}
          name='picture'
          className='d-none'
          type='file'
          accept='.jpg,.jpeg,.png'
          onChange={e => {
            updateFields({ picture: e.target.files[0] })
            setValue('picture', e.target.files[0])
          }
          }
          ref={hiddenFileInputImage}
        />
        <input
          {...register('cover_picture')}
          name='cover_picture'
          className='d-none'
          type='file'
          accept='.jpg,.jpeg,.png'
          onChange={e => {
            updateFields({ coverPicture: e.target.files[0] })
            setValue('cover_picture', e.target.files[0]) 
          }
          }
          ref={hiddenFileInputCoverImage}
        />
        <div className="position-relative user-cover-image-form-container rounded" style={{backgroundImage: `url(${getUrlFile(coverPicture)})`}}>
          <div className="position-absolute start-0 container-fluid top-50">
            <div className='position-relative d-flex justify-content-center'>
              <img
                src={getUrlFile(picture)}
                className='mt-3 rounded-circle form-signup-preview-image'
                alt=''
              />
              <div className='d-flex position-absolute bottom-0 gap-3 p-4'>
                <button
                  type='button'
                  className='btn btn-dark rounded'
                  onClick={handleFileInputImageClick}
                >
                  <i className='bi bi-pencil-fill' />
                </button>
                {picture && (
                  <button
                    type='button'
                    className='btn btn-dark rounded'
                    onClick={() => { updateFields({ picture: null }) }}
                  >
                    <i className='bi bi-x-lg' />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="position-absolute end-0 m-3 d-flex gap-2">
            <button 
              type='button'
              className='btn btn-dark' 
              onClick={handleFileInputCoverImageClick}
            >
              <i className='bi bi-pencil-fill' />
            </button>
            {coverPicture && (
              <button
                type='button'
                className='btn btn-dark rounded'
                onClick={() => { updateFields({ coverPicture: null }) }}
              >
                <i className='bi bi-x-lg' />
              </button>
            )}
          </div>
        </div>
      </div>
    </FormWrapper>
  )
}
