'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types/mountain';
import { useEffect, useState, useMemo } from 'react';

interface FallingProjectProps {
  project: Project;
  onClick: (project: Project) => void;
  onLand?: () => void;
}

export default function FallingProject({ project, onClick, onLand }: FallingProjectProps) {
  const [landY, setLandY] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // 1. Fijamos la posición horizontal UNA SOLA VEZ para que no salte al re-renderizar
  const fixedLeft = useMemo(() => Math.floor(Math.random() * 60) + 15, []);

  useEffect(() => {
    setIsClient(true);
    const calculateY = () => {
      // Calculamos una posición segura: un poco más arriba del fondo para que se vea bien
      const height = typeof window !== 'undefined' ? window.innerHeight : 800;
      return height * 0.7;
    };

    setLandY(calculateY());

    const handleResize = () => setLandY(calculateY());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!project || !isClient) return null;

  return (
    <motion.div
      initial={{ y: -300, scale: 0.8, opacity: 0 }}
      animate={{ y: landY, scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 25, // Un poco más de amortiguación para que no rebote infinito
        stiffness: 80,
        mass: 1,
      }}
      // Este es el evento VITAL. Si esto no se dispara, la app se traba.
      onAnimationComplete={() => {
        if (onLand) onLand();
      }}
      style={{
        left: `${fixedLeft}%`,
        position: 'fixed',
        transform: 'translateX(-50%)' // Centramos respecto al % de left
      }}
      className="z-30 cursor-pointer hover:scale-105 transition-transform pointer-events-auto"
      onClick={(e) => {
        e.stopPropagation();
        onClick(project);
      }}
    >
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-cyan-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

        <div className={`
          relative px-6 py-3 rounded-full
          bg-black/80 backdrop-blur-xl
          border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]
          ${project.color || 'text-white'}
          flex items-center gap-3
        `}>
          <span className="text-xl md:text-3xl font-bold tracking-tight">
            {project.name}
          </span>

          {/* Pequeño indicador de que es clickeable */}
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}