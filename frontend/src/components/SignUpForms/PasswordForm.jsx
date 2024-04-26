import React from 'react'
import { FormWrapper } from '../FormWrapper'
import { ErrorAlert } from '../ErrorAlert'

export const PasswordForm = ({ register, errors, password, confirmPassword, updateFields }) => {

  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  
  const validatePasswordRegex = () => {
    return regex.test(password) || 'Password must contain at least one number, one symbol, and one uppercase letter.'
  }

  const validatePasswordMatch = () => {
    return confirmPassword === password || 'Passwords do not match.'
  }

  return (
    <FormWrapper title='Protect your account with a password'>
      <div className='form-field'>
        <label>Password</label>
        <input 
          {...register('password', { required: 'Password is required.', validate: validatePasswordRegex })}
          className='form-control' 
          autoFocus 
          type='password' 
          value={password} 
          onChange={e => updateFields({ password: e.target.value })} 
        />
        {errors.password && (
          <ErrorAlert>
            {errors.password.message}
          </ErrorAlert>
        )}
      </div>
      <div className='form-field'>
        <label>Confirm your password</label>
        <input 
          {...register('confirm_password', { required: 'Confirm password is required.', validate: validatePasswordMatch })}
          className='form-control' 
          type='password' 
          value={confirmPassword} 
          onChange={e => updateFields({ confirmPassword: e.target.value })} 
        />
        {errors.confirm_password && (
          <ErrorAlert>
            {errors.confirm_password.message}
          </ErrorAlert>
        )}
      </div>
    </FormWrapper>
  )
}
