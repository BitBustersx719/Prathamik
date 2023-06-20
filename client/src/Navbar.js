import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import './index.css';

function Navbar()
{
  
  const [navbarShadow, setNavbarShadow] = useState(false);
  const [navTabscolor, setNavTabsColor]= useState(false);
  const [loginSignupColor, setLoginSignupColor]= useState(false);
  const showShadow = () => {
    if (window.scrollY > 50)
    {
      setNavTabsColor(true);
      setLoginSignupColor(true);
      setNavbarShadow(true);
    }
    else 
    {
      setNavTabsColor(false);
      setLoginSignupColor(false);
      setNavbarShadow(false);
    }
  }
  window.addEventListener('scroll', showShadow);

  
  const [profileDetailsShow, setProfileDetailsShow]=useState(false);

  function handleProfileClick()
  {
    if (profileDetailsShow)
      setProfileDetailsShow(false);
    else 
      setProfileDetailsShow(true);
  }
  
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => 
  {
    // window.location.reload();
    localStorage.removeItem('user');
  };


  if (user)
  {
    return (
      <div>
        <nav className={navbarShadow ? 'transparency' : 'navbar'}>
          <a href='http://localhost:3000/' className='logo-container'>
              <div className='logo'>  </div>
              <h1>Prathamik</h1>
          </a>

          <ul className='navigations-tabs'>
            <li><a href="/">HOME</a></li>
            <Link className='li' to="/platform">PLATFORM</Link>
            <Link className='li' to="/stream">STREAM</Link>
            <Link className='li' to="/streamjoin">STREAMJOIN</Link>
            <li className='navbar_profile' onClick={handleProfileClick}>
              {/* <img src={User}/> */}
              <div className='user_img'>{user.data.name}</div>
              <span><i class="fa-solid fa-angle-down"></i></span>
              {profileDetailsShow && <ul>
                <li>Edit</li>
                <li onClick={handleLogout}>Log out</li>
              </ul>}
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  else
  {
    return (
      <div>
        <nav className={navbarShadow ? 'transparency' : 'navbar'}>
          <a href='http://localhost:3000/' className='logo-container'>
              <div className='logo'>  </div>
              <h1>Prathamik</h1>
          </a>

          <ul className='navigations-tabs'>
            <li><a href="/">HOME</a></li>
            <Link className='li' to="/platform">PLATFORM</Link>
            <Link className='li' to="/stream">STREAM</Link>
            <Link className='li' to="/streamjoin">STREAMJOIN</Link>
            <li className='login-signup-container'>
                <Link to="/login" className='login'>LOG IN</Link>
                <Link to="/signup" className='signup'>SIGN UP</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;

