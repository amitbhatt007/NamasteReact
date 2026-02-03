import React, { useState } from "react";
import "./contactUs.scss";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Simply browse restaurants, add items to cart, and checkout. We'll handle the rest!",
    },
    {
      question: "What are your delivery hours?",
      answer: "We deliver 24/7, but restaurant availability may vary.",
    },
    {
      question: "How can I track my order?",
      answer: "You'll receive SMS updates and can track via our app.",
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        alert(`Thank you, ${formData.name}! We'll get back to you soon.`);
        setFormData({ name: "", email: "", message: "" });
        setSubmitted(false);
      }, 1000);
    }
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Have questions? Reach out to us!</p>

      <div className="contact-content">
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-msg">{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={errors.message ? "error" : ""}
              ></textarea>
              {errors.message && (
                <span className="error-msg">{errors.message}</span>
              )}
            </div>
            <button type="submit" className="submit-btn" disabled={submitted}>
              {submitted ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>
            <strong>Address:</strong> 123 Food Street, Flavor City, FC 12345
          </p>
          <p>
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p>
            <strong>Email:</strong> support@namastereact.com
          </p>
          <p>
            <strong>Hours:</strong> Mon-Fri 9AM-6PM
          </p>

          <div className="faq">
            <h4>Frequently Asked Questions</h4>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                </button>
                {openFAQ === index && (
                  <p className="faq-answer">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
