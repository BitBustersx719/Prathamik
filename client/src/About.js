import React, { useEffect, useState, useRef} from 'react';
import './About.css';
import './index.css';
import Community from './images/community.png';
import Experience from './images/experience.png';
import Expert from './images/expert.png';
import Technology from './images/technology.png';

function About() 
{
    const headingRef = useRef(null);
    const communityRef = useRef(null);
    const technologyRef = useRef(null);
    const expertRef = useRef(null);
    const experienceRef = useRef(null);

    useEffect(() => 
    {
        const observer = new IntersectionObserver((entries, observer) => 
        {
            console.log("intersection done",entries);
            entries.forEach(entry => 
                {
                    if (entry.isIntersecting) 
                    {
                      entry.target.classList.add('showAbout');
                    }
                });
        }, {threshold: 0.5});

        if (headingRef.current) observer.observe(headingRef.current);
        if (communityRef.current) observer.observe(communityRef.current);
        if (technologyRef.current) observer.observe(technologyRef.current);
        if (expertRef.current) observer.observe(expertRef.current);
        if (experienceRef.current) observer.observe(experienceRef.current);

        return () => 
        {
            if (headingRef.current) observer.unobserve(headingRef.current);
            if (communityRef.current) observer.unobserve(communityRef.current);
            if (technologyRef.current) observer.unobserve(technologyRef.current);
            if (expertRef.current) observer.unobserve(expertRef.current);
            if (experienceRef.current) observer.unobserve(experienceRef.current);
        };
    }, []);

  return (
    <div>
      <div className='about_container'>
        <div className='about_heading' ref={headingRef}>
            <h1>About Us</h1>
            <div className='about_line'></div>
        </div>
        
        <div className='about_blocks'>
            <div className='community' ref={communityRef}>
                <img src={Community} />
                <div className='description'>
                    <h2>Who We Serve</h2>
                    <p>At Prathamik, we are dedicated to providing accessible education for individuals of all backgrounds and ages. Our platform serves a diverse community of learners who are passionate about personal growth and expanding their knowledge. We offer a wide range of courses tailored to meet the needs of different learners.</p>
                </div>
            </div>

            <div className='technology' ref={technologyRef}>
                <div className='description'>
                    <h2>Cutting-Edge Technology</h2>
                    <p>At the heart of our e-learning platform lies cutting-edge technology that drives an innovative and immersive learning experience. We leverage the latest advancements in educational technology to deliver dynamic and interactive course content. From virtual simulations and augmented reality to adaptive learning algorithms, we harness.</p>
                </div>
                <img src={Technology} />
            </div>
        </div>
      </div>


      <div className='about_container'>
        <div className='about_blocks'>
            <div className='expert' ref={expertRef}>
                <img src={Expert} />
                <div className='description'>
                    <h2>Our Team of Experts</h2>
                    <p>We take pride in our team of experts who are passionate about education and dedicated to providing the highest quality learning experience. Our instructors are industry professionals, subject matter experts, and experienced educators who bring their wealth of knowledge and practical insights into the courses they teach.</p>
                </div>
            </div>

            <div className='experience' ref={experienceRef}>
                <div className='description'>
                    <h2>Seamless User Experience</h2>
                    <p>At Prathamik, we are committed to providing a seamless learning experience from start to finish. Our user-friendly platform is designed with intuitive navigation and clear instructions, making it easy for you to navigate through courses, access resources, and track your progress. We understand that your time is valuable, so we strive to.</p>
                </div>
                <img src={Experience} />
            </div>
        </div>
      </div>

    </div>
  );
}

export default About;