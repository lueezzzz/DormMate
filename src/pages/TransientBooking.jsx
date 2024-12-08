import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Headline from "@/components/Headline";
import Footer from "@/components/Footer";
import "../css/TransientBooking.css"
import BookingForm from "@/components/BookingForm";


const TransientBooking = () => {
  const location = useLocation();
  const { title, image, avl_rooms } = location.state || {};

  return (
    <>
      <Navbar />
      <Headline
        header="Booking Information"
        subHeader="Please fill up the blank fields below"
      />
      <section className="transient-booking-section">
        <div className="left-section">
          <h2 className="text-2xl font-bold">{title}</h2>
          <img src={image} alt={title} className="transient-image" />
          <p className="text-lg mt-2">Available Rooms: {avl_rooms}</p>
        </div>
        <div className="right-section">
          <BookingForm />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TransientBooking;
