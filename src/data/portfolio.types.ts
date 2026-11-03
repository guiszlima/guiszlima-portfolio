export type Locale = 'pt' | 'en'; export type Localized = Record<Locale, string>; export type ProjectStatus = 'active' | 'completed' | 'maintenance' | 'archived';
export interface Skill { id: string; name: string; category: Localized; level: string; }
export interface Project { id: string; title: string; category: Localized; status: ProjectStatus; year: string; summary: Localized; description: Localized; technologies: string[]; highlights: Localized[]; repositoryUrl?: string; demoUrl?: string; }
export interface Experience { id: string; company: string; role: Localized; period: Localized; summary: Localized; technologies: string[]; }
export interface PortfolioData { meta: { schemaVersion: string; updatedAt: string }; profile: { name: string; monogram: string; role: Localized; tagline: Localized; availability: Localized; location: Localized; about: Localized; email: string; links: { label: string; url: string }[] }; projects: Project[]; skills: Skill[]; experience: Experience[]; }
