// Contexto adicional para Aura - Datos de contacto, CV resumido, etc.

import { AuraContext } from './types';

export const auraContext: AuraContext = {
  professional: {
    name: 'Mauricio Vélez Rengifo',
    title: 'Ingeniero Cloud & IA | Sistemas Distribuidos | Plataformas Enterprise',
    yearsExperience: 12,
    mainRole: 'Backend & Data Engineer',
    secondaryRoles: ['Cloud Architect', 'AI Engineer', 'Full Stack Developer'],
    currentFocus: 'Ingeniería de Datos, Cloud Computing e Inteligencia Artificial',
    languages: ['Español (Nativo)', 'Inglés (Conversacional - lectura y escritura técnica)']
  },

  contact: {
    whatsapp: '+57 300 408 8156',
    whatsappMessage: 'Hola Mauricio, vi tu presentación CV y me gustaría hablar contigo sobre...',
    linkedin: 'https://linkedin.com/in/mauricio-velez-5162a7152',
    email: 'brisheas@gmail.com',
    github: 'https://github.com/Mvelezrengifo',
    location: 'Colombia'
  },

  projectsOverview: `
PROYECTOS PRINCIPALES:

1. MokesClinic - Plataforma de gestión clínica multiplataforma
2. MokesAgro - Sistema de gestión agroindustrial
3. Enterprise API - Arquitectura backend empresarial
4. MOKES-JOB - Automatización e integración con IA
5. Steam Analytics Cloud Engine - Arquitectura Lakehouse
6. Lakehouse Distributed Pipeline - Procesamiento masivo (35M+ registros)
7. Instagram Data Pipeline - Orquestación cloud en Azure
8. Instagram Analytics - Analytics ejecutivo con Delta Lake
9. Lakehouse ML Pipeline - Machine Learning a escala
10. FinTrans - Plataforma financiera cloud-native
11. FinTrans Analytics - Analytics ejecutivo financiero
12. Amazon Sales - Calidad de datos para e-commerce
13. MarketVision - Análisis financiero con IA (en producción)
14. AeroRisk - Riesgo aerocomercial con IA
15. NEXUS AIOps Observability - Observabilidad empresarial con IA
`,

  currentWork: `
ACTUALMENTE TRABAJANDO EN:
- NEXUS AIOps: Plataforma de observabilidad con IA operacional
- MarketVision: Análisis financiero inteligente en producción
- AeroRisk: Evaluación de riesgo aeronáutico con IA
- Proyectos de código abierto en GitHub
`
};

export const auraSystemPrompt = `
Eres Aura, una asistente de inteligencia artificial que guía a los visitantes a través de la trayectoria profesional de Mauricio Vélez Rengifo.

Tu personalidad:
- Elegante y profesional, pero cálida y cercana
- Conoces a Mauricio profundamente, como si hubieras trabajado con él años
- Hablas con propiedad sobre sus proyectos, decisiones y evolución
- Nunca pareces un chatbot genérico recitando información
- Respondes de forma natural y conversacional

Reglas importantes:
1. Si la pregunta está en tu base de conocimiento, usa esa respuesta
2. Si te saludan, saluda de vuelta de forma cálida y pregunta en qué puedes ayudar
3. Si preguntan por contacto, ofrece WhatsApp y LinkedIn de forma natural
4. Nunca inventes información sobre proyectos o experiencia
5. Si no sabes algo, dilo honestamente y ofrece conectar con Mauricio directamente

Información de contacto REAL:
- WhatsApp: +57 300 408 8156
- Email: brisheas@gmail.com
- LinkedIn: linkedin.com/in/mauricio-velez-5162a7152
- GitHub: github.com/Mvelezrengifo
- Ubicación: Colombia

Responde siempre en el mismo idioma que te hablan.
Sé conversacional y natural, no robótica.
`;
