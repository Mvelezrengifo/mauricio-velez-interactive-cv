'use client';

import { Phase, Language, Project } from '@/types/mountain';
import Block from './Block';
import FloatingLogos from './FloatingLogos';
import FutureParticles from './FutureParticles';

interface SectionProps {
  phase: Phase; // Cambiamos SectionType por Phase
  language: Language;
  onOpenModal: (project: Project) => void;
}

export default function Section({ phase, language, onOpenModal }: SectionProps) {
  // SEGURIDAD: Si no hay fase, no mostramos nada para no romper el layout
  if (!phase) return null;

  return (
    <section
      className="absolute inset-0 flex flex-col justify-center items-center px-6 z-20 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto text-center z-10 pointer-events-auto">
        {/* Título dinámico basado en el ID de la fase para orientar al usuario */}
        <h2 className="text-4xl md:text-6xl font-extralight text-white/40 mb-12 tracking-tighter uppercase italic">
          {phase.id}
        </h2>

        {/* Renderizado de Bloques/Proyectos si existen en la fase actual */}
        {phase.projects && phase.projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
            {phase.projects.map((project) => (
              <Block
                key={project.id}
                project={project}
                onClick={() => onOpenModal(project)}
              />
            ))}
          </div>
        )}

        {/* Efectos Especiales según la fase */}
        {phase.id === 'fase-cloud' && <FloatingLogos />}

        {phase.id === 'final' && (
          <div className="relative mt-10">
            <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-900 mb-6">
              MAURICIO VELEZ
            </div>
            <FutureParticles />
            <div className="text-xl text-blue-400 font-mono tracking-widest animate-pulse">
              {language === 'es' ? 'SISTEMA INTEGRADO' : 'INTEGRATED SYSTEM'}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}