import React, { useState } from 'react'
import { SetTextareaAutoHeight } from '../logic/SetTextareaAutoHeight.JS'
import { useChat } from '../contexts/ChatContext'
import { set, useForm } from 'react-hook-form'
import { ErrorAlert } from './ErrorAlert'

export const MessageForm = ({ receiver }) => {

  const { sendMessage } = useChat()

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = handleSubmit(async(values) => {
    const savedMessage = await sendMessage(values)

    if(savedMessage) {
      reset()
    }
  })

  return (
    <div className="w-100">
      <div className='w-100'>
        <div className="card w-100 border-0 border-top rounded-0">
          <div className="card-body w-100">
            <form onSubmit={onSubmit}>
              <div className="d-flex gap-3">
                <textarea className="form-control threadPoster-textarea border"
                  {...register('content', { required: 'Text is required.' })}
                  onChange={e => {
                    SetTextareaAutoHeight(e)
                  }}
                  placeholder='Send message...'
                  autoFocus
                />
                <button className='btn btn-primary'>Send</button>
              </div>
              <input
                {...register('receiver', { required: 'Text is required.' })}
                type="text" hidden
                value={receiver}
              />
              {errors.content && (
                <ErrorAlert>
                  {errors.content.message}
                </ErrorAlert>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
