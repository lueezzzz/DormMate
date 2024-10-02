import React from 'react'
import Navbar from '../components/Navbar';
import "../index.css"
import Hero from '../components/Hero';
import About from '../components/About';
import Feature from '../components/Feature';
import Authors from '../components/Authors';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Navbar />
      <Feature/>
      <About/>
      <Authors/>
    </>
  );
}

export default LandingPage
