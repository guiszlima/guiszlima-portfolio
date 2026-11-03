import type { HudCopy, HudModule } from '@/lib/hud';
import { hudModules } from '@/lib/hud';
import styles from './PortfolioHud.module.css';

interface HudNavigationProps { activeModule: HudModule; copy: HudCopy; onSelect: (module: HudModule) => void; }

export function HudNavigation({ activeModule, copy, onSelect }: HudNavigationProps) {
  return <nav className={styles.nav} aria-label="Primary navigation"><p>MODULES</p>{hudModules.map((item, index) => <button key={item} onClick={() => onSelect(item)} className={activeModule === item ? styles.active : ''} aria-current={activeModule === item ? 'page' : undefined}><small>{String(index + 1).padStart(2, '0')}</small>{copy[item]}<b>↗</b></button>)}</nav>;
}
