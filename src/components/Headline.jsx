import React from "react";

const Headline = ({ header, subHeader }) => {
  return (
    <>
      <div className="headline-content">
        <h1>{header}</h1>
        <p>{subHeader}</p>
      </div>
    </>
  );
};

export default Headline;
