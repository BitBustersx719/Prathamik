import './Platform.css';
import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react';
import Navbar from './Navbar';
import ChatBox from './ChatBox';
import IDE from './IDE';
import { useState } from 'react';
import Board from './Board';
import { useRef } from 'react';

function Platform() {
  const [code, setCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState('editor');
  const canvasRef = useRef(null);
  const [input, setInput] =useState('');
  const inputRef = useRef(null);

  const handleInput = async (e) => {
    e.preventDefault();
    setInput(userInput);
    inputRef.current.value = '';
    const input = `${code}\n${userInput}`;

    try {
      const response = await fetch('http://localhost:3000/input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input })
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      setMessage(data.output);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageInput = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = e.target.elements.image.files[0];
    formData.append('image', fileInput);
    fetch('http://localhost:5000/ocr', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Image sent successfully!', data);
      })
      .catch((error) => {
        console.error('Error sending image:', error);
      });
  };
  
  return (
    <div className='platform_parent'>
        {/* <form onSubmit={handleImageInput}>
          <input type="file" name='image' />
          <button type="submit">Submit</button>
        </form> */}
        {show === 'editor' && (
          <div className="ide_in_platform_container">
            <IDE setCode={setCode} setShow={setShow} />
          </div>
        )}

        {show === 'board' && (
          <div className="board_in_platform_container">
            <Board handleImageInput={handleImageInput} canvasRef={canvasRef}/>
          </div>
        )}

        <div className='chat_in_platform_container'>
          <ChatBox
            message={message}
            handleInput={handleInput}
            setUserInput={setUserInput}
            userInput={userInput}
            inputRef={inputRef}
            input={input}
          />
        </div>
          
    </div>
  );
}

export default Platform;