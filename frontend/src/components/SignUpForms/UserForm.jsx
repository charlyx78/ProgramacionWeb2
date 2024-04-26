import React from 'react'
import { FormWrapper } from '../FormWrapper'
import { ErrorAlert } from '../ErrorAlert'

export const UserForm = ({ register, errors, name, lastName, userName, email, birthDate, updateFields }) => {
  return (
    <FormWrapper title='Tell us about you'>
      <div className='form-field'>
        <label>Name</label>
        <input 
          {...register('name', { required: 'Name is required.' })}
          className='form-control' 
          autoFocus
          type='text' 
          value={name} 
          onChange={e => updateFields({ name: e.target.value })} 
        />
        {errors.name && (
          <ErrorAlert>
            {errors.name.message}
          </ErrorAlert>
        )}
      </div>
      <div className='form-field'>
        <label>Last name</label>
        <input 
          {...register('last_name', { required: 'Last name is required.' })}
          className='form-control' 
          type='text' 
          value={lastName} 
          onChange={e => updateFields({ lastName: e.target.value })}
        />
        {errors.last_name && (
          <ErrorAlert>
            {errors.last_name.message}
          </ErrorAlert>
        )}
      </div>
      <div className='form-field'>
        <label>Username</label>
        <input 
          {...register('username', { required: 'Userame is required.' })}
          className='form-control' 
          type='text' 
          value={userName}
          onChange={e => updateFields({ userName: e.target.value })}
        />
        {errors.username && (
          <ErrorAlert>
            {errors.username.message}
          </ErrorAlert>
        )}
      </div>
      <div className='form-field'>
        <label>Email</label>
        <input 
          {...register('email', { required: 'Email is required.' })}
          className='form-control' 
          type='email' 
          value={email} 
          onChange={e => updateFields({ email: e.target.value })} 
        />
        {errors.email && (
          <ErrorAlert>
            {errors.email.message}
          </ErrorAlert>
        )}
      </div>
      <div className='form-field'>
        <label>Birth date</label>
        <input 
          {...register('birth_date', { required: 'Birth date is required.' })}
          className='form-control' 
          type='date' 
          value={birthDate} 
          onChange={e => updateFields({ birthDate: e.target.value })}
        />
        {errors.birth_date && (
          <ErrorAlert>
            {errors.birth_date.message}
          </ErrorAlert>
        )}
      </div>
    </FormWrapper>
  )
}
