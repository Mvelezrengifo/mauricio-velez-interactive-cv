'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface InteractionOverlayProps {
  isVisible: boolean;
  onResume: () => void;
}

export default function InteractionOverlay({ isVisible, onResume }: InteractionOverlayProps) {
  const [question, setQuestion] = useState('');

  const handleAsk = () => {
    if (question.trim()) {
      alert(`Pregunta enviada (demo): ${question}`);
      setQuestion('');
    } else {
      alert('Escribe una pregunta primero.');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gray-900/90 border border-blue-500/50 rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🤖</span>
            </div>
            <p className="text-white text-xl mb-4 text-center">¿Tienes alguna pregunta?</p>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Escribe tu pregunta aquí..."
              className="w-full p-3 bg-black/50 border border-blue-500/30 rounded-lg text-white mb-4 resize-none"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={handleAsk}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white font-semibold"
              >
                Preguntar
              </button>
              <button
                onClick={onResume}
                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white font-semibold"
              >
                Reanudar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}