import React from "react";
import "../css/Hero.css";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="hero" id="home">
        <div className="container bg-gradient-to-r from-orange-300 via-orange-300 to-orange-400">
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
            <button className="cta-btn" onClick={() => navigate("/login")}> Get Started </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
