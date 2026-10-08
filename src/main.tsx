import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { ArrowUpRight, Mail, MapPin, Menu, X, Search, Sun, Moon, Camera, Pause, Play, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import './styles.css'
import './process.css'
import './happy.css'
import './photos-motion.css'
import './cat-studio.css'

type Link = { label: string; href: string; placeholder?: boolean }
type Project = { number: string; title: string; description: string; tags: string[]; metric: string; metricLabel: string; links: Link[]; color: 'lime' | 'coral' | 'blue'; image?: string; award?: string; featured?: boolean }
type Experience = { company: string; role: string; dates: string; location: string; bullets: string[] }
type Leadership = { organization: string; role: string; dates: string; bullets: string[] }

const links = { linkedin: 'https://ca.linkedin.com/in/melvika', devpost: 'https://devpost.com/melvikafa', github: 'https://github.com/melvikaf', email: 'mailto:melvikafaustine@gmail.com' }

const projects: Project[] = [
  { number: '01', title: 'CrimePath', description: 'A full-stack investigative timeline prototype connecting cases, evidence, witnesses, events, and victims through a traceable temporal data model.', tags: ['PostgreSQL', 'TimescaleDB', 'TypeScript', 'React'], metric: 'StormHacks', metricLabel: 'Best Use of Gemini API - MLH', color: 'lime', image: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_thumbnail_photos/005/511/936/datas/medium.png', award: 'Best Use of Gemini API - MLH', featured: true, links: [{ label: 'Devpost', href: 'https://devpost.com/software/crimepath' }, { label: 'GitHub', href: links.github, placeholder: true }] },
  { number: '02', title: 'Love Signal', description: 'A proximity-based social discovery application combining profile, location, private signals, mutual matches, and map-based discovery.', tags: ['React', 'TypeScript', 'MongoDB', 'Vercel'], metric: 'cmd-f', metricLabel: '2026 build', color: 'coral', image: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_thumbnail_photos/004/413/711/datas/medium.png', links: [{ label: 'Devpost', href: 'https://devpost.com/software/love-signal' }, { label: 'GitHub', href: links.github, placeholder: true }] },
  { number: '03', title: 'Shaka - Air DJ', description: 'A touch-free music control system translating webcam hand movements into real-time audio commands through a WebSocket pipeline.', tags: ['MediaPipe', 'OpenCV', 'WebSockets', 'React'], metric: 'StormHacks', metricLabel: '2025 build', color: 'lime', links: [{ label: 'Devpost', href: 'https://devpost.com/software/shaka-air-dj' }, { label: 'GitHub', href: links.github, placeholder: true }] },
  { number: '04', title: 'Remy', description: 'A sleep-focused mobile app combining sleep analytics, personalized music, and accessible visualizations backed by Firebase.', tags: ['React Native', 'Firebase', 'HealthKit'], metric: 'DreamHacks', metricLabel: '2025 project', color: 'blue', image: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/320/261/datas/medium.jpeg', featured: true, links: [{ label: 'Devpost', href: 'https://devpost.com/software/remy-ie97ts' }, { label: 'GitHub', href: links.github, placeholder: true }] },
  { number: '05', title: 'ParkAble', description: 'A mobile parking availability experience using YOLO and OpenCV to detect occupancy from camera footage and serve status through REST APIs.', tags: ['React Native', 'YOLO', 'OpenCV', 'MongoDB'], metric: 'cmd-f', metricLabel: '2025 build', color: 'coral', links: [{ label: 'Devpost', href: 'https://devpost.com/software/spotable' }, { label: 'GitHub', href: links.github, placeholder: true }] },
  { number: '06', title: 'CareConnect', description: 'A wellbeing web application combining individual check-ins with aggregate team analytics, real-time Firebase updates, and Recharts visualizations.', tags: ['React', 'Firebase', 'Recharts', 'Tailwind'], metric: 'StormHacks', metricLabel: '2024 build', color: 'blue', links: [{ label: 'Devpost', href: 'https://devpost.com/software/careconnect-eand43' }, { label: 'GitHub', href: links.github, placeholder: true }] },
  { number: '07', title: 'FIFA World Cup Predictor', description: 'An end-to-end machine learning pipeline that turns historical international football data into match predictions and tournament-level outcomes.', tags: ['Python', 'pandas', 'scikit-learn', 'Jupyter'], metric: 'ML', metricLabel: 'prediction pipeline', color: 'coral', featured: true, links: [{ label: 'GitHub', href: links.github, placeholder: true }] },
  { number: '08', title: 'Problematic Internet Use Prediction', description: 'A data science workflow for cleaning behavioural and demographic observations, engineering features, and evaluating candidate predictive models.', tags: ['Python', 'pandas', 'scikit-learn'], metric: 'DS', metricLabel: 'model study', color: 'blue', featured: true, links: [{ label: 'GitHub', href: links.github, placeholder: true }] },
]

const experience: Experience[] = [
  { company: 'Waterworth', role: 'Junior Data Analyst Co-op', dates: 'May 2026 - Sep. 2026', location: 'Victoria, BC', bullets: ['Delivered trusted ARR, NRR, and GRR reporting through reusable PostgreSQL, Python, Power Query, and Excel workflows.', 'Built a Python Dash simulator for scenario-based capacity and staffing analysis.', 'Connected HubSpot, PostgreSQL, Python, and Excel data into repeatable analytical workflows.'] },
  { company: 'Vancouver Coastal Health', role: 'Data Analytics / Data Science Intern', dates: 'Jan. 2026 - Apr. 2026', location: 'Vancouver, BC', bullets: ['Improved usability of healthcare datasets spanning more than 3M records through Python and Azure Databricks workflows.', 'Automated QA workflows for Checkbox and REDCap, validating field mappings, branching logic, and production data flows.', 'Translated healthcare requirements into reproducible validation rules and documented workflows.'] },
  { company: 'Nettwerk Music Group', role: 'Data Insights Analyst Co-op Student', dates: 'Sep. 2025 - Jan. 2026', location: 'Vancouver, BC', bullets: ['Simplified analysis across more than 190M records with Snowflake SQL for downstream Tableau reporting.', 'Unified four Tableau dashboards into a consolidated analytical view across artist, audience, and engagement reporting.', 'Developed reusable Tableau views and standardized outputs across more than 200 artists.'] },
]

const education = [
  { school: 'Simon Fraser University', program: 'Bachelor of Science, Data Science', dates: 'Expected 2027', detail: 'Building a foundation across statistics, computing, machine learning, and the social context around data.' },
  { school: 'Langara College', program: 'Associate of Science, Computer Science', dates: '2022 - 2024', detail: 'Pursued Computer Science coursework before transferring to Simon Fraser University to continue my degree.' },
]

const leadership: Leadership[] = [
  { organization: 'Women in Data Science at SFU', role: 'Co-Founder and President', dates: '2026 - Present', bullets: ['Co-founded a student community for women and gender-diverse students interested in data science, analytics, machine learning, and responsible technology.', 'Set early direction for the organization, including community-building, professional development, and opportunities to learn with peers.', 'Help create a welcoming bridge between technical learning, career exploration, and the broader SFU data community.'] },
  { organization: 'SFU Blueprint', role: 'VP Internal (current) · Product Manager & Co-Project Manager · VP Operations · Event Coordinator', dates: 'May 2025 - Present', bullets: ['Progressed from Event Coordinator to VP Operations, Product Manager and Co-Project Manager, and now VP Internal.', 'Planned and supported events while coordinating logistics, people, timelines, and follow-through across the organization.', 'As Product Manager and Co-Project Manager, translated stakeholder needs into roadmaps, tickets, priorities, and delivery plans while contributing React and TypeScript frontend work.', 'As VP Internal, support organizational continuity, internal processes, member coordination, and a strong team culture.'] },
  { organization: 'SFU Marketing Association (SMA)', role: 'Marketing Project Coordinator', dates: 'Dec. 2025 - Apr. 2026', bullets: ['Supported marketing projects and student-facing initiatives within the SFU Marketing Association.', 'Coordinated project details, communication, and follow-through across collaborators and stakeholders.', 'Built experience at the intersection of audience understanding, clear communication, and organized execution.'] },
  { organization: 'Garuda Indonesian Langara Association (GILA)', role: 'Vice President & Co-Founder', dates: 'Aug. 2022 - Sep. 2023', bullets: ['Co-founded a Langara College student organization focused on building community for Indonesian students and peers.', 'Led planning, communications, and logistics for cultural initiatives, including Indonesian Game Day.', 'Managed member engagement and facilitated communication between executive leaders and general members.', 'Coordinated with external partners to secure venues and support event execution and campus outreach.'] },
]

const processSteps = [
  { number: '01', title: 'Understand the question', text: 'Before touching a dataset, I clarify the decision behind it: who needs to know what, why now, and what would a useful answer change?' },
  { number: '02', title: 'Explore the data', text: 'I look for shape, context, missingness, bias, and surprising relationships - using EDA to understand what the data can and cannot say.' },
  { number: '03', title: 'Transform with intent', text: 'I clean, validate, join, and model the data so the pipeline is reproducible and the definitions stay trustworthy from source to output.' },
  { number: '04', title: 'Engineer useful features', text: 'I translate domain knowledge into signals a model can use, while keeping the features interpretable enough to explain to the people who rely on them.' },
  { number: '05', title: 'Model the right way', text: 'I compare approaches against the real objective, measure what matters, and treat a model as a tool for a decision - not the finish line.' },
  { number: '06', title: 'Improve with feedback', text: 'I share the result, listen to how it works in practice, and iterate. The best data products get better because the people using them shape the next version.' },
]

const skills = ['Python', 'SQL', 'R', 'TypeScript', 'JavaScript', 'Java', 'C++', 'PostgreSQL', 'Snowflake', 'MySQL', 'MongoDB', 'TimescaleDB', 'pandas', 'scikit-learn', 'Power BI', 'Tableau', 'React', 'React Native', 'Flask', 'Node.js', 'REST APIs', 'WebSockets', 'Azure Databricks', 'Firebase', 'Git', 'Jupyter']
const projectTech = Array.from(new Set(projects.flatMap(project => project.tags))).sort()

const interests = [
  { label: '01', title: 'Stories with a little tension', text: 'Historical romance films and books - especially Pride & Prejudice (2005), for the atmosphere, restraint, and the slow reveal of what people really mean.' },
  { label: '02', title: 'Cooking, eating, repeating', text: 'I love food in both directions: making something from whatever is in the kitchen, then happily planning my next meal while I eat the first one.' },
  { label: '03', title: 'Scent and small discoveries', text: 'I love perfumes, trying new things, and noticing the tiny details that make an experience feel personal - a note, a texture, a combination, a surprise.' },
  { label: '04', title: 'Always somewhere new', text: 'I have travelled to more than 10 countries, and I love how a new place changes what you notice - the food, the pace, the small systems that make daily life work.' },
  { label: '05', title: 'Always listening', text: 'Music is one of the ways I pay attention to the world. I love discovering new artists, following how a song changes a mood, and noticing the stories people build around sound.' },
]

// Add paths such as '/photos/campus.jpg' here when your photos are ready.
const personalPhotos: Record<string, string> = {
  portrait: '', work: '', campus: '', community: '',
  'interest-01': '', 'interest-02': '', 'interest-03': '', 'interest-04': '', 'interest-05': '',
}

function CatMark({ className = '' }: { className?: string }) {
  return <svg className={`cat-mark ${className}`} viewBox="0 0 200 130" fill="none" aria-hidden="true">
    <path fill="currentColor" d="M38 110 48 22Q50 9 60 20L82 47Q100 42 119 47L143 20Q155 8 158 24L168 110Z" />
    <ellipse cx="78" cy="82" rx="15" ry="12" fill="var(--cat-eye, #fffaf3)" /><ellipse cx="131" cy="82" rx="15" ry="12" fill="var(--cat-eye, #fffaf3)" />
    <g className="cat-pupils" fill="currentColor"><ellipse cx="79" cy="82" rx="3" ry="7" /><ellipse cx="132" cy="82" rx="3" ry="7" /></g>
    <path d="M9 111H190" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /><ellipse cx="39" cy="109" rx="16" ry="12" fill="currentColor" /><ellipse cx="169" cy="109" rx="16" ry="12" fill="currentColor" />
  </svg>
}

function CatCompanion() {
  const [sleeping, setSleeping] = useState(false)
  return <button className={`cat-companion ${sleeping ? 'is-sleeping' : ''}`} onClick={() => setSleeping(value => !value)} aria-label={sleeping ? 'Wake up the cat' : 'Let the cat nap'} aria-pressed={sleeping}><CatMark /><span>{sleeping ? 'zzz…' : 'a little company.'}</span></button>
}

function PhotoSlot({ id, caption, className = '' }: { id: string; caption: string; className?: string }) {
  const src = personalPhotos[id]
  const [failed, setFailed] = useState(false)
  return <figure className={`photo-slot ${className}`}>
    <div className="photo-window">{src && !failed ? <img src={src} alt={caption} loading={id === 'portrait' ? 'eager' : 'lazy'} onError={() => setFailed(true)} /> : <div className="photo-empty" role="img" aria-label={`Photo placeholder: ${caption}`}><Camera size={28} strokeWidth={1} /><span>Your photo here</span></div>}</div>
    <figcaption>{caption}</figcaption>
  </figure>
}

function PlayfulPlot() {
  const [paused, setPaused] = useState(false)
  const [arranged, setArranged] = useState(false)
  return <div className={`playful-plot ${paused ? 'is-paused' : ''} ${arranged ? 'is-arranged' : ''}`}>
    <svg viewBox="0 0 240 100" aria-hidden="true"><path className="plot-axis" d="M15 10V85H225" />{Array.from({ length: 12 }, (_, i) => <g className="plot-dot" key={i} style={{ '--dot-delay': `${i * -.37}s`, '--dot-shift': `${i % 2 ? -7 : 7}px` } as CSSProperties}><circle cx={25 + i * 17} cy={arranged ? 76 - i * 5 : 24 + ((i * 29) % 52)} r={i % 3 === 0 ? 5 : 3.5} /></g>)}</svg>
    <div className="plot-controls"><button onClick={() => setArranged(value => !value)}>{arranged ? 'Mix it up ↗' : 'Connect the dots ↗'}</button><button onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play animation' : 'Pause animation'} aria-pressed={paused}>{paused ? <Play size={13} /> : <Pause size={13} />}</button></div>
  </div>
}

function InterestsCarousel() {
  const [index, setIndex] = useState(0)
  const touchStart = useRef<number | null>(null)
  const move = (direction: number) => setIndex(current => (current + direction + interests.length) % interests.length)
  const interest = interests[index]
  const captions = ['Books & film nights', 'Something I cooked', 'Little discoveries', 'Somewhere new', 'On repeat']
  return <div className="interests-carousel" role="region" aria-roledescription="carousel" aria-label="Outside of work" onKeyDown={event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1) }
  }}>
    <div className="interest-slide" key={interest.label} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${interests.length}`} onTouchStart={event => { touchStart.current = event.touches[0].clientX }} onTouchEnd={event => {
      if (touchStart.current !== null) { const distance = touchStart.current - event.changedTouches[0].clientX; if (Math.abs(distance) > 50) move(distance > 0 ? 1 : -1) }
      touchStart.current = null
    }}>
      <PhotoSlot id={`interest-${interest.label}`} caption={captions[index]} className="carousel-photo" />
      <div className="interest-note"><span className="interest-page">{interest.label} / 05</span><h3>{interest.title}</h3><p>{interest.text}</p></div>
    </div>
    <div className="interest-controls"><div className="interest-dots">{interests.map((item, itemIndex) => <button key={item.label} className={itemIndex === index ? 'is-current' : ''} onClick={() => setIndex(itemIndex)} aria-label={`Show ${item.title}`} aria-current={itemIndex === index ? 'true' : undefined} />)}</div><div className="interest-arrows"><button onClick={() => move(-1)} aria-label="Previous interest"><ChevronLeft size={20} /></button><button onClick={() => move(1)} aria-label="Next interest"><ChevronRight size={20} /></button></div></div>
    <span className="visually-hidden" role="status">{index + 1} of {interests.length}: {interest.title}</span>
  </div>
}

function ExternalLink({ link }: { link: Link }) { return <a className={link.placeholder ? 'project-link placeholder-link' : 'project-link'} href={link.placeholder ? '#' : link.href} onClick={(event) => link.placeholder && event.preventDefault()}>{link.label} <ArrowUpRight size={13} /></a> }

function ProjectCard({ project }: { project: Project }) {
  return <article className={`project-card ${project.color}`}><div className="project-number">{project.number}</div><div className="project-main">{project.image ? <img className="project-image" src={project.image} alt={`${project.title} project thumbnail`} /> : <div className="project-photo-placeholder"><span>PROJECT IMAGE</span><small>Add screenshot / photo</small></div>}{project.award && <p className="project-award">✦ {project.award}</p>}<h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-links">{project.links.map(link => <ExternalLink key={link.label} link={link} />)}</div></div><div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div><a className="project-arrow" href={project.links[0]?.href || '#contact'} aria-label={`View ${project.title}`}><ArrowUpRight size={23} /></a></article>
}

function YarnTrail({ progress }: { progress: number }) {
  const pathRef = useRef<SVGPathElement>(null)
  const [tip, setTip] = useState({ x: 97, y: 21 })
  const strand = 'M97 21 ' + Array.from({ length: 6 }, (_, i) => {
    const y = 21 + i * 330
    return `C97 ${y + 65} 12 ${y + 55} 18 ${y + 135} C22 ${y + 190} 83 ${y + 180} 67 ${y + 145} C42 ${y + 110} 8 ${y + 195} 38 ${y + 240} C59 ${y + 277} 97 ${y + 280} 97 ${y + 330}`
  }).join(' ')
  useEffect(() => {
    const path = pathRef.current
    if (path) { const point = path.getPointAtLength(path.getTotalLength() * progress); setTip({ x: point.x, y: point.y }) }
  }, [progress])
  return <svg className="process-yarn" viewBox="0 0 125 2022" preserveAspectRatio="none" aria-hidden="true">
    <path className="yarn-strand" ref={pathRef} d={strand} pathLength="1" style={{ strokeDashoffset: 1 - progress }} />
    <g transform={`translate(${tip.x} ${tip.y})`}><g transform={`rotate(${progress * 1080}) scale(${Math.max(.12, 1 - progress * .88)})`} className="yarn-ball"><circle r="17" /><path d="M-13-10Q0 0 13 10M-16-3Q0 7 8 15M-8-15Q6-4 16 3M-13 10Q-3-8 9-14M-5 16Q3 0 15-7M-16 2Q-10-9 1-16" /></g></g>
  </svg>
}

function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null); const trackRef = useRef<HTMLDivElement>(null); const [progress, setProgress] = useState(0); const [activeStep, setActiveStep] = useState(0)
  useEffect(() => { let frame: number | null = null; const updatePath = () => { if (frame !== null) cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { if (!trackRef.current) return; const rect = trackRef.current.getBoundingClientRect(); const travel = Math.max(rect.height, 1); const nextProgress = Math.min(1, Math.max(0, (window.innerHeight * .65 - rect.top) / travel)); setProgress(nextProgress); setActiveStep(Math.min(processSteps.length - 1, Math.floor(nextProgress * processSteps.length))); frame = null }) }; updatePath(); window.addEventListener('scroll', updatePath, { passive: true }); window.addEventListener('resize', updatePath); return () => { window.removeEventListener('scroll', updatePath); window.removeEventListener('resize', updatePath); if (frame !== null) cancelAnimationFrame(frame) } }, [])
  return <section className="process-section" id="process" ref={sectionRef}><div className="process-sticky"><p className="eyebrow">How I work with data</p><h2>How I approach<br /><em>a data problem.</em></h2><p className="process-intro">Good analysis is a conversation between the question, the data, the model, and the people who use the result.</p><div className="process-progress"><span style={{ transform: `scaleY(${progress})` }} /><b>{String(activeStep + 1).padStart(2, '0')} / 06</b></div></div><div className="process-track" ref={trackRef} style={{ '--process-progress': progress } as CSSProperties}><YarnTrail progress={progress} />{processSteps.map((step, index) => <article className={`process-step ${index <= activeStep ? 'is-active' : ''}`} key={step.number}><div className="process-node">{step.number}</div><div><p className="process-kicker">STAGE {step.number}</p><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div></section>
}

function App() {
  const [selectedTech, setSelectedTech] = useState<string[]>([])
  const [menuOpen, setMenuOpen] = useState(false); const [query, setQuery] = useState(''); const [theme, setTheme] = useState<'light' | 'dark'>(() => { if (typeof window === 'undefined') return 'light'; const saved = window.localStorage.getItem('portfolio-theme'); if (saved === 'dark' || saved === 'light') return saved; return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }); const closeMenu = () => setMenuOpen(false)
  useEffect(() => { const saved = window.localStorage.getItem('portfolio-theme'); if (saved) return; const preference = window.matchMedia('(prefers-color-scheme: dark)'); const updateFromBrowser = (event: MediaQueryListEvent) => setTheme(event.matches ? 'dark' : 'light'); preference.addEventListener('change', updateFromBrowser); return () => preference.removeEventListener('change', updateFromBrowser) }, [])
  const toggleTheme = () => { const nextTheme = theme === 'light' ? 'dark' : 'light'; setTheme(nextTheme); window.localStorage.setItem('portfolio-theme', nextTheme) }
  const selectedProjects = projects.filter(project => project.featured)
  const filteredProjects = projects.filter(project => `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()) && selectedTech.every(tech => project.tags.includes(tech)))
  const toggleTech = (tech: string) => setSelectedTech(current => current.includes(tech) ? current.filter(item => item !== tech) : [...current, tech])
  return <div className={`site-shell ${theme === 'dark' ? 'theme-dark' : ''}`}>
    <header className="nav-wrap"><a className="brand" href="#top" onClick={closeMenu} aria-label="Melvika Faustine home"><CatMark /><span className="brand-wordmark">melvika<span className="brand-dot">.</span></span></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button><nav className={`nav-links ${menuOpen ? 'is-open' : ''}`}><a href="#process" onClick={closeMenu}>My process</a><a href="#work" onClick={closeMenu}>Selected work</a><a href="#all-projects" onClick={closeMenu}>All projects</a><a href="#experience" onClick={closeMenu}>Experience</a><a href="#contact" onClick={closeMenu}>Contact</a><button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>{theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}<span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span></button></nav></header>
    <main id="top">
      <section className="hero section-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-greeting">Hi, I’m</p>
          <h1 className="hero-name">Melvika<br /><em>Faustine<span className="name-dot">.</span></em></h1>
          <p className="hero-intro">I study Data Science at SFU. I’ve worked with healthcare, music, and SaaS data, and I like building things that make it easier to understand.</p>
          <p className="hero-focus">Interested in data engineering, analytics & data science.</p>
          <div className="hero-actions"><a className="button button-primary" href="#experience">See my experience <ArrowUpRight size={17} /></a><a className="text-link" href="#work">Explore projects <span>↗</span></a></div>
        </div>
        <div className="hero-visual hero-portrait">
          <PhotoSlot id="portrait" caption="Hi, that’s me (photo coming soon)." className="main-portrait" />
          <CatCompanion />
        </div>
      </section>
      <div className="studio-divider" aria-hidden="true"><span>data, with a human touch.</span><span>✳</span><span>a few things i’ve been up to ↓</span></div>
      <section className="experience-section" id="experience"><div className="section-heading"><div><p className="eyebrow">Healthcare · SaaS · Music</p><h2>Work <em>experience</em></h2></div><p className="heading-note">Three data-focused co-ops across healthcare, SaaS, and music.</p></div><PhotoSlot id="work" caption="A moment from work" className="section-photo work-photo" /><div className="experience-list">{experience.map(item => <article className="experience-item" key={item.company}><div className="experience-meta"><span>{item.dates}</span><span>{item.location}</span></div><div><h3>{item.company}</h3><p className="experience-role">{item.role}</p><ul>{item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</div></section>
      <section className="work-section" id="work"><div className="section-heading"><div><p className="eyebrow">Things I’ve built</p><h2>Selected <em>work</em></h2></div><p className="heading-note">Data modeling, analytics, and machine learning in practice.</p></div><div className="project-list">{selectedProjects.map(project => <ProjectCard key={project.number} project={project} />)}</div></section>
      <section className="all-projects-section" id="all-projects"><details className="project-archive"><summary><span><p className="eyebrow">More projects</p><h2>All <em>projects</em></h2></span><span className="archive-toggle">Browse all projects <ArrowUpRight size={18} /></span></summary><div className="archive-content"><p className="heading-note">Search by project, tool, or area of interest.</p><label className="project-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, tools, or technologies..." aria-label="Search all projects" /></label><div className="tech-filter-row"><span className="filter-label">Filter by stack</span><div className="tech-filters">{projectTech.map(tech => <button className={`tech-filter ${selectedTech.includes(tech) ? 'is-selected' : ''}`} key={tech} onClick={() => toggleTech(tech)} aria-pressed={selectedTech.includes(tech)}>{tech}</button>)}</div>{selectedTech.length > 0 && <button className="clear-filters" onClick={() => setSelectedTech([])}>Clear filters</button>}</div><p className="search-count">Showing {filteredProjects.length} of {projects.length} projects</p><div className="project-list">{filteredProjects.length ? filteredProjects.map(project => <ProjectCard key={project.number} project={project} />) : <div className="empty-projects">No projects match that search yet.</div>}</div></div></details></section>
      <ProcessSection />
      <section className="education-section"><div className="section-heading"><div><p className="eyebrow">School</p><h2><em>Education</em></h2></div><p className="heading-note">The questions I ask in practice are grounded in statistics, computing, and curiosity.</p></div><PhotoSlot id="campus" caption="Life at SFU" className="section-photo" /><div className="education-list">{education.map(item => <article className="education-item" key={item.school}><div className="education-meta"><span>{item.dates}</span></div><div><h3>{item.school}</h3><p className="experience-role">{item.program}</p><p>{item.detail}</p></div></article>)}</div></section>
      <section className="leadership-section"><div className="section-heading"><div><p className="eyebrow">Community and leadership</p><h2>Community &<br /><em>leadership.</em></h2></div><p className="heading-note">Student communities I help organize and contribute to.</p></div><PhotoSlot id="community" caption="The people I build with" className="section-photo" /><div className="leadership-list">{leadership.map(item => <article className="leadership-item" key={item.organization}><div className="leadership-meta"><span>{item.dates}</span></div><div><h3>{item.organization}</h3><p className="experience-role">{item.role}</p><ul>{item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</div></section>
      <section className="interests-section"><div className="section-heading"><div><p className="eyebrow">Beyond the dataset</p><h2>The details I<br /><em>notice.</em></h2></div><p className="heading-note">A few things I enjoy outside of work.</p></div><InterestsCarousel /></section>
      <section className="skills-section"><div className="skills-heading"><div><p className="eyebrow">Technical toolkit</p><h2>Tools I <em>use</em></h2></div><p className="heading-note">A practical stack for asking better questions, building reliable pipelines, and turning analysis into something usable.</p></div><div className="skills-cloud">{skills.map(skill => <span key={skill}>{skill}</span>)}</div></section>
      <section className="contact-section" id="contact"><div className="contact-inner"><p className="eyebrow">Get in touch</p><h2>Let&apos;s <em>talk.</em></h2><a className="button button-primary" href="mailto:melvikafaustine@gmail.com">Say hello <Mail size={17} /></a><p className="contact-email">melvikafaustine@gmail.com</p><div className="contact-meta"><a className="contact-phone" href="tel:+12369710386"><Phone size={15} /> +1 (236) 971-0386</a><span><MapPin size={15} /> Burnaby, BC</span><a href={links.linkedin}>LinkedIn ↗</a><a href={links.devpost}>Devpost ↗</a><a href={links.github}>GitHub ↗</a></div></div></section>
    </main>
    <footer><span>© 2026 Melvika Faustine</span><span className="footer-note">Burnaby, BC</span><div className="socials"><a href={links.github} aria-label="GitHub">GH</a><a href={links.linkedin} aria-label="LinkedIn">in</a><a href={links.email} aria-label="Email"><Mail size={18} /></a></div></footer>
  </div>
}

createRoot(document.getElementById('root')!).render(<><App /><Analytics /></>)
