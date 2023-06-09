import React, { useState } from 'react';
import './Landing.css';
import './index.css';


function Landing()
{
    const [shouldRender,setShouldRender]=useState(false);
    useState(()=>
    {
        const timer=setTimeout(()=>
        {
            setShouldRender(true);
        }, 100);
        return () => clearTimeout(timer);
    },[]);

    return(
        <div>
            <div className='landing_parent'>
                <div className='details'>
                    <h1>Learn. Anywhere. Anytime.</h1>
                    <p>
                    Prathamik is an online learning platform designed to empower teachers and provide a seamless experience for students. With the assistance of an AI bot, teachers can efficiently solve students' doubts and enhance the learning process.
                    </p>
                    <button>Get Started</button>
                    <div className='circles'>
                        <span style={{backgroundColor: '#18405A'}}></span>
                        <span style={{backgroundColor: '#355F75'}}></span>
                        <span style={{backgroundColor: '#B6C5CE'}}></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;

