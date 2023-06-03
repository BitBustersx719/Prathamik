import './App.css';
import React from 'react';
import Navbar from './Navbar';
import ChatBox from './ChatBox';
import IDE from './IDE';
import { useState } from 'react';
import Board from './Board';
import { useRef } from 'react';

function App() {
  const [code, setCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState('editor');
  const canvasRef = useRef(null);

  const handleInput = async (e) => {
    e.preventDefault();
   const input = `${code}\n${userInput}\nTell me in less than 50 words.`;

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

  const handleImageInput = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL();

    fetch('http://localhost:3000/image/input', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData , userInput }),
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
    <div className="App">
      <Navbar />
      <div className='body'>
        {show === 'editor' && <IDE setCode={setCode} setShow={setShow} />}
        {show === 'board' && <Board handleImageInput={handleImageInput} canvasRef={canvasRef} />}
        <ChatBox
          message={message}
          setCode={setMessage}
          handleInput={handleInput}
          setUserInput={setUserInput}
        />
      </div>
    </div>
  );
}

export default App;
