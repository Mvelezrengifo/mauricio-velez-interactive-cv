'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types/mountain';
import { useEffect, useState } from 'react';

interface MeteorProjectProps {
  project: Project; // Cambiado de 'element' a 'project'
  index: number;
  onClick: (project: Project) => void;
  onLand?: () => void;
}

export default function MeteorProject({ project, index, onClick, onLand }: MeteorProjectProps) {
  const [landY, setLandY] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Medición segura del viewport en el cliente
    const calculateY = () => (typeof window !== 'undefined' ? window.innerHeight * 0.75 : 550);
    setLandY(calculateY());

    const handleResize = () => setTargetY(calculateY()); // Mantenemos estabilidad en resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!project || !isClient) return null;

  // Posición horizontal limpia basada en índice
  const leftPos = 15 + (index % 4) * 22; // 15%, 37%, 59%, 81%

  return (
    <motion.div
      initial={{ y: -250, opacity: 0, scale: 0.4, rotate: -15 }}
      animate={{ y: landY, opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        type: 'spring',
        damping: 18,
        stiffness: 70,
        delay: index * 0.4, // Bajado de 2.5s a 0.4s. Cae en cascada fluida sin trabar la app
      }}
      onAnimationComplete={() => {
        if (onLand) onLand(); // Notificación crucial para avanzar la fase de la IA
      }}
      style={{ left: `${leftPos}%`, position: 'fixed' }}
      className="z-30 cursor-pointer hover:scale-105 transition-transform filter drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]"
      onClick={(e) => {
        e.stopPropagation(); // Evitamos que el meteorito pause la pantalla de fondo
        onClick(project);
      }}
    >
      {/* Efecto de estela de luz cósmica */}
      <div className="absolute -inset-2 rounded-full blur-xl bg-gradient-to-r from-blue-500/30 to-cyan-500/30 animate-pulse" />

      <div className={`
        relative px-6 py-3 rounded-2xl
        bg-black/70 backdrop-blur-md
        border border-white/10 shadow-2xl
        ${project.color || 'text-white'}
        text-2xl md:text-4xl font-extrabold tracking-tight whitespace-nowrap
      `}>
        {project.name}
      </div>
    </motion.div>
  );
}