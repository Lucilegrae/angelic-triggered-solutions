import React, { useState } from "react";

function Contact() {
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
    alert(`Thank you, ${formData.name}! Your message has been received.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#004080", marginBottom: "30px" }}>
        Contact Us
      </h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#004080",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
