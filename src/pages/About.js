import React from "react";
import { motion } from "framer-motion";

function About() {
  const team = [
    {
      name: "Prince Masvikepi",
      role: "Founder & CEO",
      icon: "👑",
      description:
        "A visionary systems architect with 18 years of experience across construction, engineering, logistics, and international trade. Prince blends technical precision with spiritual resonance, steering ATS’s mission of sustainable infrastructural healing across Zimbabwe and Africa."
    },
    {
      name: "Aquila Pawar",
      role: "Vice President",
      icon: "🌍",
      description:
        "Global strategist fluent in Dutch, French, and German. Aquila brings expertise in management projects, client counselling, and oncology support — ensuring ATS delivers excellence in both community engagement and international collaboration."
    },
    {
      name: "Victor Machaka",
      role: "Project Management",
      icon: "🏗️",
      description:
        "Architectural mastermind with a Master of Architecture (NUST) and Construction Management specialization from Columbia University. Victor has led landmark projects including Eastgate Market and Standard Chartered Bank Borrowdale Branch, bringing over a decade of design and construction leadership."
    },
    {
      name: "Farai Gomo",
      role: "Vice Project Management",
      icon: "🧱",
      description:
        "Hands-on builder and foreman with 15+ years of experience in construction works, site surveys, and coordination. Farai’s expertise ensures ATS projects are grounded, resilient, and executed with precision."
    }
  ];

  const partners = [
    {
      name: "Regis Muzembe",
      role: "Political Partner",
      icon: "🤝",
      description:
        "Strategic partner guiding the Harare Southlands Slum Restructuring Project. Regis ensures alignment between ATS, government, and community stakeholders, strengthening political collaboration and communal trust."
    }
  ];

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Mission Section */}
      <motion.section
        style={{ marginBottom: "40px", textAlign: "center" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 style={{ color: "#004080", marginBottom: "20px" }}>Our Mission</h1>
        <p style={{ fontSize: "18px", color: "#555" }}>
          At Angelic Triggered Solutions Pvt Ltd, our mission is to heal and uplift communities
          through modular infrastructure, expressive branding, and spiritually resonant storytelling.
          Every project is a living glyph — narratable, motif‑driven, and ready for communal export.
        </p>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        style={{ marginBottom: "40px", textAlign: "center" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h1 style={{ color: "#004080", marginBottom: "20px" }}>Our Vision</h1>
        <p style={{ fontSize: "18px", color: "#555" }}>
          We envision sustainable settlements where technical precision blends seamlessly with expressive overlays.
          Our goal is to create environments that are not only functional but spiritually affirming,
          inviting stakeholders into covenantal participation.
        </p>
      </motion.section>

      {/* Leadership Team Section */}
      <motion.section
        style={{ textAlign: "center", marginBottom: "40px" }}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h1 style={{ color: "#004080", marginBottom: "20px" }}>Leadership Team</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px"
          }}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "25px",
                backgroundColor: "#fdfdfd",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "center"
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "15px" }}>{member.icon}</div>
              <h2 style={{ color: "#004080" }}>{member.name}</h2>
              <h4 style={{ color: "#333", marginBottom: "15px" }}>{member.role}</h4>
              <p style={{ color: "#555", fontSize: "15px", lineHeight: "1.6" }}>
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Political Partners Section */}
      <motion.section
        style={{ textAlign: "center" }}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h1 style={{ color: "#004080", marginBottom: "20px" }}>Political Partners</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px"
          }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "25px",
                backgroundColor: "#fdfdfd",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "center"
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "15px" }}>{partner.icon}</div>
              <h2 style={{ color: "#004080" }}>{partner.name}</h2>
              <h4 style={{ color: "#333", marginBottom: "15px" }}>{partner.role}</h4>
              <p style={{ color: "#555", fontSize: "15px", lineHeight: "1.6" }}>
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default About;
