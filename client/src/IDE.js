import React, { useState, useRef , useEffect } from 'react';
import Editor from '@monaco-editor/react';
import './IDE.css';
import '@fortawesome/fontawesome-free/css/all.css';
import io from "socket.io-client";


const socket = io.connect("http://localhost:3000");

const initialFiles = [
  {
    name: "",
    language: "text",
    value: "",
    icon: "fas fa-file-alt"
  }
]

function IDE(props) {
  const [files, setFiles] = useState(initialFiles);
  const [fileIndex, setfileIndex] = useState(0);
  const editorRef = useRef(null);
  const [showAddBox, setShowAddBox] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileLanguage, setNewFileLanguage] = useState('html');
  const [ideValue, setIdeValue] = useState("");
  const [user, setUser] = useState("student");

  useEffect(() => {
    socket.on("ide_value", (data) => {
      setIdeValue(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("ide_file", (data) => {
      setFiles(data);
    });
  }, [socket]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function handleEditorChange(value) {
    props.setCode(value);
    socket.emit("send_value", value);
  }

  function handleAddFile() {
    const newFile = {
      name: newFileName,
      language: newFileLanguage,
    }
    if (newFileLanguage === 'javascript') {
      newFile.value = '// Enter your js code here';
      newFile.icon = 'fab fa-js-square';
    } else if (newFileLanguage === 'python') {
      newFile.value = '# Enter your py code here';
      newFile.icon = 'fab fa-python';
    } else if (newFileLanguage === 'java') {
      newFile.value = '// Enter your java code here';
      newFile.icon = 'fab fa-java';
    } else if (newFileLanguage === 'c') {
      newFile.value = '// Enter your c code here';
      newFile.icon = 'fab fa-cuttlefish';
    } else if (newFileLanguage === 'cpp') {
      newFile.value = '// Enter your c++ code here';
      newFile.icon = 'fab fa-cuttlefish';
    } else if (newFileLanguage === 'html') {
      newFile.value = '<!-- Enter your html code here -->';
      newFile.icon = 'fab fa-html5';
    } else if (newFileLanguage === 'css') {
      newFile.value = '/* Enter your css code here */';
      newFile.icon = 'fab fa-css3-alt';
    } else if (newFileLanguage === 'text') {
      newFile.value = '';
      newFile.icon = 'fas fa-file-alt';
    }
    setFiles([...files, newFile]);
    setShowAddBox(false);

    socket.emit("send_file", newFile);
  }

  const [filesArrowRotate,setFilesArrowRotate]=useState(true);
  const [toolsArrowRotate,setToolsArrowRotate]=useState(false);
  const [filesShow,setFilesShow]=useState(true);
  const [toolsShow,setToolsShow]=useState(false);
  function handleFilesHeadingClick()
  {
    setToolsShow(false);
    setToolsArrowRotate(false);
    if (filesArrowRotate)
    {
      setFilesShow(false);
      setFilesArrowRotate(false);
      setShowAddBox(false);
      // setToolsArrowRotate(false);
    }
    else
    {
      setFilesShow(true);
      setFilesArrowRotate(true);
    }
  }

  function handleToolsHeadingClick()
  {

    setFilesShow(false);
    setFilesArrowRotate(false);
    if (toolsArrowRotate)
    {
      setToolsShow(false);
      setToolsArrowRotate(false);
    }
    else
    {
      setToolsShow(true);
      setToolsArrowRotate(true);
    }
  }


  return (
    <div>
      <div className='ide_parent'>
        {/* <div className='language_list'>
          <button onClick={() => setShowAddBox(true)}>Add File</button>
          {showAddBox && <div className='addFilePanel' style={{ display: 'inline' }}>
            <input type='text' placeholder='Enter file name' onChange={(e) => setNewFileName(e.target.value)} />
            <select onChange={(e) => setNewFileLanguage(e.target.value)} value={newFileLanguage}>
              <option value='html'>HTML</option>
              <option value='css'>CSS</option>
              <option value='javascript'>Javascript</option>
              <option value='java'>Java</option>
              <option value='cpp'>C++</option>
              <option value='python'>Python</option>
            </select>
            <button onClick={handleAddFile}>Add</button>
          </div>}
          <input type='radio' value='teacher' onChange={(event) => setUser(event.target.value)} /> Teacher
          {files.map((file, index) =>
            <div>
              {index !== 0 && <button key={index} onClick={() => setfileIndex(index)}>
                {file.language === 'text' ? <i className="fas fa-file-alt"></i> : <i className={`fab fa-${file.icon}`}></i>
                }
                {file.name}
              </button>}
              <div className='line'></div>
            </div>
          )}
          <button onClick={() => props.setShow('board')}>Switch to Board</button>
        </div> */}
        <div className='left_block'>

          <div className='files_container'>

            <div className='files_heading'>
                
                <div className='files_heading_left' onClick={handleFilesHeadingClick}>
                  <span className={filesArrowRotate?'arrow_rotate_down':'arrow_rotate_up'}>
                    <i class="fa-solid fa-angle-down"></i>
                  </span>
                  <h4>Files</h4>
                </div>

                <div className='files_heading_right'>
                  <span className='add_file'onClick={() => {setShowAddBox(true);setFilesShow(true);setFilesArrowRotate(true);setToolsArrowRotate(false);setToolsShow(false)}}>
                    <i class="fa-solid fa-file-circle-plus"></i>
                  </span>
                  <span className='three_dot'>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </span>
                </div>

            </div>

            <div className={filesShow?'files_show':'files_hide'}>
            {/* <button onClick={() => setShowAddBox(true)}>Add File</button> */}
              {showAddBox && <div className='addFilePanel'>
                <input type='text' placeholder='Enter file name' onChange={(e) => setNewFileName(e.target.value)} />
                <select onChange={(e) => setNewFileLanguage(e.target.value)} value={newFileLanguage}>
                  <option value='html'>HTML</option>
                  <option value='css'>CSS</option>
                  <option value='javascript'>Javascript</option>
                  <option value='java'>Java</option>
                  <option value='cpp'>C++</option>
                  <option value='python'>Python</option>
                </select>
                <button onClick={handleAddFile}>Add</button>
              </div>}

              <div className='file'>
                  {files.map((file, index) =>
                    <div>
                      {index !== 0 && <button key={index} onClick={() => setfileIndex(index)}>
                        {file.language === 'text' ? <i className="fas fa-file-alt"></i> : <i className={`fab fa-${file.icon}`}></i>
                        }
                        {file.name}
                      </button>}
                      {/* <div className='line'></div> */}
                    </div>
                  )}
              </div>
            </div>
            
          </div>
          
          <div className='tools_container'>
            <div className='tools_heading' onClick={handleToolsHeadingClick}>
              <span className={toolsArrowRotate?'arrow_rotate_down':'arrow_rotate_up'}>
                <i class="fa-solid fa-angle-down"></i>
              </span>
              <h4>Tools</h4>
            </div>

            <div className={toolsShow?'tools_show':'tools_hide'}>

            </div>
          </div>


        </div>
        {user === 'teacher' && <Editor className='ide_in_ide_container'
          height="500px"
          width="900px"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          path={files[fileIndex].name}
          defaultLanguage={files[fileIndex].language}
          defaultValue={files[fileIndex].value}
        />}
        {user === 'student' && <Editor className='ide_in_ide_container'
          height="500px"
          width="900px"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          path={files[fileIndex].name}
          defaultLanguage={files[fileIndex].language}
          defaultValue={files[fileIndex].value}
          value={ideValue}
          options={{
            readOnly: true
          }}
        />}
        {ideValue}
      </div>
    </div>
  );
}

export default IDE;

