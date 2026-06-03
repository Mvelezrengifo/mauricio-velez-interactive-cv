'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/mountain';

interface ProjectModalProps {
  project: Project | null;
  language?: 'es' | 'en';
  onClose: () => void;
}

export default function ProjectModal({ project, language = 'es', onClose }: ProjectModalProps) {
  // Sin proyecto, no hay modal.
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          className="relative bg-[#0a0a0a] border border-blue-500/30 rounded-2xl max-w-lg w-full overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.2)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cabecera con efecto de brillo */}
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

          <div className="p-8">
            <h3 className={`text-4xl font-black tracking-tighter ${project.color || 'text-white'} mb-4`}>
              {project.name}
            </h3>

            {/* CORRECCIÓN: Usamos la propiedad correcta del objeto Project */}
            <p className="text-blue-100/80 text-xl leading-relaxed mb-8 font-light italic">
              {language === 'es' ? project.descriptionEs : project.descriptionEn}
            </p>

            {/* Tecnologías */}
            {project.technologies && (
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-blue-300 text-sm font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-white font-bold tracking-widest uppercase text-sm hover:border-blue-500/50"
            >
              {language === 'es' ? 'Volver a la montaña' : 'Back to mountain'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}