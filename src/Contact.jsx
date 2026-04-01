import React from "react";
import { useState } from "react";
import "./theme.css";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out! Covenant received.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="contact aura-bg">
      <h1 className="slogan-arc aura-heading">✦ Contact Us ✦</h1>
      <p className="pledge-line">
        Every message is a glyph — covenantally affirmed and spiritually resonant.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <button type="submit" className="aura-button">
          ✦ Send Covenant ✦
        </button>
      </form>

      <div className="contact-details">
        <h2 className="slogan-arc aura-heading">Our Details</h2>
        <p>5 Elephant Close, Borrowdale West, Harare, Zimbabwe</p>
        <p>Phone: +263 785 002 561 | +263 779 129 187</p>
        <p>Email: info@angelictriggeredsolutions.co.zw</p>
      </div>
    </main>
  );
}
