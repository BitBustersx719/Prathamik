import React, { useState } from 'react';
import './Landing.css';

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
            {shouldRender && <div className='parent'>
                <div className='details'>
                    <h1>Learn. Anywhere. Anytime.</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer from the adipiscing elit,diam nonummy nibh euismod fromm tincidunt ut laoreet dolore magna aliquam erat the volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.
                    </p>
                    <button>Read More</button>
                    <div className='circles'>
                        <span style={{backgroundColor: '#18405A'}}></span>
                        <span style={{backgroundColor: '#355F75'}}></span>
                        <span style={{backgroundColor: '#B6C5CE'}}></span>
                    </div>
                </div>
                <div className='background_image'></div>
            </div>}
        </div>
    );
}

export default Landing;

