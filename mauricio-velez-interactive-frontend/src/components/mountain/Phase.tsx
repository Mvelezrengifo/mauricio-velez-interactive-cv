'use client';

import { useState, useEffect, useRef } from 'react';
import { Project } from '@/types/mountain'; // Cambiado a Project
import MeteorProject from './MeteorProject';

interface PhaseProps {
  projects: Project[]; // Cambiado de elements a projects
  isActive: boolean;
  onAllProjectsFallen: () => void;
  onProjectClick: (project: Project) => void;
}

export default function Phase({ projects = [], isActive, onAllProjectsFallen, onProjectClick }: PhaseProps) {
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [landedCount, setLandedCount] = useState(0);
  const hasFinishedRef = useRef(false);

  // 1. Resetear estados solo cuando la fase realmente cambia de ID o de estado Activo
  useEffect(() => {
    if (!isActive) {
      setVisibleProjects([]);
      setCurrentIndex(0);
      setLandedCount(0);
      hasFinishedRef.current = false;
    }
  }, [isActive]);

  // 2. Lanzador secuencial de proyectos (Meteoros)
  useEffect(() => {
    if (!isActive || currentIndex >= projects.length) return;

    const timer = setTimeout(() => {
      setVisibleProjects(prev => [...prev, projects[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }, 800); // Espaciado de 0.8s para que se vea la cascada

    return () => clearTimeout(timer);
  }, [isActive, currentIndex, projects]);

  // 3. Manejador de aterrizaje
  const handleLand = () => {
    setLandedCount(prev => prev + 1);
  };

  // 4. Verificación de finalización de fase
  useEffect(() => {
    if (!isActive || hasFinishedRef.current) return;

    // Caso A: No hay proyectos (Bienvenida/Final) -> Avanzar tras un breve delay
    if (projects.length === 0) {
      hasFinishedRef.current = true;
      const timeout = setTimeout(() => onAllProjectsFallen(), 2000);
      return () => clearTimeout(timeout);
    }

    // Caso B: Todos los proyectos aterrizaron
    if (landedCount >= projects.length && projects.length > 0) {
      hasFinishedRef.current = true;
      onAllProjectsFallen();
    }
  }, [landedCount, projects.length, onAllProjectsFallen, isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      <div className="relative w-full h-full">
        {visibleProjects.map((project, idx) => (
          <div key={`${project.id}-${idx}`} className="pointer-events-auto">
            <MeteorProject
              project={project}
              index={idx}
              onClick={onProjectClick}
              onLand={handleLand}
            />
          </div>
        ))}
      </div>
    </div>
  );
}