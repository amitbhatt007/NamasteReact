import React, { useState } from "react";
import "./about.scss";

const About = () => {
  const [activeTab, setActiveTab] = useState("story");

  const tabs = {
    story: {
      title: "Our Story",
      content:
        "Founded in 2020, Namaste React started as a small team passionate about food delivery. We've grown to serve thousands of customers daily, partnering with over 500 restaurants across the city.",
    },
    values: {
      title: "Our Values",
      content:
        "Quality, Speed, and Customer Satisfaction are at our core. We believe in sustainable practices, supporting local businesses, and making food accessible to everyone.",
    },
    team: {
      title: "Meet the Team",
      content:
        "Our diverse team includes chefs, developers, and customer service experts working together to bring you the best experience.",
    },
  };

  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to Namaste React! We're revolutionizing food delivery with
        passion and innovation.
      </p>

      <div className="stats">
        <div className="stat">
          <h2>500+</h2>
          <p>Partner Restaurants</p>
        </div>
        <div className="stat">
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>
        <div className="stat">
          <h2>24/7</h2>
          <p>Support</p>
        </div>
      </div>

      <div className="tabs">
        {Object.keys(tabs).map((key) => (
          <button
            key={key}
            className={`tab-btn ${activeTab === key ? "active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {tabs[key].title}
          </button>
        ))}
      </div>

      <div className="tab-content">
        <h3>{tabs[activeTab].title}</h3>
        <p>{tabs[activeTab].content}</p>
      </div>

      <div className="about-features">
        <div className="feature">
          <h3>Quality</h3>
          <p>
            We partner with top-rated restaurants to ensure high-quality food.
          </p>
        </div>
        <div className="feature">
          <h3>Speed</h3>
          <p>Fast delivery to keep your meals hot and fresh.</p>
        </div>
        <div className="feature">
          <h3>Variety</h3>
          <p>Wide range of cuisines from local and international kitchens.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
