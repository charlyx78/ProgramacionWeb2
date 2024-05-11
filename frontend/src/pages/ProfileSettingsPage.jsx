import React, {useRef, useState, useEffect} from 'react'
import { PageHeader } from '../components/PageHeader'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { ErrorAlert } from '../components/ErrorAlert'
import { formatISODate } from '../logic/formatISODate'
import toast from 'react-hot-toast'

export const ProfileSettingsPage = () => {

  const navigate = useNavigate()

  const { user: userLogged, getUserData } = useAuth()

  const [loading, setLoading] = useState(true)

  const [user, setUser] = useState(null)

  const [userId, setUserId] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [biography, setBiography] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [picture, setPicture] = useState('')
  const [coverPicture, setCoverPicture] = useState('')
  const [tagsArray, setTagsArray] = useState([])
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {

    async function getUser() {
      const userData = await getUserData(userLogged._id)
      setUser(userData)

      if(!userData) navigate('/*')

      setUserId(userData.id)
      setName(userData.name)
      setLastName(userData.last_name)
      setUsername(userData.username)
      setEmail(userData.email)
      setBiography(userData.biography)
      setBirthDate(formatISODate(userData.birth_date))
      setTagsArray(userData.tags)
      setPicture(`http://localhost:3000/${userData.picture}`)
      setCoverPicture(`http://localhost:3000/${userData.cover_picture}`)

      setLoading(false)
    }
    
    getUser()

  }, [])

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  const onSubmit = handleSubmit(async (values) => { 
    console.log(values)
    const tags = Array.isArray(values.tags) ? values.tags : [values.tags]
    /** Parseamos el arreglo de tags */
    const parsedTags = tags.map((tag) => {
      try {
        return JSON.parse(tag)
      } catch (error) {
        console.error('Error al analizar el tag como JSON:', error)
        return tag
      }
    })

    values.tags = parsedTags

    const profileUpdated = updateProfile(values)
    profileUpdated ? toast.success('User updated successfully') : ''
    navigate(`/profile/${userId}`)
  })

  const tagInput = useRef()
  const tagButton = useRef()
  
  const addTagToArray = () => {
    const tag = tagInput.current.value
    const newTagArray = [...tagsArray, {name: tag}]
    setTagsArray(newTagArray)
    tagInput.current.value = ''
    tagInput.current.focus()
  }

  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  
  const validatePasswordRegex = () => {
    return regex.test(password) || 'Password must contain at least one number, one symbol, and one uppercase letter.'
  }

  const validatePasswordMatch = () => {
    return confirmPassword === password || 'Passwords do not match.'
  }

  const { updateProfile } = useAuth()

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

  if(loading) {
    return <p>Loading...</p>
  } else {
    return (
      <main className="profile-settings-container">
        <PageHeader title='Profile Settings'>
          <h5 className='mb-0'>Profile Settings</h5>
        </PageHeader>

        <form onSubmit={onSubmit} encType='multipart/form-data' className='pb-4'>
          <div className='form-field'>
            <input
              {...register('picture')}
              name='picture'
              className='d-none'
              type='file'
              accept='.jpg,.jpeg,.png'
              onChange={e => {
                setValue('picture', e.target.files[0])
                setPicture(getUrlFile(e.target.files[0]))
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
                setValue('cover_picture', e.target.files[0]) 
                setCoverPicture(getUrlFile(e.target.files[0]))
              }
              }
              ref={hiddenFileInputCoverImage}
            />
            <div className="position-relative user-cover-image-form-container rounded" style={{backgroundImage: `url(${coverPicture})`}}>
              <div className="position-absolute start-0 container-fluid top-50">
                <div className='position-relative d-flex justify-content-center'>
                  <img
                    src={picture}
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
                        onClick={() => { setPicture(null) }}
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
                    onClick={() => { setCoverPicture(null) }}
                  >
                    <i className='bi bi-x-lg' />
                  </button>
                )}
              </div>
            </div>
          </div>
        
          <div className='form-field mb-3'>
            <label>Name</label>
            <input 
              {...register('name', { required: 'Name is required.' })}
              className='form-control' 
              autoFocus
              type='text' 
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {errors.name && (
              <ErrorAlert>
                {errors.name.message}
              </ErrorAlert>
            )}
          </div>
          <div className='form-field mb-3'>
            <label>Last name</label>
            <input 
              {...register('last_name', { required: 'Last name is required.' })}
              className='form-control' 
              type='text'
              value={lastName}
              onChange={e => setLastName(e.target.value)}

            />
            {errors.last_name && (
              <ErrorAlert>
                {errors.last_name.message}
              </ErrorAlert>
            )}
          </div>
          <div className='form-field mb-3'>
            <label>Username</label>
            <input 
              {...register('username', { required: 'Userame is required.' })}
              className='form-control' 
              type='text' 
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            {errors.username && (
              <ErrorAlert>
                {errors.username.message}
              </ErrorAlert>
            )}
          </div>
          <div className='form-field mb-3'>
            <label>Email</label>
            <input 
              {...register('email', { required: 'Email is required.' })}
              className='form-control' 
              type='email' 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {errors.email && (
              <ErrorAlert>
                {errors.email.message}
              </ErrorAlert>
            )}
          </div>
          <div className='form-field mb-3'>
            <label>Birth date</label>
            <input 
              {...register('birth_date', { required: 'Birth date is required.' })}
              className='form-control' 
              type='date' 
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
            />
            {errors.birth_date && (
              <ErrorAlert>
                {errors.birth_date.message}
              </ErrorAlert>
            )}
          </div>
          <div className='form-field mb-3'>
            <label>Tell the world something about you</label>
            <textarea
              {...register('biography')} 
              className='form-control rounded' 
              value={biography}
              onChange={e => setBiography(e.target.value)}
            />
          </div>
        
          <p className='mb-0'>Tags</p>
          <div className="row mb-3">
            <div className="col-8">
              <input type="text" ref={tagInput} className='w-100 form-control' />
            </div>
            <div className="col-4">
              <button type='button' onClick={addTagToArray} ref={tagButton} className='btn btn-primary w-100'>Add</button>
            </div>
          </div>


          <div className="card mb-3">
            <div className="card-body d-flex gap-2">

              {tagsArray.length === 0 && (
                <p className='mb-0 text-muted fst-italic'>Type key words and click add to know your interests. For example: art, music, videogames</p>
              )}

              {tagsArray.map((tag, index) => (
                <div className="card" key={index}>
                  <div className="card-body">
                    <div className="form-check">
                      <input
                        {...register('tags', {required: 'At least 5 tags are required'})}
                        className="form-check-input"
                        name='tags'
                        type="checkbox"
                        value={JSON.stringify({name: tag.name})}
                        checked={tagsArray.some((t) => t.name === tag.name)} // Marca la checkbox si la etiqueta está presente en tags
                      />

                      <label className="form-check-label" htmlFor="flexCheckDisabled">
                        {tag.name}
                      </label>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
          {errors.name && (
            <ErrorAlert>
              {errors.tags.message}
            </ErrorAlert>
          )}

          <div className='form-field mb-3'>
            <label>Password</label>
            <input 
              {...register('password', { required: 'Password is required.', validate: validatePasswordRegex })}
              className='form-control' 
              type='password' 
              onChange={e => setPassword(e.target.value)}
            />
            {errors.password && (
              <ErrorAlert>
                {errors.password.message}
              </ErrorAlert>
            )}
          </div>
          <div className='form-field mb-4'>
            <label>Confirm your password</label>
            <input 
              {...register('confirm_password', { required: 'Confirm password is required.', validate: validatePasswordMatch })}
              className='form-control' 
              type='password' 
              onChange={e => setConfirmPassword(e.target.value)}
            />
            {errors.confirm_password && (
              <ErrorAlert>
                {errors.confirm_password.message}
              </ErrorAlert>
            )}
          </div>

          <button
            className='btn btn-primary w-100'
            type='submit'
          >
          Update profile
          </button>
        </form>
      </main>
    )
  }
}
