// Base de conocimiento de Aura - Archivo completo con 33 preguntas
// Copia este archivo a: src/lib/aura/knowledge.ts

import { KnowledgeEntry } from './types';

export const knowledgeBase: KnowledgeEntry[] = [
  // =====================================================
  // NIVEL 1 - Preguntas obvias
  // =====================================================

  {
    id: 'who-is-mauricio',
    question: '¿Quién es Mauricio Velez?',
    answer: 'Mauricio Velez es un ingeniero orientado a backend, cloud, ingeniería de datos e inteligencia artificial. Su trayectoria comenzó en desarrollo web y sistemas institucionales, evolucionando posteriormente hacia arquitecturas cloud, plataformas analíticas y soluciones empresariales basadas en datos.',
    level: 'level_1',
    category: 'experience',
    keywords: ['quien', 'mauricio', 'velez', 'perfil', 'eres', 'quién es'],
    variations: [
      '¿Quién eres?',
      '¿Quién es el dueño de este CV?',
      '¿De quién es esta presentación?',
      'Háblame de Mauricio'
    ],
    followUp: ['experience-years', 'main-specialty', 'technologies-used']
  },

  {
    id: 'experience-years',
    question: '¿Cuántos años de experiencia tiene?',
    answer: 'Cuenta con más de 12 años de experiencia en tecnología, incluyendo trabajo institucional, desarrollo web, soporte y evolución de sistemas, además de proyectos freelance y plataformas desarrolladas de forma independiente.',
    level: 'level_1',
    category: 'experience',
    keywords: ['años', 'experiencia', 'cuanto', 'tiempo', 'antiguedad'],
    variations: [
      '¿Cuánto tiempo lleva trabajando?',
      '¿Qué tan experimentado es?',
      '¿Es senior?',
      '¿Cuántos años de trayectoria?'
    ],
    followUp: ['first-project', 'industries-worked']
  },

  {
    id: 'first-project',
    question: '¿Cuál fue su primer proyecto?',
    answer: 'Uno de los primeros proyectos completos fue MokesClinic, una plataforma para gestión clínica que integraba frontend, backend, sincronización de información y persistencia de datos.',
    level: 'level_1',
    category: 'projects',
    keywords: ['primer', 'proyecto', 'inicial', 'comenzo', 'empezó', 'mokesclinic'],
    variations: [
      '¿Con qué proyecto empezó?',
      '¿Cuál fue su primer desarrollo?',
      '¿Cómo comenzó su carrera?'
    ],
    followUp: ['technologies-used', 'project-evolution']
  },

  {
    id: 'technologies-used',
    question: '¿Qué tecnologías utiliza?',
    answer: 'Python, SQL, FastAPI, Spark, PySpark, BigQuery, Microsoft Fabric, Azure, AWS, PostgreSQL, React, Next.js, TypeScript y diversas herramientas de nube e integración.',
    level: 'level_1',
    category: 'skills',
    keywords: ['tecnologias', 'herramientas', 'lenguajes', 'usa', 'conoce', 'stack', 'tech'],
    variations: [
      '¿Qué lenguajes domina?',
      '¿Cuál es su stack técnico?',
      '¿Qué tecnologías conoce?',
      '¿Sabe Python? ¿Sabe SQL?'
    ],
    followUp: ['main-specialty', 'cloud-experience']
  },

  {
    id: 'industries-worked',
    question: '¿En qué industrias ha trabajado?',
    answer: 'Ha trabajado en múltiples sectores: salud con plataformas clínicas, agroindustria con sistemas de gestión, aviación con análisis de riesgo aerocomercial, y tecnología con plataformas SaaS y soluciones empresariales.',
    level: 'level_1',
    category: 'experience',
    keywords: ['industrias', 'sectores', 'areas', 'campos', 'rubros'],
    variations: [
      '¿En qué sectores tiene experiencia?',
      '¿Qué tipo de empresas ha trabajado?',
      '¿Conoce el sector X?'
    ],
    followUp: ['biggest-project', 'main-specialty']
  },

  // =====================================================
  // NIVEL 2 - Preguntas de reclutador técnico
  // =====================================================

  {
    id: 'github-recent-projects',
    question: '¿Por qué los proyectos públicos aparecen principalmente desde 2024?',
    answer: 'Porque gran parte de la experiencia previa corresponde a proyectos institucionales, mantenimiento de sistemas existentes y desarrollos privados para clientes que no podían publicarse en repositorios abiertos.',
    level: 'level_2',
    category: 'projects',
    keywords: ['github', 'repositorios', 'publicos', '2024', 'proyectos', 'por que'],
    variations: [
      '¿Por qué hay pocos proyectos en GitHub?',
      '¿Por qué los repos son recientes?',
      '¿No tiene proyectos anteriores?'
    ],
    followUp: ['real-clients', 'private-projects']
  },

  {
    id: 'aerorisk-project',
    question: '¿Qué es AeroRisk?',
    answer: 'AeroRisk es una plataforma global de ingeniería de datos e inteligencia artificial diseñada para evaluar riesgos aeronáuticos en rutas de vuelo. Combina más de 30 años de datos climáticos históricos con tráfico aéreo real usando BigQuery, y un motor de riesgo avanzado con FastAPI y Groq LLaMA 3.1. Clasifica las rutas en tres niveles: BAJO, MEDIO y CRÍTICO, generando recomendaciones operacionales para la aviación.',
    level: 'level_2',
    category: 'projects',
    keywords: ['aerorisk', 'aviacion', 'riesgo', 'aereo', 'vuelo', 'bigquery', 'aeronautico'],
    variations: [
      '¿Qué hace AeroRisk?',
      'Háblame de AeroRisk',
      '¿Cuál es el proyecto de aviación?',
      '¿El proyecto de riesgos aéreos?'
    ],
    followUp: ['most-complex-project', 'big-data-experience']
  },

  {
    id: 'marketvision-project',
    question: '¿Qué es MarketVision?',
    answer: 'MarketVision es una plataforma inteligente de análisis financiero en tiempo real que combina análisis técnico automatizado, arquitectura serverless en AWS e inteligencia artificial con Google Gemini 2.5 Flash. Analiza activos como BTC, ETH, acciones y oro, generando señales de compra, venta o neutral con razonamiento contextual automatizado. A diferencia de un dashboard tradicional, interpreta tendencias y evalúa riesgo de forma inteligente.',
    level: 'level_2',
    category: 'projects',
    keywords: ['marketvision', 'financiero', 'trading', 'btc', 'cripto', 'acciones', 'inversion'],
    variations: [
      '¿Qué hace MarketVision?',
      'Háblame de MarketVision',
      '¿El proyecto de finanzas?',
      '¿La plataforma de trading?'
    ],
    followUp: ['technologies-used', 'cloud-experience']
  },

  {
    id: 'alcaldia-experience',
    question: '¿Qué hizo en la Alcaldía?',
    answer: 'Trabajó durante 12 años en Gobierno en Línea, un programa del Ministerio de Tecnologías de Colombia. Desempeñó labores de Web Master, desarrollando con HTML y Java, también trabajó en la parte de prensa y fue Líder GEL (Gobierno en Línea). Manejó tecnologías como claves, SECOP y herramientas de transparencia gubernamental.',
    level: 'level_2',
    category: 'experience',
    keywords: ['alcaldia', 'alcalda', 'gobierno', 'gobierno en linea', 'web master', 'publico', 'colombia', 'gel', 'secop', 'institucional', 'ministerio'],
    variations: [
      '¿Trabajó en el gobierno?',
      '¿Qué hizo en el sector público?',
      '¿Experiencia en entidades públicas?',
      '¿Qué hizo esos 12 años institucionales?',
      '¿Trabajaste en la alcaldía?',
      'Gobierno en Línea',
      '¿Qué hizo en gobierno?'
    ],
    followUp: ['experience-years', 'industries-worked']
  },

  {
    id: 'real-clients',
    question: '¿Ha trabajado con clientes reales?',
    answer: 'Sí. Además de proyectos públicos, ha participado en desarrollos para clínicas, talleres, comercios y entidades institucionales, muchos de ellos privados por acuerdos con los clientes.',
    level: 'level_2',
    category: 'experience',
    keywords: ['clientes', 'reales', 'empresas', 'trabajo', 'proyectos reales'],
    variations: [
      '¿Tiene experiencia con clientes?',
      '¿Ha trabajado para empresas?',
      '¿Sus proyectos son reales?'
    ],
    followUp: ['biggest-project', 'private-projects']
  },

  {
    id: 'main-specialty',
    question: '¿Cuál es su especialidad principal?',
    answer: 'Backend e Ingeniería de Datos. Aunque puede trabajar como Full Stack, su fortaleza está en la lógica de negocio, procesamiento de datos, APIs, automatización e integración de sistemas.',
    level: 'level_2',
    category: 'skills',
    keywords: ['especialidad', 'fuerte', 'principal', 'fortaleza', 'focus', 'enfoque'],
    variations: [
      '¿En qué es mejor?',
      '¿Cuál es su fuerte?',
      '¿Es frontend o backend?',
      '¿Qué prefiere?'
    ],
    followUp: ['backend-or-frontend', 'big-data-experience']
  },

  {
    id: 'big-data-experience',
    question: '¿Ha trabajado con grandes volúmenes de datos?',
    answer: 'Sí. Sus proyectos incluyen arquitecturas Lakehouse y procesamiento distribuido que manejan millones de registros mediante Spark, BigQuery, Fabric y Databricks.',
    level: 'level_2',
    category: 'skills',
    keywords: ['big data', 'volumenes', 'millones', 'registros', 'datos masivos', 'lakehouse'],
    variations: [
      '¿Tiene experiencia con Big Data?',
      '¿Ha manejado muchos datos?',
      '¿Conoce Spark? ¿BigQuery?'
    ],
    followUp: ['most-complex-project', 'technologies-used']
  },

  {
    id: 'cloud-experience',
    question: '¿Qué experiencia tiene con cloud?',
    answer: 'Tiene experiencia con AWS, Azure y Google Cloud. Ha diseñado arquitecturas serverless, pipelines de datos, funciones Lambda, Azure Functions, y servicios de almacenamiento y procesamiento distribuido.',
    level: 'level_2',
    category: 'skills',
    keywords: ['cloud', 'nube', 'aws', 'azure', 'gcp', 'serverless'],
    variations: [
      '¿Conoce AWS?',
      '¿Sabe Azure?',
      '¿Tiene certificaciones cloud?',
      '¿Ha trabajado en la nube?'
    ],
    followUp: ['technologies-used', 'big-data-experience']
  },

  {
    id: 'english-level',
    question: '¿Cuál es su nivel de inglés?',
    answer: 'Tiene nivel intermedio-avanzado. Puede leer documentación técnica, participar en reuniones y comunicarse efectivamente en contextos profesionales de tecnología.',
    level: 'level_2',
    category: 'skills',
    keywords: ['ingles', 'english', 'idioma', 'nivel'],
    variations: [
      '¿Habla inglés?',
      '¿Puede trabajar en inglés?',
      '¿Qué nivel de inglés tiene?'
    ],
    followUp: ['availability', 'remote-work']
  },

  {
    id: 'availability',
    question: '¿Está disponible para trabajar?',
    answer: 'Sí, está disponible para proyectos full-time, colaboraciones o consultoría. Puede trabajar de forma remota o presencial según las necesidades del proyecto.',
    level: 'level_2',
    category: 'experience',
    keywords: ['disponible', 'disponibilidad', 'trabajo', 'busca', 'contratar'],
    variations: [
      '¿Está buscando trabajo?',
      '¿Cuándo puede empezar?',
      '¿Está disponible?'
    ],
    followUp: ['contact-info', 'remote-work']
  },

  {
    id: 'remote-work',
    question: '¿Trabaja remoto o presencial?',
    answer: 'Puede trabajar en ambas modalidades. Tiene experiencia en equipos remotos distribuidos y también en colaboración presencial. Se adapta según las necesidades del proyecto.',
    level: 'level_2',
    category: 'experience',
    keywords: ['remoto', 'presencial', 'modalidad', 'home office', 'distancia'],
    variations: [
      '¿Puede trabajar remoto?',
      '¿Trabaja desde casa?',
      '¿Requiere presencialidad?'
    ],
    followUp: ['availability', 'english-level']
  },

  // =====================================================
  // NIVEL 3 - Preguntas inteligentes
  // =====================================================

  {
    id: 'web-to-data-evolution',
    question: '¿Cómo evolucionó de desarrollo web a ingeniería de datos?',
    answer: 'La evolución ocurrió de forma natural. Primero construyó aplicaciones para resolver necesidades de usuarios. Después surgió la necesidad de integrar sistemas, procesar más información y tomar decisiones basadas en datos. Eso lo llevó hacia arquitecturas analíticas, cloud e inteligencia artificial.',
    level: 'level_3',
    category: 'evolution',
    keywords: ['evolucion', 'web', 'datos', 'como', 'transicion', 'cambio', 'paso'],
    variations: [
      '¿Cómo hizo la transición a datos?',
      '¿Por qué se movió a ingeniería de datos?',
      '¿Siempre estuvo en datos?'
    ],
    followUp: ['evolution-project', 'current-work']
  },

  {
    id: 'evolution-project',
    question: '¿Qué proyecto representa mejor su evolución?',
    answer: 'AeroRisk. Porque combina ingeniería de datos, BigQuery, procesamiento de información histórica, inteligencia artificial y generación de recomendaciones para escenarios reales.',
    level: 'level_3',
    category: 'projects',
    keywords: ['evolucion', 'representa', 'proyecto', 'mejor', 'aerorisk'],
    variations: [
      '¿Cuál proyecto muestra mejor su crecimiento?',
      '¿Qué proyecto lo representa más?',
      'Háblame de AeroRisk'
    ],
    followUp: ['most-complex-project', 'big-data-experience']
  },

  {
    id: 'most-complex-project',
    question: '¿Qué proyecto considera técnicamente más complejo?',
    answer: 'NEXUS AIOps Observability. Porque integra observabilidad, arquitectura distribuida, eventos, backend empresarial, AWS, monitoreo y preparación para inteligencia artificial operativa.',
    level: 'level_3',
    category: 'projects',
    keywords: ['complejo', 'dificil', 'complejo tecnico', 'nexus', 'aiops', 'desafiante'],
    variations: [
      '¿Cuál fue su proyecto más difícil?',
      '¿Qué proyecto le representó más desafío?',
      'Háblame de NEXUS'
    ],
    followUp: ['biggest-challenge', 'technologies-used']
  },

  {
    id: 'biggest-challenge',
    question: '¿Cuál fue el mayor desafío técnico?',
    answer: 'Pasar de construir aplicaciones tradicionales a diseñar sistemas distribuidos y arquitecturas cloud capaces de procesar grandes volúmenes de datos manteniendo trazabilidad, rendimiento y escalabilidad.',
    level: 'level_3',
    category: 'evolution',
    keywords: ['desafio', 'reto', 'mayor', 'dificultad', 'challenge', 'obstaculo'],
    variations: [
      '¿Cuál fue su mayor reto?',
      '¿Qué le costó más aprender?',
      '¿Cuál fue el mayor obstáculo?'
    ],
    followUp: ['web-to-data-evolution', 'most-complex-project']
  },

  {
    id: 'biggest-project',
    question: '¿Cuál ha sido su proyecto más grande?',
    answer: 'A nivel de impacto, MokesAgro que gestiona operaciones para una empresa agroindustrial completa. A nivel técnico, NEXUS AIOps por su arquitectura distribuida y múltiples componentes integrados.',
    level: 'level_3',
    category: 'projects',
    keywords: ['grande', 'impacto', 'escala', 'mas grande', 'mayor'],
    variations: [
      '¿Cuál es su proyecto más importante?',
      '¿Qué proyecto tuvo más impacto?',
      '¿Cuál fue el más grande?'
    ],
    followUp: ['most-complex-project', 'real-clients']
  },

  // =====================================================
  // PREGUNTAS DIFÍCILES
  // =====================================================

  {
    id: 'why-still-looking',
    question: 'Si tienes tanta experiencia, ¿por qué sigues buscando trabajo?',
    answer: 'Porque la tecnología evoluciona constantemente y los proyectos personales no reemplazan el valor de colaborar con equipos, resolver problemas reales de negocio y participar en iniciativas de mayor escala.',
    level: 'difficult',
    category: 'motivation',
    keywords: ['por que', 'buscando', 'experiencia', 'trabajo', 'sigo'],
    variations: [
      '¿Por qué busca trabajo si tiene experiencia?',
      '¿No tiene trabajo estable?',
      '¿Por qué no trabaja por su cuenta?'
    ],
    followUp: ['what-unique-value', 'motivation']
  },

  {
    id: 'what-unique-value',
    question: '¿Qué aporta Mauricio que no aporte otro candidato?',
    answer: 'Una combinación poco común entre experiencia institucional, desarrollo de software, ingeniería de datos, cloud e inteligencia artificial, junto con la capacidad de construir soluciones completas desde la idea hasta la implementación.',
    level: 'difficult',
    category: 'comparison',
    keywords: ['aporta', 'diferente', 'unico', 'valor', 'diferencia', 'candidato'],
    variations: [
      '¿Por qué contratarlo a él?',
      '¿Qué lo hace diferente?',
      '¿Por qué él y no otro?'
    ],
    followUp: ['main-specialty', 'evolution-project']
  },

  {
    id: 'backend-or-frontend',
    question: '¿Prefiere backend o frontend?',
    answer: 'Backend. Disfruta especialmente diseñar APIs, modelos de datos, pipelines, automatización e integración de sistemas.',
    level: 'difficult',
    category: 'skills',
    keywords: ['backend', 'frontend', 'prefiere', 'gusta', 'preferencia'],
    variations: [
      '¿Qué le gusta más?',
      '¿Es más de backend o frontend?',
      '¿En qué se siente más cómodo?'
    ],
    followUp: ['main-specialty', 'technologies-used']
  },

  {
    id: 'why-interactive-cv',
    question: '¿Por qué creó esta página interactiva?',
    answer: 'Porque considera que una trayectoria profesional se entiende mejor mediante una historia que mediante una lista de tecnologías. Esta experiencia busca mostrar la evolución completa detrás de cada proyecto.',
    level: 'difficult',
    category: 'motivation',
    keywords: ['pagina', 'interactiva', 'cv', 'por que', 'creo', 'sitio'],
    variations: [
      '¿Por qué hizo este CV así?',
      '¿Por qué no un CV normal?',
      '¿Qué inspira este diseño?'
    ],
    followUp: ['who-is-mauricio', 'motivation']
  },

  {
    id: 'unknown-problem',
    question: 'Si mañana te doy un problema que nunca has visto, ¿qué haces?',
    answer: 'Empiezo entendiendo el negocio antes que la tecnología. Luego divido el problema en partes pequeñas, identifico restricciones, investigo lo que no conozco y construyo una solución iterativa. La mayoría de mis proyectos nacieron precisamente de problemas que nunca había resuelto antes.',
    level: 'difficult',
    category: 'skills',
    keywords: ['problema', 'nunca', 'visto', 'nuevo', 'desconocido', 'resolver'],
    variations: [
      '¿Cómo enfrentas problemas nuevos?',
      '¿Qué haces si no sabes resolver algo?',
      '¿Cómo aprendes cosas nuevas?'
    ],
    followUp: ['biggest-challenge', 'motivation']
  },

  // =====================================================
  // PREGUNTAS HUMANAS
  // =====================================================

  {
    id: 'motivation',
    question: '¿Qué lo motiva?',
    answer: 'Resolver problemas reales mediante tecnología y construir soluciones que generen impacto tangible para personas y organizaciones.',
    level: 'human',
    category: 'motivation',
    keywords: ['motiva', 'motivacion', 'impulsa', 'apasiona', 'gusta'],
    variations: [
      '¿Qué le apasiona?',
      '¿Qué lo impulsa?',
      '¿Por qué hace lo que hace?'
    ],
    followUp: ['why-interactive-cv', 'current-work']
  },

  {
    id: 'learned-private-projects',
    question: '¿Qué aprendió de los proyectos que no aparecen en GitHub?',
    answer: 'Que muchas veces el valor de un proyecto no está en la visibilidad pública sino en el problema que resuelve para quien lo utiliza.',
    level: 'human',
    category: 'projects',
    keywords: ['aprendio', 'proyectos', 'github', 'no aparecen', 'privados'],
    variations: [
      '¿Qué le enseñaron los proyectos privados?',
      '¿Valen menos los proyectos sin repo?',
      '¿Qué aprendió de lo que no se ve?'
    ],
    followUp: ['real-clients', 'github-recent-projects']
  },

  {
    id: 'current-work',
    question: '¿Qué está construyendo actualmente?',
    answer: 'Actualmente trabaja en soluciones relacionadas con asistentes inteligentes, plataformas cloud, automatización e integración de inteligencia artificial con procesos empresariales.',
    level: 'human',
    category: 'projects',
    keywords: ['actualmente', 'construyendo', 'ahora', 'trabajando', 'actual', 'presente'],
    variations: [
      '¿En qué está trabajando ahora?',
      '¿Qué está desarrollando actualmente?',
      '¿Cuáles son sus proyectos actuales?'
    ],
    followUp: ['availability', 'motivation']
  },

  // =====================================================
  // INFORMACIÓN DE CONTACTO
  // =====================================================

  {
    id: 'contact-info',
    question: '¿Cómo puedo contactarlo?',
    answer: '¡Claro! Puedes contactar a Mauricio directamente por WhatsApp para una respuesta rápida, o ver su perfil de LinkedIn para más detalles profesionales.',
    level: 'level_1',
    category: 'contact',
    keywords: ['contacto', 'contactar', 'telefono', 'email', 'whatsapp', 'linkedin', 'comunicar'],
    variations: [
      '¿Cómo lo contacto?',
      '¿Tiene WhatsApp?',
      '¿Me das su contacto?',
      '¿Dónde lo encuentro?',
      '¿Cuál es su email?'
    ],
    followUp: ['availability', 'english-level']
  },

  {
    id: 'linkedin',
    question: '¿Tiene LinkedIn?',
    answer: 'Sí, puedes encontrar su perfil de LinkedIn donde tiene más detalles sobre su experiencia, certificaciones y recomendaciones de colegas.',
    level: 'level_1',
    category: 'contact',
    keywords: ['linkedin', 'perfil', 'red', 'profesional'],
    variations: [
      '¿Me pasas su LinkedIn?',
      '¿Dónde está su LinkedIn?',
      '¿Tiene perfil profesional?'
    ],
    followUp: ['contact-info', 'github-profile']
  },

  {
    id: 'github-profile',
    question: '¿Tiene GitHub?',
    answer: 'Sí, tiene un perfil de GitHub donde comparte proyectos open source, código de ejemplo y algunos de sus desarrollos públicos.',
    level: 'level_1',
    category: 'contact',
    keywords: ['github', 'repositorio', 'codigo', 'open source'],
    variations: [
      '¿Me pasas su GitHub?',
      '¿Dónde está su código?',
      '¿Tiene repositorios públicos?'
    ],
    followUp: ['github-recent-projects', 'technologies-used']
  }
];

// Función helper para buscar por ID
export function getKnowledgeById(id: string): KnowledgeEntry | undefined {
  return knowledgeBase.find(entry => entry.id === id);
}

// Función helper para filtrar por nivel
export function getKnowledgeByLevel(level: string): KnowledgeEntry[] {
  return knowledgeBase.filter(entry => entry.level === level);
}

// Función helper para filtrar por categoría
export function getKnowledgeByCategory(category: string): KnowledgeEntry[] {
  return knowledgeBase.filter(entry => entry.category === category);
}
