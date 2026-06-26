import React from "react";
import fillerImg from "../../assets/images/Filler1.png";
import "../../css/Feature.css";
import "../../css/Helpers.css";

const Feature = () => {
  return (
    <section className="feature section-center" id="about">
      <img src={fillerImg} className="filler-img" alt="filler-image" />
      <div className="feature-content">
        <h2>Discover the key features of DormMate</h2>
        <p>
          DormMate is designed to simplify life in dorms, whether you’re a
          dormer, a transient, or an admin managing operations.
        </p>
        <ul className="features">
          <li>File Permits Whenever, Wherever.</li>
          <li>Effortless Room Assignments</li>
          <li>Transients Made Eeasier</li>
        </ul>
      </div>
    </section>
  );
};

export default Feature;
