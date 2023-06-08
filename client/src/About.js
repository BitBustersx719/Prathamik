import React, { useEffect, useState } from 'react';
import './About.css';
import './index.css';
import Community from './images/community.png';
import Experience from './images/experience.png';
import Expert from './images/expert.png';
import Technology from './images/technology.png';

function Navbar() 
{
  const [shouldRender,setShouldRender]=useState(false);
  useEffect(()=>
  {
    const timer=setTimeout(()=>
      {
        setShouldRender(true);
      }, 100);
      return () => clearTimeout(timer); 
  },[]);


  return (
    <div>
      {shouldRender && <div className='about_container'>
        <div className='about_heading'>
            <h1>About Us</h1>
            <div className='about_line'></div>
        </div>
        
        <div className='about_blocks'>
            <div className='community'>
                <img src={Community} />
                <div className='description'>
                    <h2>Who We Serve</h2>
                    <p>At Prathamik, we are dedicated to providing accessible education for individuals of all backgrounds and ages. Our platform serves a diverse community of learners who are passionate about personal growth and expanding their knowledge. We offer a wide range of courses tailored to meet the needs of different learners. Whether you're a student aiming to excel academically, a professional.</p>
                </div>
            </div>

            <div className='technology'>
                <div className='description'>
                    <h2>Cutting-Edge Features and Technology</h2>
                    <p>At the heart of our e-learning platform lies cutting-edge technology that drives an innovative and immersive learning experience. We leverage the latest advancements in educational technology to deliver dynamic and interactive course content. From virtual simulations and augmented reality to adaptive learning algorithms, we harness technology to enhance comprehension, engagement.</p>
                </div>
                <img src={Technology} />
            </div>

            <div className='expert'>
                <img src={Expert} />
                <div className='description'>
                    <h2>Our Team of Experts</h2>
                    <p>We take pride in our team of experts who are passionate about education and dedicated to providing the highest quality learning experience. Our instructors are industry professionals, subject matter experts, and experienced educators who bring their wealth of knowledge and practical insights into the courses they teach. With their guidance, you can be confident that you are learning.</p>
                </div>
            </div>

            <div className='experience'>
                <div className='description'>
                    <h2>A Seamless User Experience</h2>
                    <p>At [Website Name], we are committed to providing a seamless learning experience from start to finish. Our user-friendly platform is designed with intuitive navigation and clear instructions, making it easy for you to navigate through courses, access resources, and track your progress. We understand that your time is valuable, so we strive to ensure that every aspect of your learning experience.</p>
                </div>
                <img src={Experience} />
            </div>

        </div>
      </div>}
    </div>
  );
}

export default Navbar;

