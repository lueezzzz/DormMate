import React from 'react'
import check from "../assets/images/check.png"
import { Link } from "react-router-dom";

const SuccessMessage = () => {
  return (
    <>
      <section className="booking-success-message">
        <img src={check} alt="Check Icon" className="check-icon" />
        <div className="success-msg-content">
          <h1>
            Your Reservation Has Been Placed!
          </h1>
          <p>
            Thank you for your reservation.
            We have sent your booking information to your email address.  
          </p>
          <Link to="/">
            <button className="cta-btn">Go to Home</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default SuccessMessage
