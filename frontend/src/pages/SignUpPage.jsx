import { React, useEffect } from 'react'
import { useMultiStepForm } from '../logic/MultiStepForm'
import { UserForm } from '../components/SignUpForms/UserForm'
import { BiographyForm } from '../components/SignUpForms/BiographyForm'
import { UserImageForm } from '../components/SignUpForms/UserImageForm'
import { TagsForm } from '../components/SignUpForms/TagsForm'
import { PasswordForm } from '../components/SignUpForms/PasswordForm'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const SignUpPage = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  const { signUp, isAuthenticated, errors: registerErrors } = useAuth()

  // Redirige a Home si ya hay una sesion iniciada
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/Feed')
    }
  }, [isAuthenticated])

  useEffect(() => {
    registerErrors.map((error, i) => {
      toast.error(error.message)
    })
  }, [registerErrors])

  const INITIAL_DATA = {
    name: '',
    lastName: '',
    userName: '',
    email: '',
    birthDate: '',
    biography: '',
    picture: '',
    coverPicture: '',
    tags: [],
    password: '',
    confirmPassword: '',
  }

  const [data, setData] = useState(INITIAL_DATA)

  const updateFields = (fields) => {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const onSubmit = handleSubmit(async (values) => { 
    if (!isLastStep) {
      next()
    }
    else {
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

      signUp(values)
    }
  })
  

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    next
  } = useMultiStepForm([
    <UserForm register={register} errors={errors} {...data} updateFields={updateFields} />,
    <BiographyForm register={register} errors={errors} {...data} updateFields={updateFields} />,
    <UserImageForm register={register} setValue={setValue} errors={errors} {...data} updateFields={updateFields} />,
    <PasswordForm register={register} errors={errors} {...data} updateFields={updateFields} />,
    <TagsForm register={register} errors={errors} {...data} updateFields={updateFields} />
  ])

  return (
    <main className='signup-container container padding-top-content'>
      <form 
        onSubmit={ onSubmit }
        encType='multipart/form-data'
      >
        <div className='signup-content'>

          <div className='signup-content-header'>
            <h3 className='fw-bold m-0 text-center'>Create your account</h3>
            <div className='progress' role='progressbar' aria-label='Basic example' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style={{ height: '2px' }}>
              <div className='progress-bar bg-primary' style={{ width: `${((currentStepIndex) / steps.length) * 100}%` }} />
            </div>
          </div>

          <div className='signup-content-body'>
            <div>{step}</div>
          </div>

          <div className='signup-content-footer'>
            <div className='form-signup-buttons-container'>
              <div>
                {isFirstStep &&
                  <button
                    className='btn btn-outline-primary w-100'
                    type='button'
                    onClick={back}
                  >
                    Back
                  </button>}
              </div>
              <div>
                <button
                  className='btn btn-primary w-100'
                  type='submit'
                >
                  {isLastStep ? 'Finish' : 'Continue'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </form>
    </main>
  )
}
