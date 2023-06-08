import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Navbar';
import Landing from './Landing';
import About from './About';
import StreamJoin from './StreamJoin';
import 'font-awesome/css/font-awesome.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App/> */}
    {/* <Navbar/> */}
    {/* <Landing/> */}
    <About/>
    {/* <StreamJoin/> */}
  </React.StrictMode>
);
