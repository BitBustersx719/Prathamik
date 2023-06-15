import React, { useState, useRef , useEffect } from 'react';
import './File.css';

function File()
{
    console.log('File');
    const [newFileName,setNewFileName]=useState('');
    function handleSubmitClick()
    {
        console.log(newFileName);
    }
    return(
        <div>
            <form className='fileForm'>
                <label for="file" class="label-file">File name</label>

                <input 
                type="text" 
                id="file" 
                class="inputfile" 
                onChange={(e)=>setNewFileName(e.target.value)}
                />

                <button onClick={handleSubmitClick}>Create</button>
            </form>
        </div>
    );
}

export default File;