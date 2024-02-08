import { useEffect, useState } from 'react';
import Picker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faTimesCircle, faFileImage, faFileVideo, faFile } from '@fortawesome/free-regular-svg-icons';
import reactLogo from '../assets/react.svg'
import { SetTextareaAutoHeight } from '../logic/SetTextareaAutoHeight'

export function Post() {

    const [inputString, setInputString] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [fileImages, setFileImages] = useState([]);

    const addEmoji = (e) => {
        setInputString(prevInputString => prevInputString + e.emoji);
    };

    const getPreviewImage = (file) => {
        return URL.createObjectURL(file)
    }

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
                        <form action="" className='w-100 d-flex flex-column gap-2'>
                            <div className='textarea'>
                                <textarea 
                                    name='postInpt' 
                                    className='form-control border-0 bg-light focus-ring focus-ring-light'
                                    placeholder='What is happening?'
                                    onChange={(e) => {
                                        setInputString(e.target.value);
                                        SetTextareaAutoHeight(e, '150px');
                                    }}
                                    value={inputString}
                                    required
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
                            <div className="footer-post-container">
                                <div className="attach-files-post-container">
                                    <label 
                                        className="btn-label btn-attach-file badge rounded-pill text-bg-primary badge-primary"
                                        htmlFor="postImageInpt"
                                        >
                                        <FontAwesomeIcon
                                            icon={faFileImage}
                                        />
                                        Image
                                    </label>
                                    <label 
                                        className="btn-label btn-attach-file badge rounded-pill text-bg-primary badge-primary"
                                        htmlFor="postVideoInpt"
                                        >
                                        <FontAwesomeIcon
                                            icon={faFileVideo}
                                        />
                                        Video
                                    </label>
                                    <label 
                                        className="btn-label btn-attach-file badge rounded-pill text-bg-primary badge-primary"
                                        htmlFor="postFileInpt"
                                        >
                                        <FontAwesomeIcon
                                            icon={faFile}
                                            />
                                        File
                                    </label>
                                    <input 
                                        type="file"  
                                        name='postImageInpt' 
                                        id='postImageInpt' 
                                        className='d-none' 
                                        accept='image/jpg,image/jpeg,image/png'
                                        onChange={(e) => {
                                            setFileImages(e.target.files);
                                        }}
                                        />
                                    <input 
                                        type="file"  
                                        name='postVideoInpt' 
                                        id='postVideoInpt' 
                                        className='d-none' 
                                        accept='video/mp4,video/wmv,video/avi'
                                        />
                                    <input 
                                        type="file"  
                                        name='postFileInpt' 
                                        id='postFileInpt' 
                                        className='d-none' 
                                        accept='application/pdf,text/text'
                                        />
                                </div>
                                <button type='button' className="btn btn-primary">Publish</button>
                            </div>
                        </form>
                    </div>

                    {
                        fileImages.length > 0 &&
                        <div className="preview-files-container">
                            <div className='img-publish-post-container'>
                                <img 
                                    src={getPreviewImage(fileImages[0])} 
                                    alt="Image Post" 
                                    className='img-publish-post'
                                />
                                <button 
                                    className='btn btn-secondary btn-remove-image'
                                    onClick={() => {
                                        setFileImages([]);    
                                    }}
                                >
                                    <FontAwesomeIcon 
                                        icon={faTimesCircle}
                                    />
                                </button>                       
                            </div>
                        </div>
                    }
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