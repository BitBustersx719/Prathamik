import './App.css';
import React from 'react';
import Navbar from './Navbar';
import ChatBox from './ChatBox';
import IDE from './IDE';
import { useState } from 'react';

function App() {
  const [code, setCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');

  const handleInput = async (e) => {
    e.preventDefault();
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

  return (
    <div className="App">
      <Navbar />
      <div className='body'>
        <IDE setCode={setCode} />
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
