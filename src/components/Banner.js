import React from "react";
import { motion } from "framer-motion";
import "./../theme.css";

function Banner({ text, className }) {
  return (
    <motion.div
      className={`banner ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
    >
      {text}
    </motion.div>
  );
}

export default Banner;
