// Configuración de la historia/presentación del CV
import { Phase, Project } from '@/types/mountain';

// =====================================================
// PROYECTOS COMPLETOS - 15 proyectos en 6 etapas
// =====================================================

const projects: Record<string, Project> = {
  // ========== 1️⃣ CONSTRUCCIÓN DE SISTEMAS ==========

  mokesclinic: {
    id: 'mokesclinic',
    name: 'MokesClinic',
    description: 'Plataforma clínica integral multiplataforma',
    longDescription: 'El inicio del viaje. Una plataforma clínica completa que conectaba Frontend Windows, Frontend Android, Backend centralizado, Base de datos SQLite. Incluía gestión de pacientes, citas, facturación e historial clínico.',
    technologies: ['Windows Forms', 'Android', 'SQLite', 'API REST', 'C#'],
    year: 2015,
    color: 'text-green-400',
    impact: 'Sistema clínico completo multiplataforma'
  },

  mokesagro: {
    id: 'mokesagro',
    name: 'MokesAgro',
    description: 'Sistema de gestión agroindustrial',
    longDescription: 'Llevar tecnología al sector agrícola. Un reto diferente que demostró que la misma ingeniería podía adaptarse a industrias completamente diferentes.',
    technologies: ['Node.js', 'APIs REST', 'JavaScript', 'PostgreSQL'],
    year: 2018,
    color: 'text-amber-400',
    impact: 'Gestión completa para empresa agroindustrial real'
  },

  enterpriseapi: {
    id: 'enterpriseapi',
    name: 'Enterprise API',
    description: 'Arquitectura backend empresarial',
    longDescription: 'Aquí comenzó la mentalidad backend. Los sistemas crecían y ya no bastaba con una interfaz. Era necesario construir servicios reutilizables y escalables.',
    technologies: ['Python', 'FastAPI', 'APIs REST', 'Arquitectura Modular'],
    year: 2019,
    color: 'text-blue-400',
    impact: 'Servicios backend escalables y reutilizables'
  },

  // ========== 2️⃣ INTEGRACIÓN DE SISTEMAS ==========

  mokesjob: {
    id: 'mokesjob',
    name: 'MOKES-JOB',
    description: 'Automatización e integración de sistemas',
    longDescription: 'Primer acercamiento serio a la automatización. Los sistemas aislados tienen límites. El siguiente paso fue integrarlos y automatizar procesos completos.',
    technologies: ['Cliente/Servidor', 'APIs', 'IA Aplicada', 'Automatización'],
    year: 2020,
    color: 'text-orange-400',
    impact: 'Integración y automatización de procesos empresariales'
  },

  // ========== 3️⃣ INGENIERÍA DE DATOS ==========

  steamanalytics: {
    id: 'steamanalytics',
    name: 'Steam Analytics Cloud Engine',
    description: 'Arquitectura Lakehouse en la nube',
    longDescription: 'Aquí comenzó el viaje hacia la ingeniería de datos. Ya no analizábamos cientos de registros. Analizábamos millones. Arquitectura Lakehouse completa: Bronce → Plata → Oro.',
    technologies: ['Google Cloud', 'BigQuery', 'Django', 'SQL', 'Dataflow'],
    year: 2022,
    color: 'text-cyan-400',
    impact: 'Arquitectura Lakehouse completa en Google Cloud'
  },

  lakehousepipeline: {
    id: 'lakehousepipeline',
    name: 'Lakehouse Distributed Pipeline',
    description: 'Procesamiento distribuido masivo',
    longDescription: 'Aprendimos que el volumen cambia las reglas. Las soluciones tradicionales dejaron de ser suficientes. Más de 35 millones de registros procesados.',
    technologies: ['Spark', 'PySpark', 'Parquet', 'Arquitectura Medallion'],
    year: 2023,
    color: 'text-indigo-400',
    impact: '35+ millones de registros procesados'
  },

  instagramdatapipeline: {
    id: 'instagramdatapipeline',
    name: 'Instagram Data Pipeline',
    description: 'Orquestación de datos en la nube',
    longDescription: 'Los datos comenzaron a moverse entre servicios cloud. Ya no era solo procesarlos. Era orquestarlos. Más de 1.5 millones de registros procesados.',
    technologies: ['Azure Data Factory', 'Databricks', 'Blob Storage', 'Azure'],
    year: 2023,
    color: 'text-pink-400',
    impact: '1.5+ millones de registros orquestados en Azure'
  },

  instagramanalytics: {
    id: 'instagramanalytics',
    name: 'Instagram Analytics',
    description: 'Transformación de datos en conocimiento',
    longDescription: 'Después aprendimos a transformar datos en conocimiento. La información comenzó a responder preguntas de negocio.',
    technologies: ['Azure Databricks', 'Spark SQL', 'Delta Lake', 'Power BI'],
    year: 2023,
    color: 'text-purple-400',
    impact: 'Dashboards analíticos para decisiones de negocio'
  },

  lakehouseml: {
    id: 'lakehouseml',
    name: 'Lakehouse Machine Learning Pipeline',
    description: 'Machine Learning a escala',
    longDescription: 'Los datos dejaron de explicar el pasado. Ahora podían anticipar el futuro. 35 millones de registros + modelos predictivos.',
    technologies: ['PyTorch', 'Spark', 'Pandas', 'Machine Learning', 'MLflow'],
    year: 2023,
    color: 'text-violet-400',
    impact: 'Modelos predictivos sobre 35M+ registros'
  },

  // ========== 4️⃣ CLOUD COMPUTING ==========

  fintrans: {
    id: 'fintrans',
    name: 'FinTrans',
    description: 'Plataforma financiera en la nube',
    longDescription: 'Los sistemas crecieron. Y tuvieron que vivir en la nube. Arquitectura financiera moderna con Microsoft Fabric.',
    technologies: ['Microsoft Fabric', 'Spark', 'SQL', 'Modelado Dimensional'],
    year: 2024,
    color: 'text-emerald-400',
    impact: 'Arquitectura financiera cloud-native'
  },

  fintransanalytics: {
    id: 'fintransanalytics',
    name: 'FinTrans Analytics',
    description: 'Analytics financiero ejecutivo',
    longDescription: 'Aprendimos a transformar datos financieros en decisiones ejecutivas.',
    technologies: ['Microsoft Fabric', 'Power BI', 'Lakehouse', 'DAX'],
    year: 2024,
    color: 'text-teal-400',
    impact: 'Decisiones ejecutivas basadas en datos financieros'
  },

  amazonsales: {
    id: 'amazonsales',
    name: 'Amazon Sales',
    description: 'Calidad de datos e-commerce',
    longDescription: 'La calidad de los datos se volvió tan importante como los datos mismos. Modelado dimensional para análisis de ventas.',
    technologies: ['Spark', 'SQL', 'Data Quality', 'Star Schema', 'AWS'],
    year: 2024,
    color: 'text-yellow-400',
    impact: 'Pipeline de calidad de datos para e-commerce'
  },

  // ========== 5️⃣ INTELIGENCIA ARTIFICIAL ==========

  marketvision: {
    id: 'marketvision',
    name: 'MarketVision',
    description: 'Análisis financiero inteligente en tiempo real',
    longDescription: 'La inteligencia artificial comenzó a participar en la toma de decisiones. Los sistemas ya no solo mostraban información. También explicaban lo que estaba ocurriendo.',
    technologies: ['AWS Lambda', 'AWS S3', 'EventBridge', 'Gemini', 'React'],
    year: 2024,
    color: 'text-sky-400',
    impact: 'Análisis financiero inteligente en tiempo real'
  },

  aerorisk: {
    id: 'aerorisk',
    name: 'AeroRisk',
    description: 'Análisis de riesgo aerocomercial con IA',
    longDescription: 'La IA pasó de analizar mercados a evaluar riesgos operacionales reales. El impacto dejó de ser local. Se volvió global. 30 años de clima histórico + tráfico aéreo global.',
    technologies: ['BigQuery', 'FastAPI', 'Groq', 'LLaMA 3.1', 'Python'],
    year: 2024,
    color: 'text-blue-400',
    impact: '30 años de datos climáticos + tráfico aéreo global'
  },

  // ========== 6️⃣ OBSERVABILIDAD Y ENTERPRISE ==========

  nexus: {
    id: 'nexus',
    name: 'NEXUS AIOps Observability',
    description: 'Plataforma de observabilidad inteligente',
    longDescription: 'Finalmente entendimos cómo unirlo todo: Sistemas, Datos, Cloud, Inteligencia Artificial, Observabilidad, Automatización, Arquitectura empresarial. El proyecto más completo.',
    technologies: ['AWS', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'SQS', 'SNS'],
    year: 2024,
    color: 'text-purple-400',
    impact: 'Convergencia de todas las tecnologías en una plataforma empresarial'
  }
};

// =====================================================
// FASES DE LA PRESENTACIÓN
// =====================================================

export const phases: Phase[] = [
  {
    id: 'welcome',
    title: 'Bienvenido',
    narratorText: 'Hola, soy Aura. Te invito a conocer la trayectoria de Mauricio Vélez Rengifo, un ingeniero que ha dedicado más de 12 años a construir soluciones tecnológicas. Haz click para avanzar y descubrir cada proyecto como si viajaras por el cosmos.',
    theme: 'dark'
  },

  // 1️⃣ CONSTRUCCIÓN DE SISTEMAS
  {
    id: 'construction',
    title: 'Construcción de Sistemas',
    narratorText: 'Primero aprendimos a construir sistemas completos. No se trataba solamente de escribir código. Se trataba de conectar personas, procesos y datos en una misma solución.',
    projects: [projects.mokesclinic],
    theme: 'dark'
  },
  {
    id: 'construction-continued',
    title: 'Expandiendo Horizontes',
    narratorText: 'Después apareció un reto diferente. Llevar tecnología al sector agrícola. Aprendimos que la misma ingeniería podía adaptarse a industrias completamente diferentes.',
    projects: [projects.mokesagro],
    theme: 'dark'
  },
  {
    id: 'backend-mindset',
    title: 'Mentalidad Backend',
    narratorText: 'Aquí comenzó la mentalidad backend. Los sistemas crecían. Ya no bastaba con una interfaz. Era necesario construir servicios reutilizables y escalables.',
    projects: [projects.enterpriseapi],
    theme: 'blue'
  },

  // 2️⃣ INTEGRACIÓN DE SISTEMAS
  {
    id: 'integration',
    title: 'Integración de Sistemas',
    narratorText: 'Después aprendimos algo importante. Los sistemas aislados tienen límites. El siguiente paso fue integrarlos y automatizar procesos completos.',
    projects: [projects.mokesjob],
    theme: 'blue'
  },

  // 3️⃣ INGENIERÍA DE DATOS
  {
    id: 'data-engineering-start',
    title: 'Ingeniería de Datos',
    narratorText: 'Aquí cambia completamente la escala. Pasamos de aplicaciones a millones de registros. Aquí comenzó el viaje hacia la ingeniería de datos. Ya no analizábamos cientos de registros. Analizábamos millones.',
    projects: [projects.steamanalytics],
    theme: 'purple'
  },
  {
    id: 'data-scale',
    title: 'Escala Masiva',
    narratorText: 'Aprendimos que el volumen cambia las reglas. Las soluciones tradicionales dejaron de ser suficientes. Más de 35 millones de registros procesados.',
    projects: [projects.lakehousepipeline],
    theme: 'purple'
  },
  {
    id: 'data-orchestration',
    title: 'Orquestación Cloud',
    narratorText: 'Los datos comenzaron a moverse entre servicios cloud. Ya no era solo procesarlos. Era orquestarlos.',
    projects: [projects.instagramdatapipeline],
    theme: 'purple'
  },
  {
    id: 'data-knowledge',
    title: 'Datos a Conocimiento',
    narratorText: 'Después aprendimos a transformar datos en conocimiento. La información comenzó a responder preguntas de negocio.',
    projects: [projects.instagramanalytics],
    theme: 'purple'
  },
  {
    id: 'data-ml',
    title: 'Machine Learning a Escala',
    narratorText: 'Los datos dejaron de explicar el pasado. Ahora podían anticipar el futuro. 35 millones de registros + modelos predictivos.',
    projects: [projects.lakehouseml],
    theme: 'purple'
  },

  // 4️⃣ CLOUD COMPUTING
  {
    id: 'cloud-start',
    title: 'Cloud Computing',
    narratorText: 'La evolución llevó naturalmente a la nube. Los sistemas crecieron y tuvieron que vivir en la nube.',
    projects: [projects.fintrans],
    theme: 'blue'
  },
  {
    id: 'cloud-analytics',
    title: 'Analytics en la Nube',
    narratorText: 'Aprendimos a transformar datos financieros en decisiones ejecutivas. La calidad de los datos se volvió tan importante como los datos mismos.',
    projects: [projects.fintransanalytics, projects.amazonsales],
    theme: 'blue'
  },

  // 5️⃣ INTELIGENCIA ARTIFICIAL
  {
    id: 'ai-start',
    title: 'Inteligencia Artificial',
    narratorText: 'Ahora los sistemas no solo almacenan información. La interpretan. La inteligencia artificial comenzó a participar en la toma de decisiones.',
    projects: [projects.marketvision],
    theme: 'purple'
  },
  {
    id: 'ai-global',
    title: 'Impacto Global',
    narratorText: 'La IA pasó de analizar mercados a evaluar riesgos operacionales reales. El impacto dejó de ser local. Se volvió global. 30 años de clima histórico + tráfico aéreo global.',
    projects: [projects.aerorisk],
    theme: 'purple'
  },

  // 6️⃣ OBSERVABILIDAD Y ENTERPRISE
  {
    id: 'convergence',
    title: 'Observabilidad Enterprise',
    narratorText: 'Finalmente entendimos cómo unirlo todo: Sistemas, Datos, Cloud, Inteligencia Artificial, Observabilidad, Automatización, Arquitectura empresarial.',
    projects: [projects.nexus],
    theme: 'purple'
  },

  // CUMBRE
  {
    id: 'summit',
    title: 'La Cumbre',
    narratorText: 'Todo comenzó construyendo aplicaciones. Después llegaron las integraciones. Más tarde los datos. Luego la nube. Después la inteligencia artificial. Y finalmente la observabilidad. Cada proyecto fue un escalón. Cada tecnología una herramienta. Cada desafío una oportunidad para aprender. La montaña no representa proyectos. Representa evolución. Y el viaje continúa.',
    theme: 'dark'
  }
];

export { projects };
