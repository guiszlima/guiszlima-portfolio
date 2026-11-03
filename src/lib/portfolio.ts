import rawData from '@/data/portfolio.json';
import type { PortfolioData, Project } from '@/data/portfolio.types';

export const portfolioData = rawData as PortfolioData;

export function getProjectSkillNames(project: Project): string[] {
  return project.technologies
    .map(id => portfolioData.skills.find(skill => skill.id === id)?.name)
    .filter((skill): skill is string => Boolean(skill));
}
