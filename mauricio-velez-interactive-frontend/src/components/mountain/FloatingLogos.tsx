'use client';

import { motion } from 'framer-motion';

const logos = [
  { name: 'Azure', color: 'text-blue-400' },
  { name: 'Fabric', color: 'text-green-400' },
  { name: 'Databricks', color: 'text-orange-400' },
  { name: 'BigQuery', color: 'text-cyan-400' },
  { name: 'AWS', color: 'text-yellow-400' },
];

export default function FloatingLogos() {
  return (
    <div className="relative w-full h-64 flex flex-wrap justify-center items-center gap-8">
      {logos.map((logo, i) => (
        <motion.div
          key={logo.name}
          className={`text-4xl font-bold ${logo.color} opacity-80`}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {logo.name}
        </motion.div>
      ))}
    </div>
  );
}