'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { phases } from '@/lib/storyConfig';
import { Project } from '@/types/mountain';
import Narrator from '../ui/Narrator';
import SpaceJourney from '../ui/SpaceJourney';
import { motion, AnimatePresence } from 'framer-motion';

export default function MountainClimb() {
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{question: string, response: string}>>([]);

  const currentPhase = phases[currentPhaseIdx];
  const narratorText = currentPhase?.narratorText || '';
  const hasProject = currentPhase?.projects && currentPhase.projects.length > 0;
  const currentProject = hasProject ? currentPhase.projects![0] : null;

  // ========== NAVEGACIÓN POR CLICK ==========

  // Click derecha → avanzar
  const handleRightClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (isFinished) return;

    const next = currentPhaseIdx + 1;
    if (next < phases.length) {
      setCurrentPhaseIdx(next);
    } else {
      setIsFinished(true);
    }
  }, [currentPhaseIdx, isFinished]);

  // Click izquierda → retroceder
  const handleLeftClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    if (isFinished) {
      setIsFinished(false);
      return;
    }

    if (currentPhaseIdx > 0) {
      setCurrentPhaseIdx(currentPhaseIdx - 1);
    }
  }, [currentPhaseIdx, isFinished]);

  // Click en indicador de progreso
  const handleDotClick = useCallback((idx: number) => {
    setCurrentPhaseIdx(idx);
    setIsFinished(false);
  }, []);

  // ========== CHAT CON AURA ==========

  const handleChatSubmit = async () => {
    if (!chatMessage.trim() || isChatLoading) return;

    const question = chatMessage.trim();
    setChatMessage('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/aura-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question }),
      });

      const data = await response.json();
      const responseText = data.response || 'Lo siento, no pude procesar tu pregunta.';

      setChatResponse(responseText);
      setChatHistory(prev => [...prev, { question, response: responseText }]);
    } catch (error) {
      const errorResponse = 'Error al conectar con Aura. Intenta de nuevo.';
      setChatResponse(errorResponse);
      setChatHistory(prev => [...prev, { question, response: errorResponse }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // ========== REINICIAR ==========

  const handleRestart = () => {
    setCurrentPhaseIdx(0);
    setIsFinished(false);
    setChatResponse('');
    setChatHistory([]);
  };

  // ========== RENDER ==========

  if (!currentPhase) return null;

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">

      {/* FONDO: Viaje espacial */}
      <SpaceJourney />

      {/* ÁREA DE CLICKS */}
      <div className="absolute inset-0 flex z-10">
        {/* Lado izquierdo - retroceder */}
        <div
          className="w-1/2 h-full cursor-pointer"
          onClick={handleLeftClick}
          onContextMenu={handleLeftClick}
        />
        {/* Lado derecho - avanzar */}
        <div
          className="w-1/2 h-full cursor-pointer"
          onClick={handleRightClick}
          onContextMenu={handleRightClick}
        />
      </div>

      {/* PROYECTO - TEXTO FLOTANTE SIN CUADRO */}
      <AnimatePresence mode="wait">
        {currentProject && !isFinished && (
          <motion.div
            key={currentProject.id}
            className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="relative flex flex-col items-center">
              {/* Glow exterior - detrás del texto */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: '300%',
                  height: '300%',
                }}
              >
                <div
                  className="w-64 h-64 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.2) 40%, transparent 70%)',
                    filter: 'blur(30px)'
                  }}
                />
              </motion.div>

              {/* Nombre del proyecto - SIN CUADRO, solo texto flotante */}
              <motion.h2
                className={`relative text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center ${currentProject.color || 'text-white'}`}
                style={{
                  textShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.4)'
                }}
                animate={{
                  textShadow: [
                    '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.4)',
                    '0 0 60px rgba(59, 130, 246, 1), 0 0 100px rgba(139, 92, 246, 0.6)',
                    '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.4)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {currentProject.name}
              </motion.h2>

              {/* Tecnologías como tags flotantes */}
              <motion.div
                className="relative flex gap-2 mt-6 justify-center flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentProject.technologies?.slice(0, 4).map((tech, i) => (
                  <motion.span
                    key={i}
                    className="text-sm px-3 py-1 rounded-full text-white/70"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NARRADOR - Solo durante la presentación */}
      {!isFinished && <Narrator text={narratorText} isPlaying={true} />}

      {/* INDICADOR DE PROGRESO - Solo durante la presentación */}
      {!isFinished && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 px-2 py-1 rounded-full">
          {phases.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentPhaseIdx
                  ? 'bg-blue-400 w-4'
                  : idx < currentPhaseIdx
                    ? 'bg-blue-400/60 hover:bg-blue-400/80'
                    : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* PANTALLA FINAL CON CHAT */}
      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md overflow-hidden"
          >
            {/* Header con mensaje de bienvenida */}
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="text-center pt-8 pb-4 px-4 flex-shrink-0"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-3xl">
                  ✨
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-2">
                  ¡Gracias por acompañarnos en este viaje!
                </h2>
                <p className="text-lg text-white/70 max-w-xl mx-auto">
                  Esta ha sido la trayectoria de <span className="text-blue-400 font-medium">Mauricio Vélez Rengifo</span> en el mundo de la Ingeniería de Datos e Inteligencia Artificial.
                </p>
              </motion.div>
            </motion.div>

            {/* Área del chat con Aura */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 min-h-0"
            >
              {/* Mensaje invitación de Aura */}
              <div className="text-center mb-4 flex-shrink-0">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-purple-400 text-lg"
                >
                  💫 "Hola, soy Aura. ¿Qué te gustaría saber sobre Mauricio?"
                </motion.p>
              </div>

              {/* Historial de chat */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 min-h-0">
                {chatHistory.length === 0 && (
                  <div className="text-center text-white/40 py-8">
                    <p>Ejemplos de preguntas:</p>
                    <div className="flex flex-wrap gap-2 justify-center mt-3">
                      {['¿Cuántos años de experiencia tiene?', '¿Cuál es su especialidad?', '¿Cómo lo contacto?', '¿Habla inglés?'].map((q, i) => (
                        <button
                          key={i}
                          onClick={() => setChatMessage(q)}
                          className="text-sm px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/80 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {chatHistory.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    {/* Pregunta del usuario */}
                    <div className="flex justify-end">
                      <div className="bg-blue-600/30 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-[80%]">
                        {item.question}
                      </div>
                    </div>
                    {/* Respuesta de Aura */}
                    <div className="flex justify-start items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs flex-shrink-0">
                        ✨
                      </div>
                      <div className="bg-white/5 text-white/90 px-4 py-2 rounded-2xl rounded-bl-md max-w-[80%] whitespace-pre-line">
                        {item.response}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isChatLoading && (
                  <div className="flex justify-start items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs flex-shrink-0 animate-pulse">
                      ✨
                    </div>
                    <div className="bg-white/5 px-4 py-2 rounded-2xl">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input del chat */}
              <div className="flex items-center gap-2 pb-4 flex-shrink-0">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 bg-white/5 text-white px-4 py-3 rounded-full border border-white/10 focus:outline-none focus:border-blue-500/50 text-sm"
                  style={{ backdropFilter: 'blur(10px)' }}
                  disabled={isChatLoading}
                />
                <button
                  onClick={handleChatSubmit}
                  disabled={isChatLoading || !chatMessage.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-white/5 disabled:to-white/5 disabled:text-white/30 text-white rounded-full transition-all text-sm font-medium"
                >
                  {isChatLoading ? '...' : 'Enviar'}
                </button>
              </div>
            </motion.div>

            {/* Footer con botones */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center py-4 border-t border-white/5 flex-shrink-0"
            >
              <p className="text-white/40 text-sm mb-3">
                Contacto directo: brisheas@gmail.com | +57 300 408 8156
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRestart}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors"
              >
                🔄 Ver presentación de nuevo
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INSTRUCCIONES - Solo durante la presentación */}
      {!isFinished && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 text-white/50 text-sm pointer-events-none">
          ← Click izquierdo: atrás | Click derecho: adelante →
        </div>
      )}
    </main>
  );
}
