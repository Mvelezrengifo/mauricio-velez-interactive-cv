"use client";

import React, { useState } from "react";
import { phases } from "@/lib/storyConfig"; // El guion real
import Narrator from "@/components/ui/Narrator"; // La voz de Aura
import StarsCanvas from "@/components/mountain/StarsCanvas"; // El fondo
import PhaseRenderer from "@/components/mountain/PhaseRenderer"; // El que lanza los proyectos
import { SoundGenerator } from "@/lib/sound/soundGenerator"; // El sonido

export default function MountainExperience() {
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Instancia del sonido (la manejamos con una referencia o estado)
  const [sound] = useState(() => new SoundGenerator());

  const currentPhase = phases[currentPhaseIdx];

  const handleStart = () => {
    setIsPlaying(true);
    sound.start();
  };

  const handleNextPhase = () => {
    if (currentPhaseIdx < phases.length - 1) {
      setCurrentPhaseIdx(prev => prev + 1);
    }
  };

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      {/* 1. Fondo de Estrellas */}
      <StarsCanvas />

      {/* 2. El Narrador (Aura hablando) */}
      <Narrator
        text={currentPhase?.narratorText || ""}
        isPlaying={isPlaying}
        onTypingEnd={() => {
          // Aquí podrías disparar eventos cuando Aura termine de hablar
        }}
      />

      {/* 3. El Renderizador de Proyectos (donde caen los meteoros/textos) */}
      {isPlaying && (
        <PhaseRenderer
          phase={currentPhase}
          onPhaseComplete={handleNextPhase}
        />
      )}

      {/* 4. Botón de Inicio (Solo si no ha empezado) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-[110]">
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-blue-600 text-white rounded-full text-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
          >
            Iniciar Experiencia
          </button>
        </div>
      )}
    </main>
  );
}