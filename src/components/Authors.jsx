import React from 'react'
import authorsImg from "../assets/images/Authors.png"

const Authors = () => {
  return (
    <section className="author-section" id="authors">
      <h2>Meet the Authors</h2>
      <div>
        <img src={authorsImg} alt="" />
      </div>
    </section>
  );
}

export default Authors
