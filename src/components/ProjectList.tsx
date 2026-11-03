import type { Locale, Project } from '@/data/portfolio.types';
import { portfolioData } from '@/lib/portfolio';
import { ProjectRepositoryLink } from './ProjectRepositoryLink';
import styles from './PortfolioHud.module.css';

interface ProjectListProps { locale: Locale; selected: Project; onSelect: (project: Project) => void; onOpen: (project: Project, source: HTMLElement) => void; }
const localize = (value: { pt: string; en: string }, locale: Locale) => value[locale];

export function ProjectList({ locale, selected, onSelect, onOpen }: ProjectListProps) {
  return <div className={styles.projectList}>{portfolioData.projects.map((project, index) => <article key={project.id} className={`${styles.project} ${selected.id === project.id ? styles.selected : ''}`}><div className={styles.projectRow}><button onClick={event => { onSelect(project); onOpen(project, event.currentTarget); }}><span className={styles.projectIndex}>{String(index + 1).padStart(2, '0')}</span><div><small>{localize(project.category, locale)} / {project.year}</small><h2>{project.title}</h2><p>{localize(project.summary, locale)}</p></div><i>↗</i></button><ProjectRepositoryLink project={project} locale={locale} /></div></article>)}</div>;
}
