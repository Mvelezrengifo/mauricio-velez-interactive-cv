'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { SoundGenerator } from '@/lib/soundGenerator';

const SoundContext = createContext<{
  isMuted: boolean;
  toggleMute: () => void;
  playSectionChange: () => void;
} | null>(null);

export function SoundManager({ children }: { children: React.ReactNode }) {
  const soundGen = useRef<SoundGenerator | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    soundGen.current = new SoundGenerator();
    soundGen.current.init().then(() => {
      if (userInteracted && !isMuted) {
        soundGen.current?.playAmbient();
      }
    });
  }, [userInteracted]);

  useEffect(() => {
    const handleFirstClick = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        soundGen.current?.resume();
        if (!isMuted) soundGen.current?.playAmbient();
      }
    };
    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, [userInteracted, isMuted]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    soundGen.current?.setMuted(newMuted);
  };

  const playSectionChange = () => {
    if (!isMuted && userInteracted) {
      soundGen.current?.playSectionChange();
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSectionChange }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundManager');
  return ctx;
}