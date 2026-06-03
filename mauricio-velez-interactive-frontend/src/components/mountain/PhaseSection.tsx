'use client';

import { useEffect, useState, useRef } from 'react';
import { Phase, Project } from '@/types/mountain'; // Importación correcta de tipos
import FallingElement from './FallingElement';

interface PhaseSectionProps {
  phase: Phase;
  isActive: boolean;
  onPhaseComplete: () => void;
}

export default function PhaseSection({ phase, isActive, onPhaseComplete }: PhaseSectionProps) {
  const [visibleElements, setVisibleElements] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTransitioning = useRef(false);

  // 1. Limpieza y reset al cambiar de fase
  useEffect(() => {
    if (isActive) {
      setVisibleElements([]);
      setCurrentIndex(0);
      isTransitioning.current = false;
    }
  }, [isActive, phase.id]);

  // 2. Orquestador de caída de proyectos
  useEffect(() => {
    if (!isActive || isTransitioning.current) return;

    // Caso A: Todavía hay proyectos por lanzar
    if (currentIndex < phase.projects.length) {
      const timer = setTimeout(() => {
        setVisibleElements(prev => [...prev, phase.projects[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 700); // Ritmo de caída optimizado
      return () => clearTimeout(timer);
    }

    // Caso B: Fase sin proyectos (Bienvenida/Final) o ya terminaron de caer
    if (currentIndex >= phase.projects.length) {
      isTransitioning.current = true;
      const endTimer = setTimeout(() => {
        onPhaseComplete();
      }, 3000); // Damos tiempo para que el usuario interactúe
      return () => clearTimeout(endTimer);
    }
  }, [isActive, currentIndex, phase.projects, onPhaseComplete]);

  if (!isActive) return null;

  return (
    <section className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
      <div className="w-full max-w-6xl mx-auto text-center px-4">
        {/* Título de la Fase con animación de entrada */}
        <h2 className="text-3xl md:text-5xl font-light text-blue-100/50 mb-16 animate-pulse">
          {phase.id.toUpperCase()}
        </h2>

        {/* Contenedor de Proyectos que caen */}
        <div className="flex flex-wrap justify-center gap-8 pointer-events-auto">
          {visibleElements.map((project, idx) => (
            <FallingElement
              key={`${project.id}-${idx}`}
              project={project}
              index={idx}
              onClick={() => {/* Manejar click aquí si es necesario */}}
            />
          ))}
        </div>
      </div>
    </section>
  );
}