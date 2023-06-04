import React, { useState } from 'react';
import './Navbar.css';
import './index.css';

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const showShadow = () => {
    if (window.scrollY > 50) {
      setNavbar(true);
    }
    else {
      setNavbar(false);
    }

  }
  window.addEventListener('scroll', showShadow);


  return (
    <nav className={navbar ? 'navbar' : 'navbar'}>
      <div className='logo-container'>
        <h3><a href="/"><span className='logo-left'>Prathamik</span>
          <span className='logo-right'></span>
        </a></h3>
      </div>

      {/* <ul className='navigations-tabs'>
        <li><a href="/">Home</a></li>
        <li><a href="/">Booking Form</a></li>
        <li><a href="/">Category</a></li>
        <li><a href="/">About Us</a></li>
      </ul> */}

      <div className='login-signup-container'>
        <button type="button" className='login'>Log in</button>
        <button type="button" className='signup'>Sign up</button>
      </div>
    </nav>
  );
}

export default Navbar;