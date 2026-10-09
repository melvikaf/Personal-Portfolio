import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { ArrowUpRight, Mail, MapPin, Menu, X, Search, Camera, Pause, Play, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import './styles.css'
import './process.css'
import './happy.css'
import './photos-motion.css'
import './cat-studio.css'
import './responsive.css'

type Link = { label: string; href: string; placeholder?: boolean }
type Project = { number: string; title: string; description: string; tags: string[]; metric: string; metricLabel: string; links: Link[]; color: 'lime' | 'coral' | 'blue'; image?: string; award?: string; featured?: boolean }
type Experience = { company: string; role: string; dates: string; location: string; bullets: string[] }
type Leadership = { organization: string; role: string; dates: string; bullets: string[] }

const links = { linkedin: 'https://ca.linkedin.com/in/melvika', devpost: 'https://devpost.com/melvikafa', github: 'https://github.com/melvikaf', email: 'mailto:melvikafaustine@gmail.com' }

const projects: Project[] = [
  { number: '01', title: 'CrimePath', description: 'A full-stack investigative timeline prototype connecting cases, evidence, witnesses, events, and victims through a traceable temporal data model.', tags: ['PostgreSQL', 'TimescaleDB', 'TypeScript', 'React'], metric: 'StormHacks', metricLabel: 'Best Use of Gemini API - MLH', color: 'lime', image: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_thumbnail_photos/005/511/936/datas/medium.png', award: 'Best Use of Gemini API - MLH', featured: true, links: [{ label: 'Devpost', href: 'https://devpost.com/software/crimepath' }, { label: 'GitHub', href: links.github, placeholder: true }] },
  { number: '02', title: 'Love Signal', description: 'A proximity-based social discovery application combining profile, location, private signals, mutual matches, and map-based discovery.', tags: ['React', 'TypeScript', 'MongoDB', 'Vercel'], metric: 'cmd-f', metricLabel: '2026 build', color: 'coral', image: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_thumbnail_photos/004/413/711/datas/medium.png', links: [{ label: 'Devpost', href: 'https://devpost.com/software/love-signal' }, { label: 'GitHub', href: links.github, placeholder: true }] },
  { number: '03', title: 'Shaka - Air DJ', description: 'A touch-free music control system translating webcam hand movements into real-time audio commands through a WebSocket pipeline.', tags: ['MediaPipe', 'OpenCV', 'WebSockets', 'React'], metric: 'StormHacks', metricLabel: '2025 build', color: 'lime', links: [{ label: 'Devpost', href: 'https://devpost.com/software/shaka-air-dj' }, { label: 'GitHub', href: links.github, placeholder: true }] },
  { number: '04', title: 'Remy', description: 'A sleep-focused mobile app combining sleep analytics, personalized music, and accessible visualizations backed by Firebase.', tags: ['React Native', 'Firebase', 'HealthKit'], metric: 'DreamHacks', metricLabel: '2025 project', color: 'blue', image: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/320/261/datas/medium.jpeg', links: [{ label: 'Devpost', href: 'https://devpost.com/software/remy-ie97ts' }, { label: 'GitHub', href: links.github, placeholder: true }] },
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
  { school: 'Simon Fraser University', program: 'Bachelor of Science, Data Science', dates: 'Expected Spring 2027', detail: 'Building a foundation across statistics, computing, machine learning, and the social context around data.' },
  { school: 'Langara College', program: 'Associate of Science, Computer Science', dates: '2022 - 2024', detail: 'Pursued Computer Science coursework before transferring to Simon Fraser University to continue my degree.' },
]

const leadership: Leadership[] = [
  { organization: 'Women in Data Science at SFU', role: 'Co-Founder and President', dates: 'Sep. 2026 - Present', bullets: ['Co-founded a student community for women and gender-diverse students interested in data science, analytics, machine learning, and responsible technology.', 'Set early direction for the organization, including community-building, professional development, and opportunities to learn with peers.', 'Help create a welcoming bridge between technical learning, career exploration, and the broader SFU data community.'] },
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
  { label: '03', title: 'Always learning', text: 'I love learning new things, especially when I can try them with other people. Hackathons are one of my favourite ways to turn curiosity into something tangible.' },
  { label: '04', title: 'Always somewhere new', text: 'I have travelled to more than 10 countries, and I love how a new place changes what you notice - the food, the pace, the small systems that make daily life work.' },
  { label: '05', title: 'Always listening', text: 'Music is one of the ways I pay attention to the world. I love discovering new artists, following how a song changes a mood, and noticing the stories people build around sound.' },
]

// Add paths such as '/photos/campus.jpg' here when your photos are ready.
const personalPhotos: Record<string, string> = {
  portrait: '/Me.JPG', work: '/Nettwerk_Christmas_Dinner.jpg', campus: '/SFU_Commute.jpg', community: '/Blueprint_Outing.jpg',
  'interest-01': '/PrideAndPrejudice.webp', 'interest-02': '/Creme_Brulee.jpg', 'interest-03': '/Hackathon.jpg', 'interest-04': '/Paris.JPG', 'interest-05': '/Concert.JPG',
}

function CatMark({ className = '' }: { className?: string }) {
  return <svg className={`cat-mark ${className}`} viewBox="0 0 200 130" fill="none" aria-hidden="true">
    <path fill="currentColor" d="M38 110 47 34Q49 19 61 28L82 48Q103 42 122 48L142 27Q154 18 157 35L168 110Z" />
    <g className="cat-open-eyes"><ellipse cx="78" cy="82" rx="15" ry="12" fill="var(--cat-eye, #fffaf3)" /><ellipse cx="131" cy="82" rx="15" ry="12" fill="var(--cat-eye, #fffaf3)" />
    <g className="cat-pupils" fill="currentColor"><ellipse cx="79" cy="82" rx="3" ry="7" /><ellipse cx="132" cy="82" rx="3" ry="7" /></g></g>
    <path className="cat-closed-eyes" d="M66 82Q78 94 90 82M119 82Q131 94 143 82" stroke="var(--cat-eye, #fffaf3)" strokeWidth="5" strokeLinecap="round" />
    <path d="M9 111H190" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /><ellipse cx="39" cy="109" rx="16" ry="12" fill="currentColor" /><ellipse cx="169" cy="109" rx="16" ry="12" fill="currentColor" />
  </svg>
}

function CatCompanion({ sleeping, onToggle, compact = false }: { sleeping: boolean; onToggle: () => void; compact?: boolean }) {
  const label = sleeping ? 'Wake the cat for light mode' : 'Let the cat sleep for dark mode'
  return <button className={`cat-companion ${compact ? 'cat-theme-switch' : ''} ${sleeping ? 'is-sleeping' : ''}`} onClick={onToggle} aria-label={label} aria-pressed={sleeping}><CatMark /><span>{sleeping ? 'zzz… wake me?' : 'awake · let me nap?'}</span></button>
}

function SocialLinks() {
  return <div className="socials social-icons">
    <a href={links.github} aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.3-1.7-1-2 3-.4 6-1.5 6-5a4 4 0 0 0-1-3c.3-1 .2-2-.2-3 0 0-1-.3-3.8 1a13 13 0 0 0-6 0C6.2 4.7 5.2 5 5.2 5c-.4 1-.5 2-.2 3a4 4 0 0 0-1 3c0 3.5 3 4.6 6 5-.7.3-1 1-1 2v4" /></svg></a>
    <a href={links.linkedin} aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7M11 17v-7m0 3a3 3 0 0 1 6 0v4" /><circle cx="7" cy="7" r=".8" fill="currentColor" stroke="none" /></svg></a>
    <a href={links.devpost} aria-label="Devpost" title="Devpost"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d="M6 3h12l5 9-5 9H6L1 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 7h3a5 5 0 0 1 0 10H9Z" stroke="currentColor" strokeWidth="1.7" /></svg></a>
    <a href={links.email} aria-label="Email" title="Email"><Mail size={20} /></a>
    <a href="tel:+12369710386" aria-label="Call +1 (236) 971-0386" title="Phone"><Phone size={20} /></a>
  </div>
}

function BrandFishingCat() {
  return <img className="restored-fishing-cat" src="/illustrations/fishing-cat-traced.svg" alt="Rounded cat holding a fishing rod with a pink fish" width={1536} height={1024} loading="lazy" />
}

function PhotoSlot({ id, caption, className = '' }: { id: string; caption: string; className?: string }) {
  const src = personalPhotos[id]
  const [failed, setFailed] = useState(false)
  return <figure className={`photo-slot ${className}`}>
    <div className={`photo-window photo-${id}`}>{src && !failed ? <img src={src} alt={caption} loading={id === 'portrait' ? 'eager' : 'lazy'} onError={() => setFailed(true)} /> : <div className="photo-empty" role="img" aria-label={`Photo placeholder: ${caption}`}><Camera size={28} strokeWidth={1} /><span>Your photo here</span></div>}</div>
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
  const captions = ['Pride and Prejudice', 'Crème brûlée discoveries', 'Stormhacks 2026', 'Paris. 2019.', 'Hazzlet. 2025.']
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
  return <article className={`project-card ${project.color}`}><div className="project-number">{project.number}</div><div className="project-main"><div className="project-preview" tabIndex={0} aria-label={`${project.title} image preview — focus to enlarge`}>{project.image ? <img className="project-image" src={project.image} alt={`${project.title} project thumbnail`} /> : <div className="project-photo-placeholder"><span>PROJECT IMAGE</span><small>Add screenshot / photo</small></div>}</div>{project.award && <p className="project-award">✦ {project.award}</p>}<h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-links">{project.links.map(link => <ExternalLink key={link.label} link={link} />)}</div></div><div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div><a className="project-arrow" href={project.links[0]?.href || '#contact'} aria-label={`View ${project.title}`}><ArrowUpRight size={23} /></a></article>
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
  const isProjectsPage = window.location.pathname.replace(/\/$/, '') === '/projects'
  useEffect(() => { document.title = isProjectsPage ? 'Projects — Melvika Faustine' : 'Melvika Faustine — Data Science Student' }, [isProjectsPage])
  const [selectedTech, setSelectedTech] = useState<string[]>([])
  const [menuOpen, setMenuOpen] = useState(false); const [query, setQuery] = useState(''); const [theme, setTheme] = useState<'light' | 'dark'>(() => { if (typeof window === 'undefined') return 'light'; const saved = window.localStorage.getItem('portfolio-theme'); if (saved === 'dark' || saved === 'light') return saved; return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }); const closeMenu = () => setMenuOpen(false)
  useEffect(() => { const saved = window.localStorage.getItem('portfolio-theme'); if (saved) return; const preference = window.matchMedia('(prefers-color-scheme: dark)'); const updateFromBrowser = (event: MediaQueryListEvent) => setTheme(event.matches ? 'dark' : 'light'); preference.addEventListener('change', updateFromBrowser); return () => preference.removeEventListener('change', updateFromBrowser) }, [])
  const toggleTheme = () => { const nextTheme = theme === 'light' ? 'dark' : 'light'; setTheme(nextTheme); window.localStorage.setItem('portfolio-theme', nextTheme) }
  const selectedProjects = projects.filter(project => project.featured)
  const filteredProjects = projects.filter(project => `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()) && selectedTech.every(tech => project.tags.includes(tech)))
  const toggleTech = (tech: string) => setSelectedTech(current => current.includes(tech) ? current.filter(item => item !== tech) : [...current, tech])
  return <div className={`site-shell ${theme === 'dark' ? 'theme-dark' : ''}`}>
    <header className="nav-wrap"><a className="brand" href="/#top" onClick={closeMenu} aria-label="Melvika Faustine home"><CatMark /><span className="brand-wordmark">melvika<span className="brand-dot">.</span></span></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button><nav className={`nav-links ${menuOpen ? 'is-open' : ''}`}><a href="/#process" onClick={closeMenu}>My process</a><a href="/#work" onClick={closeMenu}>Selected work</a><a href="/projects/" onClick={closeMenu}>All projects</a><a href="/#experience" onClick={closeMenu}>Experience</a><a href="/#education" onClick={closeMenu}>Education</a><a href="/#leadership" onClick={closeMenu}>Volunteering</a><a href="/#contact" onClick={closeMenu}>Contact</a></nav></header>
    <main id="top">
      {isProjectsPage ? (<section className="all-projects-section" id="all-projects"><a className="text-link projects-back" href="/#work">← Back to selected work</a><div className="section-heading projects-heading"><div><p className="eyebrow">Things I’ve built</p><h1>All projects</h1></div></div><div className="archive-content"><p className="heading-note">Search by project, tool, or area of interest.</p><label className="project-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, tools, or technologies..." aria-label="Search all projects" /></label><div className="tech-filter-row"><span className="filter-label">Filter by stack</span><div className="tech-filters">{projectTech.map(tech => <button className={`tech-filter ${selectedTech.includes(tech) ? 'is-selected' : ''}`} key={tech} onClick={() => toggleTech(tech)} aria-pressed={selectedTech.includes(tech)}>{tech}</button>)}</div>{selectedTech.length > 0 && <button className="clear-filters" onClick={() => setSelectedTech([])}>Clear filters</button>}</div><p className="search-count">Showing {filteredProjects.length} of {projects.length} projects</p><div className="project-list">{filteredProjects.length ? filteredProjects.map(project => <ProjectCard key={project.number} project={project} />) : <div className="empty-projects">No projects match that search yet.</div>}</div></div></section>) : <>
      <section className="hero section-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-greeting">Hi, I’m</p>
          <h1 className="hero-name">Melvika<br /><em>Faustine<span className="name-dot">.</span></em></h1>
          <p className="hero-intro">I study Data Science at SFU. I’ve worked with healthcare, music, and SaaS data, and I like building things that make it easier to understand.</p>
          <p className="hero-focus">Interested in data engineering, analytics & data science.<span className="hero-availability">Available for full-time roles from May 2027.</span></p>
          <div className="hero-actions"><a className="button button-primary" href="/#experience">See my experience <ArrowUpRight size={17} /></a><a className="button button-secondary" href="/#work">Explore projects <ArrowUpRight size={17} /></a></div>
        </div>
        <div className="hero-visual hero-portrait">
          <PhotoSlot id="portrait" caption="Hey, that’s me!" className="main-portrait" />
          <CatCompanion sleeping={theme === 'dark'} onToggle={toggleTheme} />
        </div>
      </section>
      <div className="studio-divider" aria-hidden="true"><span>data, with a human touch.</span><span className="divider-yarn"><svg viewBox="0 0 48 40" fill="none"><circle cx="20" cy="20" r="14" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth="2" /><path d="M10 10Q17 20 30 28M7 17Q17 27 24 33M16 7Q25 15 33 21M9 28Q16 13 26 8M17 33Q23 19 33 15M32 26C37 32 38 19 42 25Q46 33 46 29" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></span><span>a few things i’ve been up to ↓</span></div>
      <section className="experience-section" id="experience"><div className="section-heading"><div><p className="eyebrow">Healthcare · SaaS · Music</p><h2>Work <em>experience</em></h2></div><p className="heading-note">Three data-focused co-ops across healthcare, SaaS, and music.</p></div><PhotoSlot id="work" caption="Christmas dinner with my Nettwerk teammates" className="section-photo work-photo" /><div className="experience-list">{experience.map(item => <article className="experience-item timeline-row" key={item.company}><div className="experience-meta timeline-meta"><span>{item.dates}</span><span className="timeline-location">{item.location}</span></div><div className="timeline-content"><h3>{item.company}</h3><p className="experience-role">{item.role}</p><ul>{item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</div></section>
      <section className="work-section" id="work"><div className="section-heading"><div><p className="eyebrow">Things I’ve built</p><h2>Selected <em>work</em></h2></div><p className="heading-note">Data modeling, analytics, and machine learning in practice.</p></div><div className="project-list">{selectedProjects.map(project => <ProjectCard key={project.number} project={project} />)}</div><a className="button browse-projects" href="/projects/">Browse all projects <ArrowUpRight size={17} /></a></section>

      <ProcessSection />
      <section className="education-section" id="education"><div className="section-heading"><div><p className="eyebrow">School</p><h2><em>Education</em></h2></div><p className="heading-note">The questions I ask in practice are grounded in statistics, computing, and curiosity.</p></div><PhotoSlot id="campus" caption="My first commute to SFU after transferring from Langara" className="section-photo" /><div className="education-list">{education.map(item => <article className="education-item timeline-row" key={item.school}><div className="education-meta timeline-meta"><span>{item.dates}</span></div><div className="timeline-content"><h3>{item.school}</h3><p className="experience-role">{item.program}</p><p>{item.detail}</p></div></article>)}</div></section>
      <section className="leadership-section" id="leadership"><div className="section-heading"><div><p className="eyebrow">Community and leadership</p><h2>Community &<br /><em>leadership.</em></h2></div><p className="heading-note">Student communities I help organize and contribute to.</p></div><PhotoSlot id="community" caption="An outing with SFU Blueprint" className="section-photo" /><div className="leadership-list">{leadership.map(item => <article className="leadership-item timeline-row" key={item.organization}><div className="leadership-meta timeline-meta"><span>{item.dates}</span></div><div className="timeline-content"><h3>{item.organization}</h3><p className="experience-role">{item.role}</p><ul>{item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</div></section>
      <section className="interests-section"><div className="section-heading"><div><p className="eyebrow">Beyond the dataset</p><h2>The details I<br /><em>notice.</em></h2></div><p className="heading-note">A few things I enjoy outside of work.</p></div><InterestsCarousel /></section>
      <section className="skills-section"><div className="skills-heading"><div><p className="eyebrow">Technical toolkit</p><h2>Tools I <em>use</em></h2></div><p className="heading-note">A practical stack for asking better questions, building reliable pipelines, and turning analysis into something usable.</p></div><div className="skills-cloud">{skills.map(skill => <span key={skill}>{skill}</span>)}</div></section>
      <section className="contact-section" id="contact">
        <div className="contact-art"><BrandFishingCat /><span className="contact-art-note">Caught your attention?</span></div>
        <div className="contact-inner"><p className="eyebrow">Get in touch</p><h2>Let&apos;s <em>talk.</em></h2><p className="contact-invite">Have a role in mind, a project to share, or just want to say hi? I’d love to hear from you.</p><a className="button button-primary" href={links.email}>Drop me a line <Mail size={17} /></a><a className="contact-email" href={links.email}>melvikafaustine@gmail.com</a><div className="contact-meta"><a className="contact-phone" href="tel:+12369710386"><Phone size={15} /> +1 (236) 971-0386</a><span><MapPin size={15} /> Burnaby, BC</span></div><SocialLinks /></div>
      </section>
      </>}
    </main>
    <footer className="cat-footer"><div className="footer-signature"><a href="/#top" className="button back-to-top">Back to top <span aria-hidden="true">↑</span></a></div><div className="footer-bottom"><span>© 2026 Melvika Faustine</span><a className="footer-domain" href="/#top">melvikafaustine.tech</a><span className="footer-note">Burnaby, BC</span></div></footer>
  </div>
}

createRoot(document.getElementById('root')!).render(<><App /><Analytics /></>)
