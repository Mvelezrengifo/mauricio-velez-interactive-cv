// Exportaciones del sistema de conocimiento de Aura

// Tipos
export type {
  QuestionLevel,
  QuestionCategory,
  KnowledgeEntry,
  ContactInfo,
  ProfessionalSummary,
  AuraContext
} from './types';

// Base de conocimiento
export {
  knowledgeBase,
  getKnowledgeById,
  getKnowledgeByLevel,
  getKnowledgeByCategory
} from './knowledge';

// Contexto y prompts
export {
  auraContext,
  auraSystemPrompt
} from './context';
