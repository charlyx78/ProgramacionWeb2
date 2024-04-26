import React, { useRef, useState } from 'react'
import { FormWrapper } from '../FormWrapper'
import { ErrorAlert } from '../ErrorAlert'

export const TagsForm = ({ register, errors, tags, updateFields }) => {

  const tagInput = useRef()
  const tagButton = useRef()
  
  const [tagsArray, setTagsArray] = useState([])

  const addTagToArray = () => {
    const tag = tagInput.current.value
    const newTagArray = [...tagsArray, {name: tag}]
    setTagsArray(newTagArray)
    tagInput.current.value = ''
    tagInput.current.focus()
    updateFields({ tags: [...tags, { name: tag }] }) // Aquí se corrigió la llamada a updateFields
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
                <div className="form-check">
                  <input
                    {...register('tags', {required: 'At least 5 tags are required'})}
                    className="form-check-input"
                    name='tags'
                    type="checkbox"
                    value={JSON.stringify({name: tag.name})}
                    onChange={(e) => {
                      const tagName = e.target.value
                      const isChecked = e.target.checked

                      if (isChecked) {
                        updateFields({ tags: [...tags, { name: tagName }] })
                      } else {
                        const updatedTags = tags.filter((t) => t.name !== tagName)
                        updateFields({ tags: updatedTags })
                      }
                    }}
                    checked={tags.some((t) => t.name === tag.name)} // Marca la checkbox si la etiqueta está presente en tags
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
