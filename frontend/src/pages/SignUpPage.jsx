import React from 'react'
import { useMultiStepForm } from '../logic/MultiStepForm'
import { UserForm } from '../components/SignUpForms/UserForm'
import { BiographyForm } from '../components/SignUpForms/BiographyForm'
import { UserImageForm } from '../components/SignUpForms/UserImageForm'
import { PasswordForm } from '../components/SignUpForms/PasswordForm'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { validateMatchedPasswords, validatePassword, validateUserName } from '../logic/ValidateSignupForm'
import { useNavigate } from 'react-router-dom'

export const SignUpPage = () => {
  const INITIAL_DATA = {
    id: uuid(),
    name: '',
    userName: '',
    email: '',
    birthDay: '',
    biography: '',
    userImage: '',
    uerCoverImage: '',
    password: '',
    confirmPassword: '',
    registrationDate: ''
  }

  const updateFields = (fields) => {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const navigate = useNavigate()
  
  const [data, setData] = useState(INITIAL_DATA)

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    next
  } = useMultiStepForm([
    <UserForm {...data} updateFields={updateFields} />,
    <BiographyForm {...data} updateFields={updateFields} />,
    <UserImageForm {...data} updateFields={updateFields} />,
    <PasswordForm {...data} updateFields={updateFields} />
  ])

  const createUser = () => {
    data.registrationDate = new Date()
    
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then((res) => {
      toast.success('User created successfully, you can log in now')
      navigate('/Login')
    }).catch((err) => {
      toast.error(err)
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isLastStep) {
      /** Validaciones formulario usuario */
      if (currentStepIndex === 0) {
        if (!(await validateUserName(data.userName))) {
          next()
        } else {
          toast.error('Username already exists. Try with another one')
        }
      } else {
        next()
      }
    } else {
      /** Validaciones formulario contrasenas */
      if (validatePassword(data.password)) {
        if (!validateMatchedPasswords(data.password, data.confirmPassword)) {
          toast.error('Passwords don\'t match')
        } else {
          createUser()
        }
      } else {
        toast.error('Password must contain 8 characters or more, upper case, lower case, a number and a symbol')
      }
    }
  }

  return (
    <main className='signup-container container padding-top-content'>
      <form onSubmit={onSubmit}>
        <div className='signup-content'>

          <div className='signup-content-header'>
            <h1 className='fw-bold m-0 fs-2 text-center'>Create your account</h1>
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
