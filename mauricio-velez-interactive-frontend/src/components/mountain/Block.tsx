'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types/mountain';

interface BlockProps {
  project: Project;
  onClick: () => void;
}

export default function Block({ project, onClick }: BlockProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-blue-500/20 hover:border-blue-500/60 transition-all ${project.isBigData ? 'md:col-span-2 lg:col-span-1 ring-2 ring-blue-500/40' : ''}`}
    >
      <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
      <div className="flex flex-wrap gap-1 mt-2">
        {project.technologies.slice(0, 3).map((tech) => (
          <span key={tech} className="text-xs text-blue-300 bg-blue-900/30 px-2 py-0.5 rounded-full">
            {tech}
          </span>
        ))}
        {project.technologies.length > 3 && (
          <span className="text-xs text-gray-400">+{project.technologies.length - 3}</span>
        )}
      </div>
    </motion.div>
  );
}