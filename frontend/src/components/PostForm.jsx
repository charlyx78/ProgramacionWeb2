import React, {useEffect, useRef, useState} from 'react'
import toast from 'react-hot-toast'
import { usePosts } from '../contexts/PostsContext'
import { useForm } from 'react-hook-form'
import { ErrorAlert } from './ErrorAlert'
import { SetTextareaAutoHeight } from '../logic/SetTextareaAutoHeight.JS'
import { useAuth } from '../contexts/AuthContext'
import { UserImage } from './UserImage'
import { REGEX_HASHTAG } from '../constants/regexHashtag.JS'
import { useNavigate } from 'react-router-dom'

export const PostForm = ({ isReplying = false, idPostRelying = null }) => {
  
  const navigate = useNavigate()

  const { user: userLogged } = useAuth()

  const hiddenInputFile = useRef()

  const handleInputFileClick = () => {
    hiddenInputFile.current.click()
  }

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()

  const { createMainPost, replyToPost, errors: postErrors } = usePosts()

  const [content, setContent] = useState('')

  const [selectedFile, setSelectedFile] = useState(null)

  const [tags, setTags] = useState([])

  const onSubmit = handleSubmit(async (values) => {

    await saveTags()
    
    const formTags = Array.isArray(values.tags) ? values.tags : [values.tags]
    /** Parseamos el arreglo de tags */
    const parsedTags = formTags.map((tag) => {
      try {
        return JSON.parse(tag)
      } catch (error) {
        console.error('Error al analizar el tag como JSON:', error)
        return tag
      }
    })
    
    values.tags = parsedTags

    let postCreated

    if(!isReplying) {
      postCreated = await createMainPost(values)
      navigate('/feed')
    } else {
      postCreated = await replyToPost(values)
    }
    
    
    if(postCreated) {
      toast.success(postCreated.message)
      setContent('')
      setSelectedFile(null)
      reset()
      setSelectedFile(null)
    }

  })

  const saveTags = async () => {
    return new Promise((resolve) => {
      var match
      var newTags = []
      while ((match = REGEX_HASHTAG.exec(content)) !== null) {
        var newTag = match[1]
        newTags.push({name: newTag})
      }
      setTags(newTags)
      resolve()
    })
  }

  useEffect(() => {
    postErrors.map((error, i) => {
      console.log(error)
    })
  }, [postErrors])

  return (
    <div className="card bg-body-tertiary rounded border-0" data-aos='zoom-in-up'>
      <div className="card-body">
        <form 
          className='d-flex gap-3'
          onSubmit={onSubmit}
          encType='multipart/form-data'
        >
          <aside>
            <UserImage sourceImage={`http://localhost:3000/${userLogged.picture}`}></UserImage>
          </aside>

          <input type="text" {...register('id')} value={idPostRelying} hidden />

          <section className="form-post-textarea position-relative w-100">
            <textarea 
              {...register('content', { required: 'Text is required.' })}
              name="content"
              className='form-control w-100 threadPoster-textarea pb-5' 
              placeholder={isReplying ? 'Post your reply' : 'What is happening?'}
              onChange={ async(e) => {
                SetTextareaAutoHeight(e)
                setContent(e.target.value)
                await saveTags()
              }
              }
              value={content}
              autoFocus
            >
            </textarea>
            <section className="form-post-button position-absolute d-flex gap-2 bottom-0 end-0 mt-3 py-2 px-4">
              <button type="button" className="btn btn-secondary" onClick={handleInputFileClick}>
                <i className="bi bi-image"></i>
              </button>
              <input 
                {...register('attachment')}
                name='attachment' 
                type="file" 
                accept='.jpg,.jpeg,.png'
                className="form-control d-none"
                ref={hiddenInputFile} 
                onChange={(e) => {
                  setValue('attachment', e.target.files[0])
                  setSelectedFile(e.target.files[0])
                }}
              />
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-send"></i>
              </button>
            </section>
          </section>

          {tags.map((tag) => { 
            return (
              <input
                {...register('tags')}
                key={JSON.stringify(tag)}
                value={JSON.stringify(tag)}       
                name='tags'
                type="checkbox"
                checked 
                className='d-none'
              />
            )
          })}
        </form>
        {errors.content && (
          <ErrorAlert>
            {errors.content.message}
          </ErrorAlert>
        )}
      </div>
    </div>
  )
}
