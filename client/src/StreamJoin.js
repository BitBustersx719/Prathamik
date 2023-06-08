import React, { useEffect, useState } from 'react';
import './index.css';
import './StreamJoin.css';

function StreamJoin()
{

    return(
        <div>
            <div className='streamjoin_parent'>
                <form>
                    <h2>Join Live Classroom</h2>
                    <label htmlFor="name" style={{marginLeft:'-282px'}}>Name</label><br/>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                    /><br />
                    <label htmlFor="id" style={{marginLeft:'-232px'}}>Classroom id</label><br/>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        required
                    /><br />
                    <button>Join</button>
                </form>
            </div>
        </div>
    );

}

export default StreamJoin;