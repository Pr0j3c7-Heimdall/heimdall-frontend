'use client';

import { motion } from 'framer-motion';

export default function StepAnimate({ children, index = 0 }) {
  return (
    <motion.div
      className="step"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.2
      }}
    >
      {children}
    </motion.div>
  );
}
