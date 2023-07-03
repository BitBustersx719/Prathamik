import React, { useState , useEffect } from 'react';
import './ChatBox.css';
import './index.css';

function ChatBox(props) {

  return (
    <div className='chatbox_parent'>
      <div className='chatbox_header'>
          <img src='/x.png' alt='bot'></img>
          <div className='bot_details'>
            <h3>Cupkaks</h3>
            <p>AI bot</p>
          </div>
      </div>

      <div className='chat_container'>

        {props.chats.map((chat) => (
          <div className={`${chat.ownedByCurrentUser ? "user_chat" : "bot_chat"}`}>
            {!chat.ownedByCurrentUser && <img src={`http://localhost:3000/uploads/${chat.profilePic}`}/>}
            <p>{chat.input}</p>
          </div>
        ))}

      </div>

      <form autoComplete="off">
        <input type='text' name='chat' placeholder='Ask something...'
          onChange={(event) => {
            props.setUserInput(event.target.value);
          }}
          ref={props.inputRef}
        />
        <button type='button' onClick={props.voice}>
          say!
        </button>
        {props.show === 'editor' && <button onClick={props.handleInput}>
          <i class="fa-solid fa-paper-plane"></i>
        </button>}
        {props.show === 'board' && <button onClick={props.handleInputBoard}>
          <i class="fa-solid fa-paper-plane"></i>
        </button>}
      </form>
    </div>
  );
}

export default ChatBox;