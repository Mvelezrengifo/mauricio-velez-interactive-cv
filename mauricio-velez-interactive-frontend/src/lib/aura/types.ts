// Tipos para el sistema de conocimiento de Aura

export type QuestionLevel =
  | 'level_1'    // Preguntas obvias
  | 'level_2'    // Preguntas de reclutador técnico
  | 'level_3'    // Preguntas inteligentes
  | 'difficult'  // Preguntas que prueban la IA
  | 'human';     // Preguntas humanas/personales

export type QuestionCategory =
  | 'experience'     // Experiencia general
  | 'skills'         // Habilidades técnicas
  | 'projects'       // Proyectos específicos
  | 'evolution'      // Evolución profesional
  | 'motivation'     // Motivación y valores
  | 'contact'        // Información de contacto
  | 'comparison';    // Comparación con otros candidatos

export interface KnowledgeEntry {
  id: string;
  question: string;
  answer: string;
  level: QuestionLevel;
  category: QuestionCategory;
  keywords: string[];           // Para matching por palabras clave
  variations?: string[];        // Variaciones de la pregunta
  followUp?: string[];          // Preguntas relacionadas sugeridas
}

export interface ContactInfo {
  whatsapp: string;
  whatsappMessage: string;      // Mensaje pre-escrito
  linkedin: string;
  email: string;
  github: string;
  location: string;
}

export interface ProfessionalSummary {
  name: string;
  title: string;
  yearsExperience: number;
  mainRole: string;
  secondaryRoles: string[];
  currentFocus: string;
  languages: string[];
}

export interface AuraContext {
  professional: ProfessionalSummary;
  contact: ContactInfo;
  projectsOverview: string;
  currentWork: string;
}
