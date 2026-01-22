import React from "react";
import "./shimmer.scss";

const Shimmer = ({ count = 5 }) => {
  return (
    <div className="shimmer-container">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="shimmer-card">
          <div className="shimmer-image"></div>
          <div className="shimmer-text shimmer-title"></div>
          <div className="shimmer-text shimmer-subtitle"></div>
          <div className="shimmer-meta">
            <div className="shimmer-text shimmer-rating"></div>
            <div className="shimmer-text shimmer-time"></div>
          </div>
          <div className="shimmer-text shimmer-address"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;