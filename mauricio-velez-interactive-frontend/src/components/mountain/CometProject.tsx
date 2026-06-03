'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/mountain';
import { useEffect, useState, useMemo, useRef } from 'react';

interface CometProjectProps {
  project: Project;
  phase: 'approaching' | 'presenting' | 'passing' | 'gone';
  onClick: (project: Project) => void;
  onAnimationComplete?: () => void;
}

export default function CometProject({
  project,
  phase,
  onClick,
  onAnimationComplete
}: CometProjectProps) {
  const [isClient, setIsClient] = useState(false);
  const [internalPhase, setInternalPhase] = useState<'approaching' | 'presenting' | 'passing' | 'gone'>('approaching');
  const hasCalledComplete = useRef(false);

  // Posición aleatoria para variar de dónde viene la estrella
  const startPosition = useMemo(() => ({
    x: Math.random() * 40 - 20,
    y: Math.random() * 30 - 15,
  }), []);

  // Dirección aleatoria para dónde pasa el cometa
  const passDirection = useMemo(() => ({
    x: Math.random() > 0.5 ? 150 : -150,
    y: Math.random() * 60 + 20,
    rotate: Math.random() * 30 - 15,
  }), []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 🔑 RESET cuando cambia el proyecto
  useEffect(() => {
    setInternalPhase('approaching');
    hasCalledComplete.current = false;
  }, [project.id]);

  // Sincronizar fase interna con la fase externa
  useEffect(() => {
    setInternalPhase(phase);
  }, [phase]);

  // Detectar cuando termina la animación de "passing"
  useEffect(() => {
    if (internalPhase === 'passing' && !hasCalledComplete.current) {
      const timer = setTimeout(() => {
        hasCalledComplete.current = true;
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [internalPhase, onAnimationComplete]);

  if (!project || !isClient || internalPhase === 'gone') return null;

  const variants = {
    approaching: {
      scale: 0.1,
      x: `${startPosition.x}vw`,
      y: `${startPosition.y}vh`,
      opacity: 0.3,
      rotate: 0,
      filter: 'blur(4px)',
    },
    presenting: {
      scale: 1,
      x: '0vw',
      y: '0vh',
      opacity: 1,
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 50,
        mass: 2,
        duration: 2.5,
      }
    },
    passing: {
      scale: 0.6,
      x: `${passDirection.x}vw`,
      y: `${passDirection.y}vh`,
      opacity: 0,
      rotate: passDirection.rotate,
      filter: 'blur(2px)',
      transition: {
        type: 'tween',
        ease: 'easeIn',
        duration: 1.5,
      }
    }
  };

  const isVisible = internalPhase === 'approaching' || internalPhase === 'presenting' || internalPhase === 'passing';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={project.id}
          className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none"
          initial="approaching"
          animate={internalPhase}
          exit={{ opacity: 0, scale: 0 }}
          variants={variants}
        >
          <motion.div
            className="pointer-events-auto cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClick(project);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative group">
              {/* Glow exterior */}
              <motion.div
                className="absolute -inset-8 rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Trail del cometa */}
              {internalPhase === 'passing' && (
                <motion.div
                  className="absolute -right-20 top-1/2 -translate-y-1/2 w-32 h-2"
                  style={{
                    background: 'linear-gradient(to left, transparent, rgba(59, 130, 246, 0.8), rgba(147, 197, 253, 0.6))',
                    filter: 'blur(4px)',
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Estrella central */}
              <div className={`
                relative px-8 py-4 rounded-2xl
                bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95
                backdrop-blur-xl
                border-2 border-white/30
                shadow-[0_0_40px_rgba(59,130,246,0.3),0_0_80px_rgba(59,130,246,0.2)]
                ${project.color || 'text-white'}
              `}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10" />

                <div className="relative flex items-center gap-4">
                  <motion.span
                    className="text-2xl md:text-4xl font-bold tracking-tight"
                    animate={{
                      textShadow: [
                        '0 0 10px rgba(255,255,255,0.3)',
                        '0 0 20px rgba(255,255,255,0.5)',
                        '0 0 10px rgba(255,255,255,0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {project.name}
                  </motion.span>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex gap-1">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
