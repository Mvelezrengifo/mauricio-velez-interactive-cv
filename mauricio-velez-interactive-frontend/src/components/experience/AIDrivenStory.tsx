'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/soundGenerator';

// Los mensajes que la IA dirá en orden
const storyMessages = [
  { text: "Hola. Soy la asistente digital de Mauricio Velez.", duration: 3000, soundId: null, bgColor: "#f5f5f0" },
  { text: "Voy a mostrarte cómo evolucionó desde construir aplicaciones hasta diseñar plataformas cloud, sistemas de datos e inteligencia artificial.", duration: 5000, soundId: null, bgColor: "#e0e0e0" },
  { text: "Todo comenzó construyendo sistemas reales para resolver problemas reales.", duration: 4000, soundId: 'build', bgColor: "#c0c0c0", showProjects: ['MokesClinic', 'MokesAgro', 'Enterprise API'] },
  { text: "Pero construir aplicaciones no era suficiente. Necesitábamos conectar sistemas.", duration: 4000, soundId: 'integrate', bgColor: "#a0a0a0", showProjects: ['MOKES-JOB'] },
  { text: "Luego llegaron los datos. Grandes volúmenes de información que había que procesar.", duration: 4500, soundId: 'data', bgColor: "#707070", showProjects: ['Steam Analytics', 'Lakehouse Pipeline', 'FinTrans'] },
  { text: "Los sistemas crecieron y tuvieron que vivir en la nube.", duration: 4000, soundId: 'cloud', bgColor: "#404040", showProjects: ['Azure & Fabric', 'BigQuery', 'AWS Infrastructure'] },
  { text: "Después aprendimos a interpretar información con inteligencia artificial.", duration: 4000, soundId: 'ai', bgColor: "#202020", showProjects: ['MarketVision', 'AeroRisk'] },
  { text: "Finalmente, todo converge en un cerebro tecnológico.", duration: 4500, soundId: 'converge', bgColor: "#000000", showBrain: true },
];

export default function AIDrivenStory() {
  const [step, setStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [visibleProjects, setVisibleProjects] = useState<string[]>([]);
  const [showBrain, setShowBrain] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [pulseIntensity, setPulseIntensity] = useState(0.2);
  const [showQuestionButton, setShowQuestionButton] = useState(false);

  useEffect(() => {
    if (step >= storyMessages.length) {
      // La historia terminó, mostramos el botón de preguntas
      setShowQuestionButton(true);
      return;
    }

    const msg = storyMessages[step];
    // Cambiar fondo (simulamos con una variable de estilo, pero mejor usar bg dinámico)
    document.body.style.transition = 'background-color 2s ease';
    document.body.style.backgroundColor = msg.bgColor;
    // Ajustar pulsación: mientras más oscuro, más lenta y fuerte
    const intensity = 1 - (step / storyMessages.length) * 0.8;
    setPulseIntensity(intensity);

    // Mostrar proyectos si los tiene
    if (msg.showProjects) setVisibleProjects(msg.showProjects);
    if (msg.showBrain) setShowBrain(true);

    // Efecto máquina de escribir
    let i = 0;
    setDisplayText('');
    setIsTyping(true);
    const interval = setInterval(() => {
      if (i < msg.text.length) {
        setDisplayText(msg.text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        // Reproducir sonido
        //if (msg.soundId) sound.play(msg.soundId);
        // Esperar la duración y pasar al siguiente paso
        setTimeout(() => {
          setStep(step + 1);
        }, msg.duration);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-6 transition-all duration-1000"
         style={{
           backgroundColor: storyMessages[step]?.bgColor || '#000',
           transition: 'background-color 2s ease'
         }}>
      {/* Capa de pulsación */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             background: `radial-gradient(circle at center, rgba(0,0,0,${0.1 * pulseIntensity}) 0%, transparent 70%)`,
             animation: `pulse ${2 - pulseIntensity}s infinite ease-in-out`
           }} />

      {/* Contenedor del mensaje */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl text-center"
      >
        <div className="flex justify-center mb-6">
          <div className={`w-16 h-16 rounded-full bg-purple-600/50 flex items-center justify-center ${isTyping ? 'animate-pulse' : ''}`}>
            <span className="text-3xl">🧠</span>
          </div>
        </div>
        <p className="text-2xl md:text-4xl font-light text-white drop-shadow-lg">
          {displayText}
          {isTyping && <span className="animate-pulse">|</span>}
        </p>
      </motion.div>

      {/* Proyectos visibles (flotando) */}
      <div className="absolute bottom-20 left-0 right-0 flex flex-wrap justify-center gap-3 px-4 z-10">
        {visibleProjects.map((proj, idx) => (
          <motion.span
            key={proj}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-sm text-white border border-white/20"
          >
            {proj}
          </motion.span>
        ))}
      </div>

      {/* Cerebro tecnológico final */}
      {showBrain && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: 'spring' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-purple-800 to-indigo-900 opacity-80 animate-pulse" />
          <div className="absolute text-center text-white font-bold text-2xl">
            MAURICIO<br/>VELEZ
          </div>
        </motion.div>
      )}

      {/* Botón de preguntas (aparece al final) */}
      {showQuestionButton && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8 z-20 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all"
          onClick={() => alert("Próximamente: chat con IA")}
        >
          <span>💬</span> Hacer pregunta
        </motion.button>
      )}

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}