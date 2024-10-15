import React from "react";
import fillerImg2 from "../assets/images/Filler2.png"
import "../css/Helpers.css"
import "../css/About.css"

const About = () => {
  return (
    <>
      <section className="about section-center">
        <div className="about-content">
          <h2>About us</h2>
          <p>
            At DormMate, we believe that managing dorm life should be simple,
            seamless, and accessible to everyone. Whether you're a dormer, a
            transient or a dorm admin, our platform is designed to put you in
            control. We provide an all-in-one solution for handling everything
            from filing permits, managing room availability and transient
            bookings—whenever and wherever you need it.
          </p>
        </div>
        <div>
          <img src={fillerImg2} alt="filler-img2" className="filler-img2" />
        </div>
      </section>
    </>
  );
};

export default About;
