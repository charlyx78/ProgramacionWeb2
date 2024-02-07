import { useState } from 'react';
import Picker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import reactLogo from '../assets/react.svg'
import { SetTextareaAutoHeight } from '../logic/SetTextareaAutoHeight'

export function Post() {

    const [inputString, setInputString] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const addEmoji = (e) => {
        setInputString(prevInputString => prevInputString + e.emoji);
        console.log(inputString)
    };

    return(
        <>
            <div 
                className="card border-0 publish-post-container"
            >
                <div className="card-body">
                    <div 
                        className="d-flex align-items-start gap-3"
                    >
                        <img 
                            src={reactLogo} 
                            className='bg-dark rounded-circle profile-picture-thumbnail' 
                            alt="Profile picture" 
                        />
                        <form action="" className='w-100'>
                            <div className='textarea'>
                                <textarea 
                                    name='postInpt' 
                                    className='form-control border-0 bg-light focus-ring focus-ring-light'
                                    placeholder='What is happening?'
                                    onChange={(e) => {
                                        setInputString(e.target.value);
                                        SetTextareaAutoHeight(e, '100px');
                                    }}
                                    value={inputString}
                                >
                                </textarea>
                                <div className='textarea-options'>
                                    <p className='m-0 text-secondary fw-regular'>{inputString.length}/255</p>
                                    <button
                                        type='button'
                                        className='btn btn-light btn-sm btn-emoji'
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    >
                                        <FontAwesomeIcon 
                                            icon={showEmojiPicker ? faTimesCircle : faSmile}         
                                        />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {showEmojiPicker && 
                    <Picker
                        className='emoji-picker-container'
                        emojiStyle='twitter'
                        onEmojiClick={addEmoji} 
                    />
                }
            </div>
        </>
    )
}