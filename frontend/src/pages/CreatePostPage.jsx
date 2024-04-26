import React from 'react'
import { useEffect, useState } from 'react'
import { ThreadPoster } from '../components/ThreadPoster'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { PeageHeader } from '../components/PeageHeader'
import { v4 as uuid } from 'uuid'
import { usePosts } from '../contexts/PostsContext'

export const CreatePostPage = () => {

  const { createMainPost, createThread, errors: postErrors } = usePosts()

  /* Array de post */
  const [postArray, setPostArray] = useState([
    {
      temp_id: uuid(),
      content: '',
      attachment: ''
    }
  ])

  const onSubmit = async () => {
    if(postArray.length > 1) {
      await createThread(postArray)
    } else {
      await createMainPost(postArray[0])
    }
  }

  /** Muestra en un toast el error o errores desde el backend */
  useEffect(() => {
    postErrors.map((error, i) => {
      toast.error(error.message)
    })
  }, [postErrors])

  /* Bool: verifica si el post es el ultimo en el thread */
  const [lastPostEmpty, setLastPostEmpty] = useState(true)

  /* Bool: veritica si hay un elemento vacio en el thread */
  const [postArrayElementEmpty, setPostArrayElementEmpty] = useState(false)

  /* Actualiza los valores de texto de un post en el thread */
  const updateContent = (newContent, index) => {
    const newPostArray = [...postArray]
    newPostArray[index].content = newContent
    setPostArray(newPostArray)
  }

  /* Actualiza el valor del archivo cargado de un post en el thread */
  const updateAttachment = (newAttachment, index) => {
    const newPostArray = [...postArray]
    newPostArray[index].attachment = newAttachment
    setPostArray(newPostArray)
  }

  /* Verifica que el ultimo post sea vacio o no */
  useEffect(() => {
    const postArrayLastIndex = postArray[postArray.length - 1]
    if (postArrayLastIndex.content === '' && postArrayLastIndex.attachment === '') {
      setLastPostEmpty(true)
    } else {
      setLastPostEmpty(false)
    }
  }, [postArray])

  /* Verifica que ningun post en el array este vacio */
  useEffect(() => {
    let emptyElementFound = false
    postArray.forEach((thread) => {
      if (thread.content === '' && thread.attachment === '') {
        emptyElementFound = true
      }
    })
    emptyElementFound ? setPostArrayElementEmpty(true) : setPostArrayElementEmpty(false)
  }, [postArray])
  
  /* Crea un nuevo post vacio en el thread */
  const addPost = () => {
    if (!lastPostEmpty) {
      const newPostArray = [...postArray,
        {
          temp_id: uuid(),
          content: '',
          attachment: ''
        }]
      setPostArray(newPostArray)
    }
  }

  /* Elimina un post del thread */
  const removePost = (index) => {
    /* No se puede remover el primer elemento del array (post padre) */
    if (index !== 0) {
      const newPostArray = [...postArray]
      newPostArray.splice(index, 1)
      setPostArray(newPostArray)
    } else {
      toast.error('You cannot remove the parent post')
    }
  }

  return (
    <main className='create-post-container bg-body-tertiary'>
      <PeageHeader>
        <h5 className='m-0'>Create post</h5>
        <div className='ms-auto'>
          <button
            className='btn btn-icon text-primary fs-3 rounded-pill px-3'
            onClick={addPost}
            hidden={!!lastPostEmpty}
            title='Create thread'
          >
            <i className='bi bi-plus-circle' />
          </button>
          <button
            className='btn btn-primary rounded-pill px-3'
            onClick={ onSubmit }
            disabled={!!lastPostEmpty || postArrayElementEmpty}
          >
            Post
          </button>
        </div>
      </PeageHeader>
      <div className='posts-container d-flex flex-column gap-3 min-vh-100'>
        {postArray.map(({ temp_id, content, attachment }, index) => (
          /* Itera sobre el array y crea componentes de ThreadPoster */
          <div key={temp_id} className='post'>
            <ThreadPoster
              isEnabled
              content={content}
              attachment={attachment}
              handleUpdateContent={(newContent) => updateContent(newContent, index)}
              handleUpdateAttachment={(newAttachment) => updateAttachment(newAttachment, index)}
              handleRemovePostElement={() => { removePost(index) }}
              isFirstPost={index === 0}
            />
          </div>
        ))}
      </div>
    </main>
  )
}
