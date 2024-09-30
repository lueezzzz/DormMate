import React from 'react'
import leafImg from "../assets/images/Leaf1.png";
import fillerImg from "../assets/images/Filler1.png";

const Feature = () => {
  return (
    <section className="feature-section" id='about'>
      <img src={leafImg} className="leaf-img" alt="leaf-image" />
      <div className="feature-container">
        <img src={fillerImg} className="filler-img"  alt="filler-image" />
        <div className="feature-content">
          <h2>Discover the key features of DormMate</h2>
          <p>
            DormMate is designed to simplify life in dorms, whether you’re a
            dormer, a transient, or an admin managing operations.
          </p>
          <ul className='features'>
            <li>File Permits Whenever, Wherever.</li>
            <li>Managing dormers made easier.</li>
            <li>Managing dormers made easier.</li>
            <li>Managing dormers made easier.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Feature
