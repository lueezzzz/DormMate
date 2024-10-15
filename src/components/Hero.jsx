import React from "react";
import bezeledShape from "../assets/images/BezeledShape.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="hero-section">
        <img src={bezeledShape} alt="Hero background" className="hero-img" />
        <div className="hero-content">
          <h1>
            Your Ultimate Dorm Manager! File, Organize, Stay Informed — All in
            One Place.
          </h1>
          <p>
            Streamline your dorm experience with tools to easily file permits,
            stay updated on announcements, and manage everything in one place.
            Dorm life made simple!
          </p>
          <button className="cta-btn" onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;
