import type { Locale, Project } from '@/data/portfolio.types';
import styles from './PortfolioHud.module.css';

interface ProjectRepositoryLinkProps { project: Pick<Project, 'title' | 'repositoryUrl'>; locale: Locale; }

export function ProjectRepositoryLink({ project, locale }: ProjectRepositoryLinkProps) {
  if (!project.repositoryUrl) return null;
  const label = locale === 'pt' ? `Abrir repositório de ${project.title} no GitHub` : `Open ${project.title} repository on GitHub`;
  return <a className={styles.repositoryLink} href={project.repositoryUrl} target="_blank" rel="noreferrer" aria-label={label} onClick={event => event.stopPropagation()}><svg aria-hidden="true" viewBox="0 0 16 16" focusable="false"><path fill="currentColor" d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.44-2.43-.85-2.43-.85-.33-.84-.81-1.06-.81-1.06-.66-.45.05-.44.05-.44.73.05 1.12.75 1.12.75.65 1.11 1.7.79 2.11.6.07-.47.25-.79.46-.97-1.6-.18-3.28-.8-3.28-3.56 0-.79.28-1.43.75-1.94-.08-.18-.33-.92.07-1.92 0 0 .61-.2 2 .74A6.9 6.9 0 0 1 8 3.93c.62 0 1.24.08 1.82.25 1.38-.94 1.99-.74 1.99-.74.4 1 .15 1.74.08 1.92.47.51.75 1.15.75 1.94 0 2.77-1.69 3.38-3.3 3.56.26.22.49.64.49 1.29l-.01 1.91c0 .21.14.46.55.38A8 8 0 0 0 8 0Z" /></svg><span>{locale === 'pt' ? 'GitHub' : 'GitHub'}</span></a>;
}
