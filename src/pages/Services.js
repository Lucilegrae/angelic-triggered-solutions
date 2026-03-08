import React from "react";
import { motion } from "framer-motion";
import "./../theme.css";

function Services() {
  const services = [
    { icon: "⚙️", title: "Infrastructure Healing", description: "Modular construction and sustainable engineering." },
    { icon: "🎨", title: "Branding Rituals", description: "Expressive logos, letterheads, and stakeholder decks." },
    { icon: "📜", title: "Ceremonial Storytelling", description: "Scripts, slogans, pledges, and communal engagement." }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.section
      style={{ padding: "40px", textAlign: "center" }}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <h1 style={{ color: "#004080", marginBottom: "20px" }}>Our Services</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="card"
          >
            <div className="icon-pulse">{service.icon}</div>
            <h2 style={{ color: "#004080" }}>{service.title}</h2>
            <p style={{ color: "#555" }}>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Services;
