// Tipos para el sistema de CV interactivo

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  year?: number;
  color?: string;
  link?: string;
  github?: string;
  longDescription?: string;
  impact?: string;
  challenges?: string[];

   isBigData?: boolean;
}

export interface Phase {
  id: string;
  title: string;
  narratorText: string;
  projects?: Project[];
  technologies?: string[];
  theme?: 'dark' | 'light' | 'blue' | 'purple';
}

export interface Section {
  id: string;
  title: string;
  blocks: Block[];
  duration?: number;
}

export interface Block {
  id: string;
  type: 'project' | 'technology' | 'experience' | 'skill';
  title: string;
  description?: string;
  technologies?: string[];
  image?: string;
  link?: string;
  year?: number;
}
