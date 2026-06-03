'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { knowledgeBase } from '@/lib/aura/knowledge';
import { systemPrompt } from '@/lib/aura/systemPrompt';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AuraChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuraChat({ isOpen, onClose }: AuraChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy Aura, tu guía en este viaje por el universo de Mauricio Vélez. ¿Qué te gustaría saber sobre su experiencia y proyectos?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Buscar respuesta en la base de conocimientos local
  const findLocalAnswer = (question: string): string | null => {
    const questionLower = question.toLowerCase();

    for (const entry of knowledgeBase) {
      const keywords = entry.question.toLowerCase()
        .replace('¿', '')
        .replace('?', '')
        .split(' ')
        .filter(word => word.length > 3);

      const matchCount = keywords.filter(keyword =>
        questionLower.includes(keyword)
      ).length;

      if (matchCount >= 2 || questionLower.includes(entry.id.toLowerCase().split('-')[0])) {
        return entry.answer;
      }
    }

    // Búsqueda más flexible
    for (const entry of knowledgeBase) {
      const questionWords = entry.question.toLowerCase()
        .replace(/[¿?]/g, '')
        .split(' ')
        .filter(w => w.length > 3);

      for (const word of questionWords) {
        if (questionLower.includes(word) &&
            (questionLower.includes('que') ||
             questionLower.includes('cuál') ||
             questionLower.includes('cómo') ||
             questionLower.includes('quién') ||
             questionLower.includes('proyecto') ||
             questionLower.includes('experiencia') ||
             questionLower.includes('trabajo'))) {
          return entry.answer;
        }
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Primero buscar en la base de conocimientos local
      const localAnswer = findLocalAnswer(userMessage);

      if (localAnswer) {
        // Simular delay de typing
        await new Promise(resolve => setTimeout(resolve, 500));
        setMessages(prev => [...prev, { role: 'assistant', content: localAnswer }]);
      } else {
        // Si no encuentra respuesta local, intentar con API
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: [...messages, { role: 'user', content: userMessage }],
              systemPrompt,
              knowledgeBase
            })
          });

          if (response.ok) {
            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
          } else {
            // Respuesta por defecto si la API falla
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: 'Lo siento, no tengo información específica sobre ese tema. ¿Te gustaría saber sobre los proyectos de Mauricio como AeroRisk, MarketVision, o su experiencia en la Alcaldía de Medellín?'
            }]);
          }
        } catch {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'Parece que hay un problema de conexión. Pero puedo contarte sobre los proyectos de Mauricio: AeroRisk (plataforma de riesgos aeronáuticos), MarketVision (análisis financiero con IA), o su experiencia de 12 años en la Alcaldía de Medellín liderando Gobierno en Línea.'
          }]);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-2xl h-[70vh] bg-gradient-to-b from-slate-900/95 to-indigo-950/95 rounded-t-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-xl">✨</span>
                </div>
                <div>
                  <h3 className="text-cyan-300 font-semibold text-lg">Aura</h3>
                  <p className="text-cyan-500/60 text-xs">Tu guía estelar</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-cyan-400 hover:text-white transition-colors p-2"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages - Invertidos: mensajes nuevos arriba */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(70vh-140px)] flex flex-col-reverse">
              <div className="space-y-4">
                {[...messages].reverse().map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-cyan-600/30 text-cyan-100 rounded-br-sm border border-cyan-500/30'
                          : 'bg-purple-900/40 text-purple-100 rounded-bl-sm border border-purple-500/30'
                      }`}
                    >
                      {/* Mensajes de Aura con letra más grande */}
                      <p className={`leading-relaxed ${
                        message.role === 'assistant'
                          ? 'text-lg'
                          : 'text-base'
                      }`}>
                        {message.content}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-purple-900/40 p-4 rounded-2xl rounded-bl-sm border border-purple-500/30">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-cyan-500/20">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Pregúntame sobre Mauricio..."
                  className="flex-1 bg-slate-800/50 text-white placeholder-cyan-500/50 rounded-full px-4 py-3 border border-cyan-500/30 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:from-cyan-400 hover:to-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enviar
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
