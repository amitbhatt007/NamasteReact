import React from "react";
import "./error.scss";

const Error = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-emoji">😵</div>
        <h1>Oops! Something went wrong</h1>
        <p>Don't worry, even the best chefs burn the toast sometimes! 🍞🔥</p>
        <p>Let's try again and get back to delicious food.</p>
        <button className="retry-btn" onClick={handleRetry}>
          Try Again 🥳
        </button>
      </div>
    </div>
  );
};

export default Error;
