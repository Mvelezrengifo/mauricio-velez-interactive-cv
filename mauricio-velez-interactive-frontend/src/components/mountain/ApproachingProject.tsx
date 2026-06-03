'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types/mountain';
import { useEffect, useState } from 'react';

interface ApproachingProjectProps {
  project: Project;
  onArrived: () => void;
  onClick: (project: Project) => void;
}

export default function ApproachingProject({ project, onArrived, onClick }: ApproachingProjectProps) {
  const [finalY, setFinalY] = useState(0);

  useEffect(() => {
    setFinalY(window.innerHeight - 150);
    const handleResize = () => setFinalY(window.innerHeight - 150);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.1, opacity: 0, y: -100 }}
      animate={{ scale: 1, opacity: 1, y: finalY }}
      transition={{
        type: 'spring',
        damping: 12,
        stiffness: 60,
        duration: 2.5,
        delay: 0.2,
      }}
      onAnimationComplete={onArrived}
      className="fixed z-20 cursor-pointer hover:scale-105 transition-transform"
      style={{ left: '50%', transform: 'translateX(-50%)' }}
      onClick={() => onClick(project)}
    >
      <div className={`${project.color} text-5xl md:text-7xl font-bold whitespace-nowrap bg-black/40 backdrop-blur-md px-10 py-5 rounded-full border border-blue-400/60 shadow-2xl drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]`}>
        {project.name}
      </div>
    </motion.div>
  );
}