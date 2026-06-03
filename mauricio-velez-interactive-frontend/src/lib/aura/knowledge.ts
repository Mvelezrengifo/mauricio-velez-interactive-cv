// Base de conocimiento de Aura - Archivo completo funcional
// Copia TODO este archivo a: src/lib/aura/knowledge.ts

import { KnowledgeEntry } from './types';

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: 'who-is-mauricio',
    question: 'Quien es Mauricio Velez?',
    answer: 'Mauricio Velez es un ingeniero orientado a backend, cloud, ingenieria de datos e inteligencia artificial. Su trayectoria comenzo en desarrollo web y sistemas institucionales, evolucionando posteriormente hacia arquitecturas cloud, plataformas analiticas y soluciones empresariales basadas en datos.',
    level: 'level_1',
    category: 'experience',
    keywords: ['quien', 'mauricio', 'velez', 'perfil', 'eres'],
    variations: ['Quien eres?', 'Quien es el dueño de este CV?', 'Hablame de Mauricio'],
    followUp: ['experience-years', 'main-specialty']
  },

  {
    id: 'experience-years',
    question: 'Cuantos años de experiencia tiene?',
    answer: 'Cuenta con mas de 12 años de experiencia en tecnologia, incluyendo trabajo institucional, desarrollo web, soporte y evolucion de sistemas, ademas de proyectos freelance y plataformas desarrolladas de forma independiente.',
    level: 'level_1',
    category: 'experience',
    keywords: ['años', 'experiencia', 'cuanto', 'tiempo', 'antiguedad'],
    variations: ['Cuanto tiempo lleva trabajando?', 'Es senior?', 'Cuantos años de trayectoria?'],
    followUp: ['first-project', 'industries-worked']
  },

  {
    id: 'first-project',
    question: 'Cual fue su primer proyecto?',
    answer: 'Uno de los primeros proyectos completos fue MokesClinic, una plataforma para gestion clinica que integraba frontend, backend, sincronizacion de informacion y persistencia de datos.',
    level: 'level_1',
    category: 'projects',
    keywords: ['primer', 'proyecto', 'inicial', 'comenzo', 'mokesclinic'],
    variations: ['Con que proyecto empezo?', 'Cual fue su primer desarrollo?'],
    followUp: ['technologies-used', 'project-evolution']
  },

  {
    id: 'technologies-used',
    question: 'Que tecnologias utiliza?',
    answer: 'Python, SQL, FastAPI, Spark, PySpark, BigQuery, Microsoft Fabric, Azure, AWS, PostgreSQL, React, Next.js, TypeScript y diversas herramientas de nube e integracion.',
    level: 'level_1',
    category: 'skills',
    keywords: ['tecnologias', 'herramientas', 'lenguajes', 'usa', 'conoce', 'stack'],
    variations: ['Que lenguajes domina?', 'Cual es su stack tecnico?'],
    followUp: ['main-specialty', 'cloud-experience']
  },

  {
    id: 'industries-worked',
    question: 'En que industrias ha trabajado?',
    answer: 'Ha trabajado en multiples sectores: salud con plataformas clinicas, agroindustria con sistemas de gestion, aviacion con analisis de riesgo aerocomercial, y tecnologia con plataformas SaaS y soluciones empresariales.',
    level: 'level_1',
    category: 'experience',
    keywords: ['industrias', 'sectores', 'areas', 'campos'],
    variations: ['En que sectores tiene experiencia?', 'Que tipo de empresas ha trabajado?'],
    followUp: ['biggest-project', 'main-specialty']
  },

  {
    id: 'github-recent-projects',
    question: 'Por que los proyectos publicos aparecen principalmente desde 2024?',
    answer: 'Porque gran parte de la experiencia previa corresponde a proyectos institucionales, mantenimiento de sistemas existentes y desarrollos privados para clientes que no podian publicarse en repositorios abiertos.',
    level: 'level_2',
    category: 'projects',
    keywords: ['github', 'repositorios', 'publicos', '2024', 'proyectos'],
    variations: ['Por que hay pocos proyectos en GitHub?', 'Por que los repos son recientes?'],
    followUp: ['real-clients', 'private-projects']
  },

  {
    id: 'aerorisk-project',
    question: 'Que es AeroRisk?',
    answer: 'AeroRisk es una plataforma global de ingenieria de datos e inteligencia artificial diseñada para evaluar riesgos aeronauticos en rutas de vuelo. Combina mas de 30 años de datos climaticos historicos con trafico aereo real usando BigQuery, y un motor de riesgo avanzado con FastAPI y Groq LLaMA 3.1. Clasifica las rutas en tres niveles: BAJO, MEDIO y CRITICO, generando recomendaciones operacionales para la aviacion.',
    level: 'level_2',
    category: 'projects',
    keywords: ['aerorisk', 'aviacion', 'riesgo', 'aereo', 'vuelo', 'bigquery', 'aeronautico'],
    variations: ['Que hace AeroRisk?', 'Hablame de AeroRisk', 'Cual es el proyecto de aviacion?'],
    followUp: ['most-complex-project', 'big-data-experience']
  },

  {
    id: 'marketvision-project',
    question: 'Que es MarketVision?',
    answer: 'MarketVision es una plataforma inteligente de analisis financiero en tiempo real que combina analisis tecnico automatizado, arquitectura serverless en AWS e inteligencia artificial con Google Gemini 2.5 Flash. Analiza activos como BTC, ETH, acciones y oro, generando señales de compra, venta o neutral con razonamiento contextual automatizado.',
    level: 'level_2',
    category: 'projects',
    keywords: ['marketvision', 'financiero', 'trading', 'btc', 'cripto', 'acciones'],
    variations: ['Que hace MarketVision?', 'Hablame de MarketVision', 'El proyecto de finanzas?'],
    followUp: ['technologies-used', 'cloud-experience']
  },

  {
    id: 'alcaldia-experience',
    question: 'Que hizo en la Alcaldia?',
    answer: 'Trabajo durante 12 años en Gobierno en Linea, un programa del Ministerio de Tecnologias de Colombia. Desempeño labores de Web Master, desarrollando con HTML y Java, tambien trabajo en la parte de prensa y fue Lider GEL (Gobierno en Linea). Manejo tecnologias como claves, SECOP y herramientas de transparencia gubernamental.',
    level: 'level_2',
    category: 'experience',
    keywords: ['alcaldia', 'gobierno', 'web master', 'publico', 'colombia', 'gel', 'secop'],
    variations: ['Trabajo en el gobierno?', 'Que hizo en el sector publico?', 'Experiencia en entidades publicas?'],
    followUp: ['experience-years', 'industries-worked']
  },

  {
    id: 'real-clients',
    question: 'Ha trabajado con clientes reales?',
    answer: 'Si. Ademas de proyectos publicos, ha participado en desarrollos para clinicas, talleres, comercios y entidades institucionales, muchos de ellos privados por acuerdos con los clientes.',
    level: 'level_2',
    category: 'experience',
    keywords: ['clientes', 'reales', 'empresas', 'trabajo'],
    variations: ['Tiene experiencia con clientes?', 'Ha trabajado para empresas?'],
    followUp: ['biggest-project', 'private-projects']
  },

  {
    id: 'main-specialty',
    question: 'Cual es su especialidad principal?',
    answer: 'Backend e Ingenieria de Datos. Aunque puede trabajar como Full Stack, su fortaleza esta en la logica de negocio, procesamiento de datos, APIs, automatizacion e integracion de sistemas.',
    level: 'level_2',
    category: 'skills',
    keywords: ['especialidad', 'fuerte', 'principal', 'fortaleza'],
    variations: ['En que es mejor?', 'Cual es su fuerte?', 'Es frontend o backend?'],
    followUp: ['backend-or-frontend', 'big-data-experience']
  },

  {
    id: 'big-data-experience',
    question: 'Ha trabajado con grandes volumenes de datos?',
    answer: 'Si. Sus proyectos incluyen arquitecturas Lakehouse y procesamiento distribuido que manejan millones de registros mediante Spark, BigQuery, Fabric y Databricks.',
    level: 'level_2',
    category: 'skills',
    keywords: ['big data', 'volumenes', 'millones', 'registros', 'lakehouse'],
    variations: ['Tiene experiencia con Big Data?', 'Ha manejado muchos datos?'],
    followUp: ['most-complex-project', 'technologies-used']
  },

  {
    id: 'cloud-experience',
    question: 'Cual es su experiencia en cloud?',
    answer: 'Tiene experiencia con AWS, Azure y Google Cloud. Ha diseñado arquitecturas serverless, pipelines de datos, funciones Lambda, Azure Functions, y servicios de almacenamiento y procesamiento distribuido.',
    level: 'level_2',
    category: 'skills',
    keywords: ['cloud', 'nube', 'aws', 'azure', 'gcp', 'serverless'],
    variations: ['Conoce AWS?', 'Sabe Azure?', 'Ha trabajado en la nube?'],
    followUp: ['technologies-used', 'big-data-experience']
  },

  {
    id: 'english-level',
    question: 'Habla ingles?',
    answer: 'Tiene nivel intermedio-avanzado. Puede leer documentacion tecnica, participar en reuniones y comunicarse efectivamente en contextos profesionales de tecnologia.',
    level: 'level_2',
    category: 'skills',
    keywords: ['ingles', 'english', 'idioma', 'nivel'],
    variations: ['Cual es su nivel de ingles?', 'Puede trabajar en ingles?'],
    followUp: ['availability', 'remote-work']
  },

  {
    id: 'availability',
    question: 'Esta disponible para trabajar?',
    answer: 'Si, esta disponible para proyectos full-time, colaboraciones o consultoria. Puede trabajar de forma remota o presencial según las necesidades del proyecto.',
    level: 'level_2',
    category: 'experience',
    keywords: ['disponible', 'disponibilidad', 'trabajo', 'busca', 'contratar'],
    variations: ['Esta buscando trabajo?', 'Cuando puede empezar?'],
    followUp: ['contact-info', 'remote-work']
  },

  {
    id: 'remote-work',
    question: 'Trabaja remoto o presencial?',
    answer: 'Puede trabajar en ambas modalidades. Tiene experiencia en equipos remotos distribuidos y tambien en colaboración presencial. Se adapta según las necesidades del proyecto.',
    level: 'level_2',
    category: 'experience',
    keywords: ['remoto', 'presencial', 'modalidad', 'home office'],
    variations: ['Puede trabajar remoto?', 'Trabaja desde casa?'],
    followUp: ['availability', 'english-level']
  },

  {
    id: 'web-to-data-evolution',
    question: 'Como evoluciono de desarrollo web a ingenieria de datos?',
    answer: 'La evolucion ocurrio de forma natural. Primero construyo aplicaciones para resolver necesidades de usuarios. Despues surgio la necesidad de integrar sistemas, procesar mas informacion y tomar decisiones basadas en datos. Eso lo llevo hacia arquitecturas analiticas, cloud e inteligencia artificial.',
    level: 'level_3',
    category: 'evolution',
    keywords: ['evolucion', 'web', 'datos', 'transicion', 'cambio'],
    variations: ['Como hizo la transicion a datos?', 'Por que se movio a ingenieria de datos?'],
    followUp: ['evolution-project', 'current-work']
  },

  {
    id: 'evolution-project',
    question: 'Que proyecto representa mejor su evolucion?',
    answer: 'AeroRisk. Porque combina ingenieria de datos, BigQuery, procesamiento de informacion historica, inteligencia artificial y generacion de recomendaciones para escenarios reales.',
    level: 'level_3',
    category: 'projects',
    keywords: ['evolucion', 'representa', 'proyecto', 'mejor', 'aerorisk'],
    variations: ['Cual proyecto muestra mejor su crecimiento?'],
    followUp: ['most-complex-project', 'big-data-experience']
  },

  {
    id: 'most-complex-project',
    question: 'Cual es su proyecto mas complejo?',
    answer: 'NEXUS AIOps Observability. Porque integra observabilidad, arquitectura distribuida, eventos, backend empresarial, AWS, monitoreo y preparacion para inteligencia artificial operativa.',
    level: 'level_3',
    category: 'projects',
    keywords: ['complejo', 'dificil', 'nexus', 'aiops', 'desafiante'],
    variations: ['Cual fue su proyecto mas dificil?', 'Que proyecto le represento mas desafio?'],
    followUp: ['biggest-challenge', 'technologies-used']
  },

  {
    id: 'biggest-challenge',
    question: 'Cual fue el mayor desafio tecnico?',
    answer: 'Pasar de construir aplicaciones tradicionales a diseñar sistemas distribuidos y arquitecturas cloud capaces de procesar grandes volumenes de datos manteniendo trazabilidad, rendimiento y escalabilidad.',
    level: 'level_3',
    category: 'evolution',
    keywords: ['desafio', 'reto', 'mayor', 'dificultad', 'obstaculo'],
    variations: ['Cual fue su mayor reto?', 'Que le costo mas aprender?'],
    followUp: ['web-to-data-evolution', 'most-complex-project']
  },

  {
    id: 'biggest-project',
    question: 'Cual ha sido su proyecto mas grande?',
    answer: 'A nivel de impacto, MokesAgro que gestiona operaciones para una empresa agroindustrial completa. A nivel tecnico, NEXUS AIOps por su arquitectura distribuida y multiples componentes integrados.',
    level: 'level_3',
    category: 'projects',
    keywords: ['grande', 'impacto', 'escala', 'mayor'],
    variations: ['Cual es su proyecto mas importante?', 'Que proyecto tuvo mas impacto?'],
    followUp: ['most-complex-project', 'real-clients']
  },

  {
    id: 'why-still-looking',
    question: 'Si tienes tanta experiencia, por que sigues buscando trabajo?',
    answer: 'Porque la tecnologia evoluciona constantemente y los proyectos personales no reemplazan el valor de colaborar con equipos, resolver problemas reales de negocio y participar en iniciativas de mayor escala.',
    level: 'difficult',
    category: 'motivation',
    keywords: ['por que', 'buscando', 'experiencia', 'trabajo'],
    variations: ['Por que busca trabajo si tiene experiencia?', 'No tiene trabajo estable?'],
    followUp: ['what-unique-value', 'motivation']
  },

  {
    id: 'what-unique-value',
    question: 'Que aporta Mauricio que no aporte otro candidato?',
    answer: 'Una combinacion poco comun entre experiencia institucional, desarrollo de software, ingenieria de datos, cloud e inteligencia artificial, junto con la capacidad de construir soluciones completas desde la idea hasta la implementacion.',
    level: 'difficult',
    category: 'comparison',
    keywords: ['aporta', 'diferente', 'unico', 'valor', 'candidato'],
    variations: ['Por que contratarlo a el?', 'Que lo hace diferente?'],
    followUp: ['main-specialty', 'evolution-project']
  },

  {
    id: 'backend-or-frontend',
    question: 'Prefiere backend o frontend?',
    answer: 'Backend. Disfruta especialmente diseñar APIs, modelos de datos, pipelines, automatizacion e integracion de sistemas.',
    level: 'difficult',
    category: 'skills',
    keywords: ['backend', 'frontend', 'prefiere', 'gusta'],
    variations: ['Que le gusta mas?', 'Es mas de backend o frontend?'],
    followUp: ['main-specialty', 'technologies-used']
  },

  {
    id: 'why-interactive-cv',
    question: 'Por que creo esta pagina interactiva?',
    answer: 'Porque considera que una trayectoria profesional se entiende mejor mediante una historia que mediante una lista de tecnologias. Esta experiencia busca mostrar la evolucion completa detras de cada proyecto.',
    level: 'difficult',
    category: 'motivation',
    keywords: ['pagina', 'interactiva', 'cv', 'creo'],
    variations: ['Por que hizo este CV asi?', 'Por que no un CV normal?'],
    followUp: ['who-is-mauricio', 'motivation']
  },

  {
    id: 'unknown-problem',
    question: 'Si mañana te doy un problema que nunca has visto, que haces?',
    answer: 'Empiezo entendiendo el negocio antes que la tecnologia. Luego divido el problema en partes pequeñas, identifico restricciones, investigo lo que no conozco y construyo una solucion iterativa.',
    level: 'difficult',
    category: 'skills',
    keywords: ['problema', 'nunca', 'visto', 'nuevo', 'resolver'],
    variations: ['Como enfrentas problemas nuevos?', 'Que haces si no sabes resolver algo?'],
    followUp: ['biggest-challenge', 'motivation']
  },

  {
    id: 'motivation',
    question: 'Que lo motiva?',
    answer: 'Resolver problemas reales mediante tecnologia y construir soluciones que generen impacto tangible para personas y organizaciones.',
    level: 'human',
    category: 'motivation',
    keywords: ['motiva', 'motivacion', 'impulsa', 'apasiona'],
    variations: ['Que le apasiona?', 'Que lo impulsa?'],
    followUp: ['why-interactive-cv', 'current-work']
  },

  {
    id: 'current-work',
    question: 'Que esta construyendo actualmente?',
    answer: 'Actualmente trabaja en soluciones relacionadas con asistentes inteligentes, plataformas cloud, automatizacion e integracion de inteligencia artificial con procesos empresariales.',
    level: 'human',
    category: 'projects',
    keywords: ['actualmente', 'construyendo', 'ahora', 'trabajando'],
    variations: ['En que esta trabajando ahora?', 'Que esta desarrollando actualmente?'],
    followUp: ['availability', 'motivation']
  },

  {
    id: 'contact-info',
    question: 'Como lo contacto?',
    answer: 'Puedes contactar a Mauricio directamente por WhatsApp para una respuesta rapida, o ver su perfil de LinkedIn para mas detalles profesionales.',
    level: 'level_1',
    category: 'contact',
    keywords: ['contacto', 'contactar', 'telefono', 'email', 'whatsapp', 'linkedin'],
    variations: ['Como lo contacto?', 'Tiene WhatsApp?', 'Cual es su email?'],
    followUp: ['availability', 'english-level']
  },

  {
    id: 'linkedin',
    question: 'Tiene LinkedIn?',
    answer: 'Si, puedes encontrar su perfil de LinkedIn donde tiene mas detalles sobre su experiencia, certificaciones y recomendaciones de colegas.',
    level: 'level_1',
    category: 'contact',
    keywords: ['linkedin', 'perfil', 'red', 'profesional'],
    variations: ['Me pasas su LinkedIn?', 'Donde esta su LinkedIn?'],
    followUp: ['contact-info', 'github-profile']
  },

  {
    id: 'github-profile',
    question: 'Tiene GitHub?',
    answer: 'Si, tiene un perfil de GitHub donde comparte proyectos open source, codigo de ejemplo y algunos de sus desarrollos publicos.',
    level: 'level_1',
    category: 'contact',
    keywords: ['github', 'repositorio', 'codigo', 'open source'],
    variations: ['Me pasas su GitHub?', 'Donde esta su codigo?'],
    followUp: ['github-recent-projects', 'technologies-used']
  }
];

export function getKnowledgeById(id: string): KnowledgeEntry | undefined {
  return knowledgeBase.find(entry => entry.id === id);
}

export function getKnowledgeByLevel(level: string): KnowledgeEntry[] {
  return knowledgeBase.filter(entry => entry.level === level);
}

export function getKnowledgeByCategory(category: string): KnowledgeEntry[] {
  return knowledgeBase.filter(entry => entry.category === category);
}
