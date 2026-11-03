import type { Locale } from '@/data/portfolio.types';

export type HudModule = 'overview' | 'projects' | 'experience' | 'skills' | 'about' | 'resume' | 'contact';
export const hudModules: HudModule[] = ['overview', 'projects', 'experience', 'skills', 'about', 'resume', 'contact'];
export type HudLabel = HudModule | 'inspect' | 'status' | 'stack' | 'contact' | 'close' | 'downloadResume' | 'repository';
export type HudCopy = Record<HudLabel, string>;

export const hudLabels: Record<Locale, HudCopy> = {
  pt: { overview:'Visão geral', projects:'Projetos', experience:'Experiência', skills:'Competências', about:'Sobre', resume:'Currículo', contact:'Contato', inspect:'Inspecionar', status:'Status', stack:'Stack', close:'Fechar', downloadResume:'Baixar Currículo', repository:'Repositório' },
  en: { overview:'Overview', projects:'Projects', experience:'Experience', skills:'Skills', about:'About', resume:'Resume', contact:'Contact', inspect:'Inspect', status:'Status', stack:'Stack', close:'Close', downloadResume:'Download PDF', repository:'Repository' }
};

export const projectStatusLabels: Record<Locale, Record<string, string>> = {
  pt: { active:'Ativo', completed:'Concluído', maintenance:'Manutenção', archived:'Arquivado' },
  en: { active:'Active', completed:'Completed', maintenance:'Maintenance', archived:'Archived' }
};
