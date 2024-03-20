import { FormWrapper } from '../FormWrapper'

export const UserForm = ({ name, userName, email, birthDay, updateFields }) => {
  return (
    <FormWrapper title='Tell us about you'>
      <div className='form-field'>
        <label>What is your name?</label>
        <input className='form-control' autoFocus required type='text' value={name} onChange={e => updateFields({ name: e.target.value })} />
      </div>
      <div className='form-field'>
        <label>How would you like to be called in Trendingverse?</label>
        <input className='form-control' required type='text' value={userName} onChange={e => updateFields({ userName: e.target.value })} />
      </div>
      <div className='form-field'>
        <label>Provide an email</label>
        <input className='form-control' required type='email' value={email} onChange={e => updateFields({ email: e.target.value })} />
      </div>
      <div className='form-field'>
        <label>When is your birthday?</label>
        <input className='form-control' required type='date' value={birthDay} onChange={e => updateFields({ birthDay: e.target.value })} />
      </div>
    </FormWrapper>
  )
}
