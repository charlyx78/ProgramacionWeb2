import { FormWrapper } from '../FormWrapper'

export const BiographyForm = ({ register, errors, biography, updateFields }) => {
  return (
    <FormWrapper title='Your biography'>
      <div className='form-field'>
        <label>Tell the world something about you</label>
        <textarea
          {...register('biography')} 
          className='form-control rounded' 
          autoFocus 
          value={biography} 
          onChange={e => updateFields({ biography: e.target.value })} 
        />
      </div>
    </FormWrapper>
  )
}
