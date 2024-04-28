import React, { useRef, useState } from 'react'
import { FormWrapper } from '../FormWrapper'
import { ErrorAlert } from '../ErrorAlert'
import { v4 as uuid } from 'uuid'

// Dentro de tu componente funcional
export const TagsForm = ({ register, errors, tags, updateFields }) => {

  const tagInput = useRef()
  const tagButton = useRef()
  
  const [tagsArray, setTagsArray] = useState(tags)
 
  const addTagToArray = () => {
    const tag = tagInput.current.value
    const newTagArray = [...tagsArray, { temp_id: uuid(), name: tag,  checked: true }]
    setTagsArray(newTagArray)
    tagInput.current.value = ''
    tagInput.current.focus()
    updateFields({ tags: newTagArray })
  }

  const removeTagFromArray = (temp_id) => {
    const updatedTagsArray = [...tagsArray.slice(0, temp_id), ...tagsArray.slice(temp_id + 1)]
    setTagsArray(updatedTagsArray)
    console.log(updatedTagsArray)
    updateFields({ tags: updatedTagsArray })
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

          {tagsArray.map((tag, temp_id, index) => (
            <div className="card" key={temp_id}>
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
                  <button type="button" onClick={() => removeTagFromArray(temp_id)} className="btn btn-danger btn-sm">Remove</button>

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
