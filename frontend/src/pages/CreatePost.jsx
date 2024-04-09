import React from 'react'
import { useEffect, useState } from 'react'
import { ThreadPoster } from '../components/ThreadPoster'
import toast from 'react-hot-toast'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { PeageHeader } from '../components/PeageHeader'

export const CreatePost = () => {
  /** Hook de usuario */
  const { loginUser, getUser } = useUser()

  /* Array de post */
  const [threadArray, setThreadArray] = useState([
    {
      id: uuid(),
      userId: getUser().id,
      stringContent: '',
      fileContent: null,
      likes: 0,
      shared: 0,
      parent: true,
      index: 0,
      parentId: null,
      postDate: new Date(),
      active: 1
    }
  ])

  /** Indice de la publicacion */
  const [counter, setCounter] = useState(0)

  const navigate = useNavigate()

  /* Bool: verifica si el post es el ultimo en el thread */
  const [lastPostEmpty, setLastPostEmpty] = useState(true)

  /* Bool: veritica si hay un elemento vacio en el thread */
  const [threadArrayElementEmpty, setThreadArrayElementEmpty] = useState(false)

  /* Actualiza los valores de texto de un post en el thread */
  const updatePostString = (newPostStringValue, index) => {
    const newThreadArray = [...threadArray]
    newThreadArray[index].stringContent = newPostStringValue
    setThreadArray(newThreadArray)
  }

  /* Actualiza el valor del archivo cargado de un post en el thread */
  const updatePostFile = (newFileValue, index) => {
    const newThreadArray = [...threadArray]
    newThreadArray[index].fileContent = newFileValue
    setThreadArray(newThreadArray)
  }

  /* Verifica que el ultimo post sea vacio o no */
  useEffect(() => {
    const threadArrayLastIndex = threadArray[threadArray.length - 1]
    if (threadArrayLastIndex.stringContent === '' && threadArrayLastIndex.fileContent === null) {
      setLastPostEmpty(true)
    } else {
      setLastPostEmpty(false)
    }
  }, [threadArray])

  /* Verifica que ningun post en el array este vacio */
  useEffect(() => {
    let emptyElementFound = false
    threadArray.forEach((thread) => {
      if (thread.stringContent === '' && thread.fileContent === null) {
        emptyElementFound = true
      }
    })
    emptyElementFound ? setThreadArrayElementEmpty(true) : setThreadArrayElementEmpty(false)
  }, [threadArray])
  /* Crea un nuevo post vacio en el thread */
  const createPost = () => {
    const index = counter + 1
    setCounter(index)
    if (!lastPostEmpty) {
      const newThreadArray = [...threadArray,
        {
          id: uuid(),
          userId: getUser().id,
          stringContent: '',
          fileContent: null,
          likes: 0,
          shared: 0,
          parent: false,
          index: index,
          parentId: threadArray[0].id,
          postDate: new Date(),
          active: 1
        }]
      setThreadArray(newThreadArray)
    }
  }

  /* Elimina un post del thread */
  const removePost = (index) => {
    /* No se puede remover el primer elemento del array (post padre) */
    if (index !== 0) {
      const newThreadArray = [...threadArray]
      newThreadArray.splice(index, 1)
      setThreadArray(newThreadArray)
    } else {
      toast.error('You cannot remove the parent post')
    }
  }

  const postThread = async () => {
    toast.promise(
      handlePostThread(),
      {
        loading: 'Saving...',
        success: <>Thread posted successfully!</>,
        error: <>Sorry, there was a problem posting your thread. Please try again later</>
      }
    ).then((res) => {
      navigate('/feed')
    })
  }

  /** Publicar thread */
  const handlePostThread = async () => {
    try {
      await Promise.all(threadArray.map(async (thread) => {
        await fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(thread)
        })
      }))
      return 'Thread posted successfully'
    } catch (error) {
      throw new Error('Could not save')
    }
  }

  return (
    <main className='create-post-container bg-body-tertiary'>
      <PeageHeader>
        <h5 className='m-0'>Create post</h5>
        <div className='ms-auto'>
          <button
            className='btn btn-icon text-primary fs-3 rounded-pill px-3'
            onClick={createPost}
            hidden={!!lastPostEmpty}
            title='Create thread'
          >
            <i className='bi bi-plus-circle' />
          </button>
          <button
            className='btn btn-primary rounded-pill px-3'
            onClick={postThread}
            disabled={!!lastPostEmpty || threadArrayElementEmpty}
          >
            Post
          </button>
        </div>
      </PeageHeader>
      <div className='posts-container d-flex flex-column gap-3 min-vh-100'>
        {threadArray.map(({ id, stringContent, fileContent }, index) => (
          /* Itera sobre el array y crea componentes de ThreadPoster */
          <div key={id} className='post'>
            <ThreadPoster
              isEnabled
              inputStringValue={stringContent}
              fileValue={fileContent}
              handleUpdatePostStringThread={(newPostStringValue) => updatePostString(newPostStringValue, index)}
              handleUpdatePostFileThread={(newFileValue) => updatePostFile(newFileValue, index)}
              handleRemovePostThread={() => { removePost(index) }}
              isFirstPost={index === 0}
              isLastPost={index === threadArray.length - 1}
            />
          </div>
        ))}
      </div>
    </main>
  )
}
