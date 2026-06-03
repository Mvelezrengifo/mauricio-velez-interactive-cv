import { Phase } from '@/types/mountain';

export const phases: Phase[] = [
  {
    id: 'bienvenida',
    narratorText: 'Hola Mauro. Bienvenido a tu espacio. Aquí es donde tu infraestructura cobra vida. Vamos a iniciar el ascenso por tus proyectos en Azure.',
    projects: [] // La bienvenida es solo texto, por eso está vacío
  },
  {
    id: 'fase1',
    narratorText: 'En el primer nivel desplegamos las bases. Procesamiento de datos y automatización.',
    projects: [
      {
        id: 'mokes-clinic',
        name: 'Mokes-Clinic Backend',
        color: 'text-blue-400',
        descriptionEs: 'Sistema clínico con backend en FastAPI y despliegue en la nube.',
        technologies: ['Python', 'FastAPI', 'Docker', 'PostgreSQL']
      },
      {
        id: 'instagram-pipeline',
        name: 'Instagram Data Pipeline',
        color: 'text-purple-400',
        descriptionEs: 'Pipeline automatizado para extracción de métricas de Instagram.',
        technologies: ['Python', 'Azure Functions', 'Databricks']
      }
    ]
  },
  {
    id: 'fase2',
    narratorText: 'Subiendo la montaña, la gobernanza y la analítica a gran escala toman el control de la arquitectura.',
    projects: [
      {
        id: 'nexus-observability',
        name: 'Nexus AIOps Observability',
        color: 'text-cyan-400',
        descriptionEs: 'Plataforma de observabilidad y monitoreo con IA para plataformas cloud.',
        technologies: ['TypeScript', 'Python', 'Kubernetes', 'Azure']
      }
    ]
  },
  {
    id: 'final',
    narratorText: 'Has llegado a la cima. Esta infraestructura es solo el comienzo de lo que podemos construir juntos.',
    projects: []
  }
];