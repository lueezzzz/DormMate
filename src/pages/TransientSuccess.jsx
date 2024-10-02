import React from 'react'
import Navbar from '../components/Navbar';
import "../index.css"
import SuccessMessage from '@/components/SuccessMessage';


const TransientSuccess = () => {
  return (
    <>
      <Navbar />
      <SuccessMessage />
    </>
  );
}

export default TransientSuccess
