import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import Platform from './Platform';
import 'font-awesome/css/font-awesome.min.css';
import Stream from './Stream';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    { /*<App/>*/} 
    {/* <StreamJoin/> */}
     <Stream/> 
   {/* <Navbar/>
    <Landing/>
    <About/>
    <Service/>
    <Footer/>*/}
    
  </React.StrictMode>
);
