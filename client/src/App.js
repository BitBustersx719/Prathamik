import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import Navbar from './Navbar';
import Landing from './Landing';
import About from './About';
import Service from './Service';
import Footer from './Footer';
import StreamJoin from './StreamJoin';
import Stream from './Stream';
import Platform from './Platform';
import 'font-awesome/css/font-awesome.min.css';


function App()
{
    return(
        <div>
            {/* <Platform/> */}
            <Navbar/>
            <Landing/>
            <About/>
            <Service/>
            <Footer/>
        </div>
        
    );
}

export default App;
