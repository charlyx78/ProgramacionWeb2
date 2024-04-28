import React, { useRef, useState } from 'react'
import { FormWrapper } from '../FormWrapper'
import { ErrorAlert } from '../ErrorAlert'
import { useForm } from 'react-hook-form'

// Dentro de tu componente funcional
export const TagsForm = ({ register, errors, tags, updateFields }) => {

  const tagInput = useRef()
  const tagButton = useRef()
  
  
  const [tagsArray, setTagsArray] = useState(tags)
 
  const addTagToArray = () => {
    const tag = tagInput.current.value
    const newTagArray = [...tagsArray, {name: tag,  checked: true}]
    setTagsArray(newTagArray)
    tagInput.current.value = ''
    tagInput.current.focus()
    updateFields({ tags: newTagArray })
  }
  
  return (
    <FormWrapper title='Which are your interests?'>

      <div className="row">
        <div className="col-8">
          <input type="text" ref={tagInput} className='w-100 form-control' />
        </div>
        <div className="col-4">
          <button type='button' onClick={addTagToArray} ref={tagButton} className='btn btn-primary w-100'>Add</button>
        </div>
      </div>


      <div className="card">
        <div className="card-body d-flex gap-2">

          {tagsArray.length === 0 && (
            <p className='mb-0 text-muted fst-italic'>Type key words and click add to know your interests. For example: art, music, videogames</p>
          )}

          {tagsArray.map((tag, index) => (
            <div className="card" key={index}>
              <div className="card-body">
                <div className="d-flex align-items-center gap-2">
                  <input
                    {...register('tags', {required: 'At least 5 tags are required'})}
                    className="form-check-input d-none"
                    name='tags'
                    type="checkbox"
                    value = { JSON.stringify({name: tag.name}) } 
                    checked = {tag.checked}
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
    </FormWrapper>
  )
}
