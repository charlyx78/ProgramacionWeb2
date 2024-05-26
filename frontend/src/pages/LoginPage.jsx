import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, NavLink, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { ErrorAlert } from '../components/ErrorAlert'

export const LoginPage = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const { signIn, isAuthenticated, errors: signInErrors } = useAuth()
  
  const onSubmit = handleSubmit(async (data) => {
    signIn(data)
  })

  useEffect(() => {
    signInErrors.map((error, i) => {
      toast.error(error)
    })
  }, [signInErrors])
  
  const handleGoogleLogin = () => {
    alert('Patience. This function will be enable soon :)')
  }

  if(isAuthenticated) return <Navigate to='/feed' replace />

  return (
    <main className='login-container'>

      <aside className='login-background-container'>
        <div className='login-background-content'>
          <h1 className='text-light m-0'>Dice App</h1>
          <h2 className='text-light mb-0'>Stay ahead, stay informed</h2>
          <p className='text-light m-0'>Developed by Team 2 for the PW2 assignment</p>
          <ul className='d-flex gap-2 m-0'>
            <li><a className='text-light' href='https://github.com/charlyx78'>charlyx78</a></li>
            <li><a className='text-light' href='https://github.com/nokrets'>nokrets</a></li>
            <li><a className='text-light' href='https://github.com/EdgarPalmaJr'>EdgarPalmaJr</a></li>
          </ul>
          <p className='text-light'>&copy; 2024 All Rights Reserved</p>
        </div>
      </aside>

      <div className='login-content'>
        <h1 className='logo text-primary fs-3 d-lg-none'>Dice App</h1>
        <h3 className='fw-bold mb-3 text-start fs-2'>Hi, Welcome Back!👋</h3>
        <form className='d-flex flex-column w-100 gap-4' onSubmit={onSubmit}>
          <div className='form-field'>
            <label htmlFor='email'>Email</label>
            <input 
              autoFocus
              {...register('email', { required: 'Email is required.' })}
              type='text' 
              name='email' 
              className='form-control' placeholder='Email' 
            />
            {errors.email && (
              <ErrorAlert>
                {errors.email.message}
              </ErrorAlert>
            )}
          </div>
          <div className='form-field mb-3'>
            <label htmlFor='password'>Password</label>
            <input 
              {...register('password', { required: 'Password is required.' })}
              type='password' 
              name='password' 
              className='form-control' 
              placeholder='Password'
            />
            {errors.password && (
              <ErrorAlert>
                {errors.password.message}
              </ErrorAlert>
            )}
          </div>
          <div className='login-content-buttons'>
            <button className='btn btn-primary w-100' type='submit'>Login</button>
            <button className='btn bg-body-secondary w-100' type='button' onClick={handleGoogleLogin}>Continue with Google</button>
          </div>
        </form>
        <div className='d-flex'>
          <p className='m-0'>
            You don&apos;t have an account?
          </p>
          <NavLink
            to='/Signup'
            className='ms-2 text-primary'
          >
            Sign up
          </NavLink>
        </div>
      </div>
      
    </main>
  )
}
