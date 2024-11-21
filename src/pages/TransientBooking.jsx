import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../css/TransientBooking.css"

const TransientBooking = () => {
  const location = useLocation();
  const { title, image, avl_rooms } = location.state || {};

  return (
    <>
      <Navbar />
      <section className="transient-booking-section">
          <div className="text-center">
            <h1 className="text-2xl font-bold">{title}</h1>
            <img src={image} alt={title} className="mx-auto rounded-lg mt-4" />
            <p className="text-lg mt-2">Available Rooms: {avl_rooms}</p>
          </div>
      </section>
      <Footer />
    </>
  );
};

export default TransientBooking;
