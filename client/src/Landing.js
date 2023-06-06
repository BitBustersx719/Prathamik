import React from 'react';
import './Landing.css';

function Landing()
{
    return(
        <div className='parent'>

            <div className='details'>
                <h1>Learn. Anywhere. Anytime.</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
                <button>Read More</button>
                <div className='circles'>
                    <span style={{backgroundColor: '#18405A'}}></span>
                    <span style={{backgroundColor: '#355F75'}}></span>
                    <span style={{backgroundColor: '#B6C5CE'}}></span>
                </div>
            </div>

            <div className='background_image'></div>
        </div>
    );
}

export default Landing;

