import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./../theme.css";

const backdropVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.2 }
  },
  exit: { opacity: 0 }
};

// Aura-specific entrance + exit animations
const auraVariants = {
  blue: {
    hidden: { x: -100, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: -100, opacity: 0, transition: { duration: 0.4 } }
  },
  green: {
    hidden: { y: 100, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { y: 100, opacity: 0, transition: { duration: 0.4 } }
  },
  gold: {
    hidden: { y: -100, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { y: -100, opacity: 0, transition: { duration: 0.4 } }
  },
  purple: {
    hidden: { x: 100, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: 100, opacity: 0, transition: { duration: 0.4 } }
  }
};

function ProjectModal({ isOpen, onClose, title, description, aura }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          onClick={onClose}
          variants={backdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <motion.div
            className={`modal-content project-aura-${aura}`}
            onClick={(e) => e.stopPropagation()}
            variants={auraVariants[aura]}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <h2>{title}</h2>
            <p>{description}</p>
            <button className="modal-btn" onClick={onClose}>Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;
