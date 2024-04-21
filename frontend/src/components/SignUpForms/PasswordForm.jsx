import React from 'react'
import { FormWrapper } from '../FormWrapper'

export const PasswordForm = ({ password, confirmPassword, updateFields }) => {
  return (
    <FormWrapper title='Protect your account with a password'>
      <div className='form-field'>
        <label>Type your password</label>
        <input className='form-control' autoFocus required type='password' value={password} onChange={e => updateFields({ password: e.target.value })} />
      </div>
      <div className='form-field'>
        <label>Confirm your password</label>
        <input className='form-control' required type='password' value={confirmPassword} onChange={e => updateFields({ confirmPassword: e.target.value })} />
      </div>
    </FormWrapper>
  )
}
