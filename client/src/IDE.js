import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import './IDE.css';
import HTML from './images/html1.png';
import CSS from './images/css1.png';
import JS from './images/js1.png';
import CPP from './images/cpp1.png';
import Java from './images/java1.png';
import Python from './images/python1.png';
import '@fortawesome/fontawesome-free/css/all.css';



const files = {
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: "// Start Writing code from here.."
  },
  "index.html": {
    name: "index.html",
    language: "html",
    value: "<!-- Start Writing code from here.. -->"
  }
}

function IDE(props) {
  const [filename, setFilename] = useState("script.js");
  const editorRef = useRef(null);
  const [isHtmlButtonClicked, setIsHtmlButtonClicked]=useState(false);
  const [isCssButtonClicked, setIsCssButtonClicked]=useState(false);
  const [isJsButtonClicked, setIsJsButtonClicked]=useState(false);
  const [isCppButtonClicked, setIsCppButtonClicked]=useState(false);
  const [isJavaButtonClicked, setIsJavaButtonClicked]=useState(false);
  const [isPythonButtonClicked, setIsPythonButtonClicked]=useState(false);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function handleEditorChange(value) {
    props.setCode(value);
  }

  function getEditorValue() {
    alert(editorRef.current.getValue());
  }

  function handleHtmlClick() 
  {
    document.querySelector('.html').style.backgroundColor='#CCCCCC';
    document.querySelector('.css').style.backgroundColor='';
    document.querySelector('.js').style.backgroundColor='';
    document.querySelector('.cpp').style.backgroundColor='';
    document.querySelector('.java').style.backgroundColor='';
    document.querySelector('.python').style.backgroundColor='';
  }

  function handleCssClick() 
  {
    document.querySelector('.html').style.backgroundColor='';
    document.querySelector('.css').style.backgroundColor='#CCCCCC';
    document.querySelector('.js').style.backgroundColor='';
    document.querySelector('.cpp').style.backgroundColor='';
    document.querySelector('.java').style.backgroundColor='';
    document.querySelector('.python').style.backgroundColor='';
  }

  function handleJsClick() 
  {
    document.querySelector('.html').style.backgroundColor='';
    document.querySelector('.css').style.backgroundColor='';
    document.querySelector('.js').style.backgroundColor='#CCCCCC';
    document.querySelector('.cpp').style.backgroundColor='';
    document.querySelector('.java').style.backgroundColor='';
    document.querySelector('.python').style.backgroundColor='';
  }

  function handleCppClick() 
  {
    document.querySelector('.html').style.backgroundColor='';
    document.querySelector('.css').style.backgroundColor='';
    document.querySelector('.js').style.backgroundColor='';
    document.querySelector('.cpp').style.backgroundColor='#CCCCCC';
    document.querySelector('.java').style.backgroundColor='';
    document.querySelector('.python').style.backgroundColor='';
  }

  function handleJavaClick() 
  {
    document.querySelector('.html').style.backgroundColor='';
    document.querySelector('.css').style.backgroundColor='';
    document.querySelector('.js').style.backgroundColor='';
    document.querySelector('.cpp').style.backgroundColor='';
    document.querySelector('.java').style.backgroundColor='#CCCCCC';
    document.querySelector('.python').style.backgroundColor='';
  }

  function handlePythonClick() 
  {
    document.querySelector('.html').style.backgroundColor='';
    document.querySelector('.css').style.backgroundColor='';
    document.querySelector('.js').style.backgroundColor='';
    document.querySelector('.cpp').style.backgroundColor='';
    document.querySelector('.java').style.backgroundColor='';
    document.querySelector('.python').style.backgroundColor='#CCCCCC';
  }

  
  

  return (
    <div>
      <div className='ide_parent'>
        <div className='language_list'>
          <button onClick={() => {setFilename("index.html"); handleHtmlClick()}} className='html'>
              <i class="fa-brands fa-html5"></i>
              HTML
          </button>

          <div className='line'></div>

          <button onClick={handleCssClick} className='css'>
          <i class="fa-brands fa-css3-alt"></i>
            CSS
          </button>

          <div className='line'></div>


          <button onClick={() => {setFilename("script.js") ; handleJsClick()}} className='js'>
            <i class="fa-brands fa-js"></i>
            Javascript
          </button>

          <div className='line'></div>

          {/* <button onClick={getEditorValue}>Get Editor Value</button> */}

          <button className='java' onClick={handleJavaClick}>
            <i class="fa-brands fa-java"></i>
            Java
          </button>

          <div className='line'></div>


          <button className='cpp' onClick={handleCppClick}>
            <img src={CPP} alt="C++"/>
            C++
          </button>

          <div className='line'></div>

          <button className='python' onClick={handlePythonClick}>
            <i class="fa-brands fa-python"></i>
            Python
          </button>

          <div className='line'></div>

          


          {/* <button onClick={() => props.setShow('board')}>Switch to Board</button> */}
        </div>
        <Editor className='editor_container'
          height="500px"
          width="900px"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          path={files[filename].name}
          defaultLanguage={files[filename].language}
          defaultValue={files[filename].value}
        />
      </div>
    </div>
  );
}

export default IDE;

