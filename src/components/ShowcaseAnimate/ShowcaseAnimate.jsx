'use client';

import { motion } from 'framer-motion';

export default function ShowcaseAnimate({ children, reverse, index = 0 }) {
  return (
    <motion.div
      className={`showcase__row ${reverse ? 'showcase__row--reverse' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.12
      }}
    >
      {children}
    </motion.div>
  );
}
