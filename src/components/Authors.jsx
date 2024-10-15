import React from "react";
import "../css/Authors.css";
import "../css/Helpers.css";
import { authors } from "@/utils/mockData";

const Authors = () => {
  return (
    <section className="authors section-center" id="authors">
      <h2>Meet the Authors</h2>
      <div className="author-container">
        {authors.map((author) => (
          <div className="author-card" key={author.name}>
            <img src={author.img} alt={author.name} className="author-img" />
            <div className="overlay">
              <h3>{author.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Authors;
