import React from 'react'
import Navbar from '../components/Navbar';
import "../index.css"
import Hero from '../components/Hero';
import About from '../components/About';
import Feature from '../components/Feature';
import Authors from '../components/Authors';
import Footer from '@/components/Footer';


const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Feature />
      <About />
      <Authors />
      <Footer/>
    </>
  );
}

export default LandingPage
