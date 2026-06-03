'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Project } from '@/types/mountain';
import FallingProject from './FallingProject';

interface PhaseRendererProps {
  projects: Project[];
  isActive: boolean;
  onAllProjectsLanded: () => void;
  onProjectClick: (project: Project) => void;
}

export default function PhaseRenderer({ projects, isActive, onAllProjectsLanded, onProjectClick }: PhaseRendererProps) {
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [landedCount, setLandedCount] = useState(0);
  const hasFinishedRef = useRef(false);

  // Memorizamos los proyectos para que el efecto no se dispare por cambios de referencia
  const projectList = useMemo(() => (Array.isArray(projects) ? projects : []), [projects]);

  // 1. Reset de fase
  useEffect(() => {
    if (isActive) {
      setVisibleProjects([]);
      setCurrentIndex(0);
      setLandedCount(0);
      hasFinishedRef.current = false;
    }
  }, [isActive, projectList]); // Añadimos projectList a la dependencia

  // 2. Lanzador en Cascada (Mucho más rápido y dinámico)
  useEffect(() => {
    if (!isActive || projectList.length === 0) return;

    if (currentIndex < projectList.length) {
      const timer = setTimeout(() => {
        setVisibleProjects(prev => [...prev, projectList[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 600); // Bajamos de 2000ms a 600ms para que sea fluido
      return () => clearTimeout(timer);
    }
  }, [isActive, currentIndex, projectList]);

  // 3. Manejador de aterrizaje
  const handleLand = () => {
    setLandedCount(prev => prev + 1);
  };

  // 4. Verificación de fase completa con protección
  useEffect(() => {
    if (
      isActive &&
      projectList.length > 0 &&
      landedCount >= projectList.length &&
      !hasFinishedRef.current
    ) {
      hasFinishedRef.current = true;
      // Pequeño respiro antes de avisar al padre para que se vea el último proyecto quieto
      const finalTimeout = setTimeout(() => onAllProjectsLanded(), 1000);
      return () => clearTimeout(finalTimeout);
    }
  }, [landedCount, projectList.length, isActive, onAllProjectsLanded]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full max-w-7xl mx-auto">
        {visibleProjects.map((proj, idx) => (
          <div key={`${proj.id}-${idx}`} className="pointer-events-auto">
            <FallingProject
              project={proj}
              onClick={onProjectClick}
              onLand={handleLand}
            />
          </div>
        ))}
      </div>
    </div>
  );
}