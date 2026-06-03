'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface NarratorProps {
  text: string;
  isPlaying?: boolean;
}

export default function Narrator({ text, isPlaying = true }: NarratorProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isPlaying || !text) {
      setDisplayedText(text);
      return;
    }

    setDisplayedText('');
    setCurrentIndex(0);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return prev;
        }
        setDisplayedText(text.slice(0, prev + 1));
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [text, isPlaying]);

  if (!text) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-16 left-1/2 -translate-x-1/2 z-30 w-full max-w-5xl px-6"
    >
      <div className="relative">
        {/* Glow effect behind text */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Text container - más ancho */}
        <div className="relative text-center py-6 px-8">
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed"
            style={{
              textShadow: '0 0 40px rgba(139, 92, 246, 0.6), 0 0 80px rgba(59, 130, 246, 0.4)'
            }}
          >
            {displayedText}
            {isPlaying && currentIndex < text.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-1 h-7 bg-purple-400 ml-1"
              />
            )}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
