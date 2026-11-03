'use client';
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { Locale, PortfolioData, Project } from '@/data/portfolio.types';
import { HudNavigation } from './HudNavigation';
import { ProjectList } from './ProjectList';
import { portfolioData, getProjectSkillNames } from '@/lib/portfolio';
import { hudLabels, projectStatusLabels, type HudModule } from '@/lib/hud';
import styles from './PortfolioHud.module.css';

const data = portfolioData as PortfolioData;
const whatsappUrl = 'https://wa.me/5511991993229?text=Ol%C3%A1,%20Guilherme!%20Vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20com%20voc%C3%AA.';

export function PortfolioHud() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [module, setModule] = useState<HudModule>('overview');
  const [selected, setSelected] = useState<Project>(data.projects[0]);
  const [modal, setModal] = useState(false);

  const content = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Refs para a transição animada do seletor de idioma
  const localePtRef = useRef<HTMLButtonElement>(null);
  const localeEnRef = useRef<HTMLButtonElement>(null);
  const localeIndicatorRef = useRef<HTMLDivElement>(null);

  const t = (value: { pt: string; en: string }) => value[locale];
  const copy = hudLabels[locale];
  const selectedSkills = useMemo(() => getProjectSkillNames(selected), [selected]);

  // 1. Animação de transição do botão de idioma (PT/EN)
  useGSAP(() => {
    const targetBtn = locale === 'pt' ? localePtRef.current : localeEnRef.current;
    if (!targetBtn || !localeIndicatorRef.current) return;

    // Desliza o indicador amarelo com efeito de física fluida
    gsap.to(localeIndicatorRef.current, {
      x: targetBtn.offsetLeft,
      width: targetBtn.offsetWidth,
      duration: 0.35,
      ease: 'back.out(1.2)'
    });

    // Anima o texto do botão ativado
    gsap.fromTo(
      targetBtn,
      { scale: 0.92 },
      { scale: 1, duration: 0.25, ease: 'power2.out' }
    );
  }, [locale]);

  // 2. Recuo YoYo no sentido oposto ao movimento contínuo
  const shiftGrid = useCallback(() => {
    if (!grid.current) return;
    gsap.fromTo(
      grid.current,
      {
        opacity: 0.22,
        filter: 'drop-shadow(0px 0px 0px transparent) brightness(1)',
      },
      {
        x: '-=20',
        y: '-=14',
        opacity: 0.55,
        filter: 'drop-shadow(0px 0px 6px rgba(242, 230, 91, 0.6)) brightness(1.6)',
        duration: 0.32,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      }
    );
  }, []);

  // 3. Pulse Amarelo Predominante na grade de fundo
  const pulseGrid = useCallback((peakOpacity = 0.65, duration = 0.35) => {
    if (!grid.current) return;
    gsap.fromTo(
      grid.current,
      { 
        opacity: peakOpacity,
        filter: 'drop-shadow(0px 0px 8px #F2E65B) brightness(1.8)'
      },
      { 
        opacity: 0.22,
        filter: 'drop-shadow(0px 0px 0px transparent) brightness(1)',
        duration: duration, 
        ease: 'power2.out' 
      }
    );
  }, []);

  // 4. Animação de expansão do Cursor Amarelo em sincronia com o clique
  const triggerCursorClick = useCallback(() => {
    if (!cursorRef.current) return;
    gsap.fromTo(
      cursorRef.current,
      { 
        scale: 2.8, 
        opacity: 0.9, 
        boxShadow: '0 0 16px #F2E65B, inset 0 0 8px #F2E65B' 
      },
      { 
        scale: 1, 
        opacity: 0.85, 
        boxShadow: '0 0 6px #F2E65B', 
        duration: 0.35, 
        ease: 'power2.out' 
      }
    );
  }, []);

  // 5. Animação Infinita do Grid na Diagonal
  useGSAP(() => {
    if (!grid.current) return;
    return gsap.to(grid.current, {
      backgroundPosition: '80px 80px',
      duration: 10,
      ease: 'none',
      repeat: -1
    });
  }, { scope: grid });

  // 6. Rastreamento e movimentação fluida do Cursor Customizado
  useEffect(() => {
    if (!cursorRef.current) return;

    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.1, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.1, ease: 'power3.out' });

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 7. Troca de Módulos (Entrada de conteúdo + Recuo em YoYo)
  useGSAP(() => {
    if (!content.current) return;
    
    const children = content.current.children;
    gsap.fromTo(
      children,
      { autoAlpha: 0, y: 18, filter: 'blur(4px)' },
      { autoAlpha: 1, 
        y: 0, 
        filter: 'blur(0px)', 
        duration: 0.35, 
        ease: 'power2.out', 
        stagger: 0.05 }
    );

    shiftGrid();
  }, { dependencies: [module], scope: content, revertOnUpdate: true });

  // 8. Abertura do Modal
  useGSAP(() => {
    if (modal && dialog.current) {
      gsap.fromTo(
        dialog.current,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', autoAlpha: 0, scale: 0.98 },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
      
      pulseGrid(0.7, 0.45);
      triggerCursorClick();
    }
  }, [modal, pulseGrid, triggerCursorClick]);

  useEffect(() => {
    const stored = localStorage.getItem('hud-locale');
    if (stored === 'pt' || stored === 'en') setLocale(stored);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModal(false);
      if (modal && event.key === 'Tab' && dialog.current) {
        const items = Array.from(dialog.current.querySelectorAll<HTMLElement>('button,a[href]'));
        if (!items.length) return;
        const first = items[0], last = items.at(-1)!;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal]);

  const chooseModule = (next: HudModule) => {
    setModule(next);
    setTimeout(() => content.current?.querySelector<HTMLElement>('button,a')?.focus(), 30);
  };

  const openProject = (project: Project, source: HTMLElement) => {
    previousFocus.current = source;
    setSelected(project);
    setModal(true);
    requestAnimationFrame(() => dialog.current?.focus());
  };

  const changeLocale = (nextLocale: Locale) => {
    if (locale === nextLocale) return;
    setLocale(nextLocale);
    localStorage.setItem('hud-locale', nextLocale);
  };

  const close = () => {
    if (dialog.current) {
      gsap.to(dialog.current, {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        autoAlpha: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setModal(false);
          previousFocus.current?.focus();
        }
      });
    } else {
      setModal(false);
      previousFocus.current?.focus();
    }
  };

  return (
    <main 
      className={styles.hud} 
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName !== 'BUTTON' && (e.target as HTMLElement).tagName !== 'A') {
          pulseGrid(0.55, 0.3);
          triggerCursorClick();
        }
      }}
    >
      {/* Elemento do Cursor Customizado */}
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true" />

      {/* Grade de fundo */}
      <div ref={grid} className={styles.grid} aria-hidden="true" />
      
      <header className={styles.header}>
        <a href="#main" className={styles.brand} aria-label={data.profile.name}>
          {data.profile.monogram}<i>_</i>
        </a>
        <div className={styles.system}>PORTFOLIO / HUD-01 <span>● ONLINE</span></div>
        
        {/* Seletor de Idioma com Slider Animado */}
        <div className={styles.localeGroup} role="group" aria-label="Language">
          <div ref={localeIndicatorRef} className={styles.localeIndicator} />
          <button 
            ref={localePtRef}
            onClick={() => changeLocale('pt')} 
            className={`${styles.localeBtn} ${locale === 'pt' ? styles.activeLocale : ''}`}
          >
            PT
          </button>
          <button 
            ref={localeEnRef}
            onClick={() => changeLocale('en')} 
            className={`${styles.localeBtn} ${locale === 'en' ? styles.activeLocale : ''}`}
          >
            EN
          </button>
        </div>
      </header>

      <div className={styles.layout}>
        <HudNavigation activeModule={module} copy={copy} onSelect={chooseModule} />

        <section id="main" className={styles.content} ref={content} aria-live="polite">
          {module === 'overview' && <Overview t={t} locale={locale} copy={copy} onOpen={(event) => openProject(selected, event.currentTarget)} />}
          {module === 'projects' && <Projects locale={locale} selected={selected} onSelect={setSelected} onOpen={openProject} />}
          {module === 'experience' && <Experience t={t} />}
          {module === 'skills' && <Skills t={t} />}
          {module === 'about' && <About locale={locale} t={t} />}
          {module === 'resume' && <Resume locale={locale} copy={copy} />}
          {module === 'contact' && <Contact t={t} locale={locale} copy={copy} />}
        </section>

        <aside className={styles.context}>
          <p className={styles.panelLabel}>CONTEXT / {module.toUpperCase()}</p>
          <div className={styles.contextBody}>
            {module === 'projects' || module === 'overview' ? (
              <>
                <p className={styles.signal}>◈ {t(selected.category)}</p>
                <h2>{selected.title}</h2>
                <p>{t(selected.summary)}</p>
                <div className={styles.tech}>
                  {selectedSkills.map(skill => <span key={skill}>{skill}</span>)}
                </div>
              </>
            ) : (
              <>
                <p className={styles.signal}>◎ PROFILE STATUS</p>
                <h2>{t(data.profile.role)}</h2>
                <p>{t(data.profile.availability)}</p>
                <p className={styles.location}>⌖ {t(data.profile.location)}</p>
              </>
            )}
          </div>
          <div className={styles.contextFoot}>DATA REV {data.meta.updatedAt}</div>
        </aside>
      </div>

      <footer className={styles.footer}>
        <span>SYS // {module.toUpperCase()} ACTIVE</span>
        <span>CONTENT SCHEMA {data.meta.schemaVersion}</span>
        <span>CLICK INTERFACE TO TRIGGER HUD PULSE</span>
      </footer>

      {modal && (
        <div className={styles.overlay} role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) close(); }}>
          <section ref={dialog} className={styles.modal} role="dialog" aria-modal="true" aria-label={selected.title} tabIndex={-1}>
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.panelLabel}>{t(selected.category)} / {projectStatusLabels[locale][selected.status]}</p>
                <h2>{selected.title}</h2>
              </div>
              <button onClick={close} className={styles.close} aria-label={copy.close}>×</button>
            </div>
            <p className={styles.modalLead}>{t(selected.description)}</p>
            <div className={styles.modalColumns}>
              <div>
                <p className={styles.panelLabel}>{copy.stack}</p>
                <div className={styles.tech}>
                  {selectedSkills.map(skill => <span key={skill}>{skill}</span>)}
                </div>
              </div>
              <div>
                <p className={styles.panelLabel}>HIGHLIGHTS</p>
                <ul>
                  {selected.highlights.map((item, index) => <li key={index}>{t(item)}</li>)}
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function Overview({t, locale, copy, onOpen}:{t:(v:{pt:string;en:string})=>string; locale:Locale; copy:Record<string,string>; onOpen:(e:MouseEvent<HTMLButtonElement>)=>void}) {
  return (
    <>
      <p className={styles.kicker}>01 / SYSTEM READY</p>
      <h1>{data.profile.name}<em>.</em></h1>
      <p className={styles.role}>{t(data.profile.role)}</p>
      <p className={styles.lead}>{t(data.profile.tagline)}</p>
      <div className={styles.actions}>
        <button className={styles.primary} onClick={onOpen}>{copy.inspect} <span>↗</span></button>
        <a className={styles.secondary} href={whatsappUrl} target="_blank" rel="noreferrer">{locale === 'pt' ? 'WhatsApp' : 'Chat on WhatsApp'} <span>↗</span></a>
      </div>
      <div className={styles.readout}>
        <span>◉ {t(data.profile.availability)}</span>
        <span>⌖ {t(data.profile.location)}</span>
      </div>
    </>
  );
}

function Projects({locale, selected, onSelect, onOpen}:{locale:Locale; selected:Project; onSelect:(p:Project)=>void; onOpen:(p:Project, s:HTMLElement)=>void}) {
  return (
    <>
      <p className={styles.kicker}>02 / ARCHIVE</p>
      <h1>Projects<em>.</em></h1>
      <ProjectList locale={locale} selected={selected} onSelect={onSelect} onOpen={onOpen} />
    </>
  );
}

function Experience({t}:{t:(v:{pt:string;en:string})=>string}) {
  return (
    <>
      <p className={styles.kicker}>03 / LOG</p>
      <h1>Experience<em>.</em></h1>
      <div className={styles.timeline}>
        {data.experience.map((item, index) => (
          <article key={item.id}>
            <span>0{index + 1}</span>
            <div>
              <small>{t(item.period)}</small>
              <h2>{t(item.role)}</h2>
              <h3>{item.company}</h3>
              <p>{t(item.summary)}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Skills({t}:{t:(v:{pt:string;en:string})=>string}) {
  return (
    <>
      <p className={styles.kicker}>04 / LOADOUT</p>
      <h1>Skills<em>.</em></h1>
      <div className={styles.skillGrid}>
        {data.skills.map((skill, index) => (
          <article key={skill.id}>
            <span>0{index + 1}</span>
            <h2>{skill.name}</h2>
            <p>{t(skill.category)}</p>
            <i>{skill.level}</i>
          </article>
        ))}
      </div>
    </>
  );
}

function About({
  locale,
  t,
}: {
  locale: Locale;
  t: (value: { pt: string; en: string }) => string;
}) {
  const title = locale === 'pt' ? 'Sobre' : 'About';
  const about = t(data.profile.about);
  const links = data.profile.links;

  return (
    <>
      <p className={styles.kicker}>05 / PROFILE</p>

      <h1>
        {title}
        <em>.</em>
      </h1>

      <p className={styles.about}>{about}</p>

      {links.length > 0 && (
        <div className={styles.linkRow}>
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      )}
    </>
  );
}


function Resume({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Record<string, string>;
}) {
  const title = locale === 'pt' ? 'Currículo' : 'Resume';

  const pdf =
    locale === 'pt'
      ? '/resume/resume_br.pdf'
      : '/resume/resume_en.pdf';

  return (
    <>
      <p className={styles.kicker}>06 / DOCUMENT ARCHIVE</p>

      <div className={styles.resumeHeader}>
        <div>
          <h1>
            {title}
            <em>.</em>
          </h1>

          <p>
            {locale === 'pt'
              ? 'Versão para leitura e download.'
              : 'Version available for reading and download.'}
          </p>
        </div>

        <a
          className={styles.resumeDownload}
          href={pdf}
          download
        >
          {copy.downloadResume} <span>↗</span>
        </a>
      </div>

      <div className={styles.resumeFrame}>
        <div className={styles.resumeFrameLabel}>
          <span>PDF / {title.toUpperCase()}</span>

          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeOpen}
          >
            {locale === 'pt' ? 'ABRIR PDF ↗' : 'OPEN PDF ↗'}
          </a>
        </div>

        <iframe
          src={`${pdf}#toolbar=0&navpanes=0&view=FitH`}
          title={title}
          className={styles.resumePdf}
        />
      </div>
    </>
  );
}


function Contact({t, locale, copy}:{t:(v:{pt:string;en:string})=>string; locale:Locale; copy:Record<string,string>}) {
  return (
    <>
      <p className={styles.kicker}>07 / COMMS</p>
      <h1>Contact<em>.</em></h1>
      <p className={styles.about}>{t(data.profile.tagline)}</p>
      <a className={styles.email} href={`mailto:${data.profile.email}`}>{data.profile.email}<span>↗</span></a>
      <div className={styles.actions}>
        <a className={styles.secondary} href={whatsappUrl} target="_blank" rel="noreferrer">{locale === 'pt' ? 'Conversar pelo WhatsApp' : 'Chat on WhatsApp'} <span>↗</span></a>
      </div>
      <p className={styles.contactNote}>CHANNEL OPEN · {copy.contact.toUpperCase()}</p>
    </>
  );
}
