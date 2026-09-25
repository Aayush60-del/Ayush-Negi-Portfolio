import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import {
  ArrowDown, ArrowUpRight, Award, Braces, BriefcaseBusiness, Cloud, Code2,
  Download, ExternalLink, FileCode2, GitPullRequest, Heart, Home,
  Layers3, Mail, MapPin, Menu, Moon, Palette, Phone, Send,
  Sparkles, Star, Sun, Users, X, Zap
} from 'lucide-react';
import './styles.css';

function Github({ size = 24 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 22v-3.8c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6.2a4.8 4.8 0 0 0-1.3-3.3A4.5 4.5 0 0 0 18.6 3S17.5 2.7 15 4.3a12.4 12.4 0 0 0-6 0C6.5 2.7 5.4 3 5.4 3a4.5 4.5 0 0 0-.1 3.7A4.8 4.8 0 0 0 4 10c0 4.8 2.7 5.9 5.5 6.2-.5.5-.7 1.1-.7 2V22"/><path d="M9 19c-2.5.8-4.5-1.2-4.5-1.2"/></svg>; }
function Linkedin({ size = 24 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><path d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>; }

// ─────────────────────────────────────────────────────────────────────────────
// EDITABLE PORTFOLIO CONTENT
// Replace the values in this object and the arrays below with your details.
// ─────────────────────────────────────────────────────────────────────────────
const PROFILE = {
  name: 'Ayush Negi',
  title: 'MERN Stack Developer',
  initials: 'AN',
  bio: 'Computer Science undergraduate and Software Developer with hands-on experience across the MERN stack, Python, and cloud platforms. I enjoy building full-stack applications — from AI-powered tools to media platforms — that solve real problems with clean, scalable code.',
  tagline: 'MERN Stack Developer & Software Engineer building full-stack, AI-integrated web applications',
  email: '[YOUR EMAIL]',
  phone: '+91 00000 00000',
  location: 'India',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/',
  leetcode: 'https://leetcode.com/',
  resume: '#',
  profileImage: '/ayush-negi.jpg',
  formEndpoint: '', // Paste a Formspree endpoint (https://formspree.io/f/...) to submit without opening email.
};

const TECH_STACK = ['React', 'Node.js', 'MongoDB', 'Express', 'Python', 'AWS'];

const SKILLS = [
  { icon: Code2, title: 'Frontend Development', tag: 'Modern interfaces', stats: '6+ projects', years: '2+ years', tech: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS'], more: ['HTML5', 'CSS3', 'Responsive UI'] },
  { icon: FileCode2, title: 'Backend Development', tag: 'RESTful services', stats: '5+ projects', years: '2+ years', tech: ['Node.js', 'Express.js', 'REST APIs', 'JavaScript'], more: ['Authentication', 'Validation', 'API Design'] },
  { icon: Layers3, title: 'Database', tag: 'Data modelling', stats: '4+ projects', years: '1+ years', tech: ['MongoDB', 'Mongoose', 'CRUD', 'Schema Design'], more: ['Aggregation', 'Indexes', 'Data Validation'] },
  { icon: Cloud, title: 'Tools & DevOps', tag: 'Developer workflow', stats: '8+ projects', years: '2+ years', tech: ['Git', 'GitHub', 'Postman', 'VS Code'], more: ['Deployment', 'Debugging', 'Collaboration'] },
];

const PROJECTS = [
  { title: 'Project One', category: 'Web Application', year: '2025', status: 'Completed', featured: true, stars: '—', views: '—', likes: '—', team: '—', color: 'blue', tech: ['React', 'Node.js', 'Express', 'MongoDB'], description: 'Add your first project description here. Explain the problem it solves, the experience you built, and the impact it has.', detail: 'Replace this detail with your implementation notes, key technical decisions, and the results you are proud of.', live: '#', code: '#', visual: 'analytics' },
  { title: 'Project Two', category: 'Web Application', year: '2025', status: 'Completed', featured: true, stars: '—', views: '—', likes: '—', team: '—', color: 'violet', tech: ['React', 'Tailwind CSS', 'JavaScript', 'REST API'], description: 'Add your second project description here. Keep it focused on what you made and why it is useful.', detail: 'Add a concise technical overview of the features, tools, and lessons from this project.', live: '#', code: '#', visual: 'focus' },
  { title: 'Project Three', category: 'Full Stack App', year: '2024', status: 'Completed', featured: false, stars: '—', views: '—', likes: '—', team: '—', color: 'cyan', tech: ['MongoDB', 'Express', 'React', 'Node.js'], description: 'Add your third project description here. This is a clear place to highlight another piece of your MERN work.', detail: 'Add details about your role, the most interesting challenge, and the tools used.', live: '#', code: '#', visual: 'shelf' },
];

const navItems = [
  ['Home', 'home', Home], ['About', 'about', Users], ['Skills', 'skills', Braces],
  ['Projects', 'projects', BriefcaseBusiness], ['Experience', 'experience', Award], ['Contact', 'contact', Mail]
];

function Reveal({ children, className = '' }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: .5, ease: 'easeOut' }}>{children}</motion.div>;
}

function App() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const [expanded, setExpanded] = useState({});
  const [messageSent, setMessageSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => { setTyped(PROFILE.name.slice(0, ++i)); if (i >= PROFILE.name.length) clearInterval(id); }, 90);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { const saved = localStorage.getItem('portfolio-theme'); if (saved === 'light') setLight(true); }, []);
  useEffect(() => { document.documentElement.dataset.theme = light ? 'light' : 'dark'; localStorage.setItem('portfolio-theme', light ? 'light' : 'dark'); }, [light]);
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const sendMessage = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    try {
      if (PROFILE.formEndpoint) {
        const response = await fetch(PROFILE.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Could not send message');
      } else {
        const subject = encodeURIComponent(data.get('subject'));
        const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
        window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      }
      setMessageSent(true); form.reset();
    } finally { setSending(false); }
  };

  return <div className="site-shell">
    <header className="navbar">
      <button className="brand" onClick={() => scrollTo('home')} aria-label="Go to home"><span>{PROFILE.initials}</span><b>DEV</b></button>
      <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {navItems.map(([label, id, Icon]) => <button key={id} onClick={() => scrollTo(id)}><Icon size={15} /> {label}</button>)}
      </nav>
      <div className="nav-actions">
        <button className="icon-button" onClick={() => setLight(!light)} aria-label="Toggle color theme">{light ? <Moon size={18} /> : <Sun size={18} />}</button>
        <button className="talk-button" onClick={() => scrollTo('contact')}>Let's Talk <ArrowUpRight size={16} /></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main>
      <section id="home" className="hero section">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb orb-one" aria-hidden="true" /><div className="hero-orb orb-two" aria-hidden="true" />
        <div className="hero-layout container">
        <Reveal className="hero-content">
          <p className="hello">Hello, I'm</p>
          <h1>{typed}<span className="cursor">|</span></h1>
          <p className="hero-title">{PROFILE.title}</p>
          <p className="hero-tagline">{PROFILE.tagline}</p>
          <div className="tech-row">{TECH_STACK.map(t => <span className="pill" key={t}>{t}</span>)}</div>
          <div className="hero-actions"><button className="primary-button" onClick={() => scrollTo('projects')}>View My Work <ArrowDown size={17} /></button><button className="text-button" onClick={() => scrollTo('contact')}><Mail size={17} /> Get in Touch</button></div>
          <div className="social-row"><a href={PROFILE.github} aria-label="GitHub"><Github /></a><a href={PROFILE.linkedin} aria-label="LinkedIn"><Linkedin /></a><a href={PROFILE.leetcode} aria-label="LeetCode"><Code2 /></a><a href={PROFILE.resume} aria-label="Download resume"><Download /></a></div>
        </Reveal>
        <Reveal className="profile-wrap">
          <div className="profile-glow" />
          <div className="profile-card">
            {PROFILE.profileImage ? <img src={PROFILE.profileImage} alt="Ayush Negi" /> : <div className="photo-placeholder"><span>AN</span><small>Add your photo</small></div>}
            <div className="profile-caption"><span>✦</span><div><b>Ayush Negi</b><small>MERN Stack Developer</small></div></div>
          </div>
        </Reveal>
        </div>
        <button className="scroll-cue" onClick={() => scrollTo('about')} aria-label="Scroll to about"><span>Scroll to explore</span><ArrowDown size={17} /></button>
      </section>

      <section id="about" className="section about-section">
        <Reveal className="section-heading centered"><p className="section-kicker">A little context</p><h2>About Me</h2><p>{PROFILE.bio}</p></Reveal>
        <div className="about-layout container">
          <Reveal><article className="journey"><p className="section-kicker">My journey</p><h3>Thoughtful software, built with curiosity.</h3><p>As a Computer Science undergraduate at Chandigarh University and a Software Developer at Algoson Software, I’m building the technical range to take useful products from idea to deployment. I’m especially drawn to AI-driven development—where strong engineering and data can make software more capable, more personal, and more practical.</p><a className="inline-link" href={PROFILE.resume}>Download my résumé <Download size={16} /></a></article></Reveal>
          <div className="highlights">
            {[[Layers3, 'Full Stack Development', 'Building complete web applications with the MERN stack.'], [Code2, 'Data-Driven Development', 'Using Python-based analysis to make better engineering decisions.'], [Sparkles, 'Research & Innovation', 'Exploring applied research, including the ACIFFS-2026 quantum kill-switch paper.'], [Zap, 'Continuous Learning', 'Always sharpening skills through hands-on building.']].map(([Icon, title, desc]) => <Reveal key={title}><article className="highlight-card"><span className="highlight-icon"><Icon size={22} /></span><div><h3>{title}</h3><p>{desc}</p></div></article></Reveal>)}
          </div>
        </div>
      </section>

      <section id="skills" className="section skills-section"><Reveal className="section-heading centered"><p className="section-kicker">What I work with</p><h2>Skills & Expertise</h2><p>A practical toolkit for shipping polished products from the first sketch to production.</p></Reveal><div className="skills-grid container">{SKILLS.map(({ icon: Icon, ...skill }) => <Reveal key={skill.title}><article className="skill-card"><div className="skill-top"><span className="skill-icon"><Icon size={25} /></span><div><small>{skill.stats}</small><small>{skill.years}</small></div></div><h3>{skill.title}</h3><span className="category-tag">{skill.tag}</span><div className="tech-row">{skill.tech.map(t => <span className="pill" key={t}>{t}</span>)}</div><button className="more-button" onClick={() => setExpanded(x => ({ ...x, [skill.title]: !x[skill.title] }))}>{expanded[skill.title] ? 'Hide extra skills' : `+${skill.more.length} more skills`} <ArrowDown size={15} className={expanded[skill.title] ? 'flipped' : ''}/></button>{expanded[skill.title] && <div className="extra-skills">{skill.more.map(t => <span key={t}>{t}</span>)}</div>}</article></Reveal>)}</div></section>

      <section id="projects" className="section projects-section"><Reveal className="section-heading centered"><p className="section-kicker">Selected work</p><h2>Featured Projects</h2><p>A few projects where product thinking, visual craft, and clean engineering met.</p></Reveal><div className="projects-grid container">{PROJECTS.map((project, index) => <Reveal key={project.title}><article className="project-card"><div className={`project-visual ${project.visual}`}><span className="visual-label">{project.category}</span><div className="mock-window"><i /><i /><i /><b>{project.visual === 'analytics' ? 'Realtime overview' : project.visual === 'focus' ? 'Your focused week' : 'Curated collections'}</b><div className="mock-content"><span /><span /><span /></div></div>{project.featured && <span className="featured-ribbon">★ FEATURED</span>}<div className="project-meta"><span>{project.year}</span><span className={project.status === 'Completed' ? 'status done' : 'status'}>{project.status}</span></div></div><div className="project-body"><div className="project-title-row"><h3>{project.title}</h3><span>{project.category}</span></div><div className="stat-row"><span><Star size={15} /> {project.stars}</span><span><Users size={15} /> {project.team} team</span><span><Heart size={15} /> {project.likes}</span><span>{project.views} views</span></div><p>{project.description}</p>{expanded[project.title] && <p className="expanded-copy">{project.detail}</p>}<button className="read-more" onClick={() => setExpanded(x => ({ ...x, [project.title]: !x[project.title] }))}>{expanded[project.title] ? 'Read less' : 'Read more'} <ArrowDown size={15} /></button><p className="tech-label">Technologies used</p><div className="tech-row">{project.tech.map(t => <span className="pill" key={t}>{t}</span>)}</div><div className="project-actions"><a className="primary-button" href={project.live}>Live Demo <ExternalLink size={16} /></a><a className="secondary-button" href={project.code}><Github size={16} /> Code</a></div></div></article></Reveal>)}</div></section>

      <section id="experience" className="section experience-section"><Reveal className="section-heading centered"><p className="section-kicker">Where I’m growing</p><h2>Experience</h2><p>Practical development work, data exploration, and collaborative problem-solving.</p></Reveal><div className="experience-list container"><Reveal><article className="experience-card"><div className="experience-marker"><BriefcaseBusiness size={22} /></div><div className="experience-content"><div className="experience-heading"><div><p className="section-kicker">Present</p><h3>Software Developer</h3><p>Algoson Software Pvt. Ltd.</p></div><span className="category-tag">Professional Experience</span></div><ul><li>Contributing to web development and backend integration for reliable, maintainable application features.</li><li>Cleaning and analysing data with Python-based approaches to support informed product and engineering decisions.</li><li>Collaborating with cross-functional teammates to turn requirements into clear, working software.</li></ul><div className="tech-row"><span className="pill">MERN Stack</span><span className="pill">Python</span><span className="pill">Data Analysis</span><span className="pill">Backend Integration</span></div></div></article></Reveal></div></section>

      <section id="contact" className="section contact-section"><Reveal className="section-heading centered"><p className="section-kicker">Let’s make something useful</p><h2>Get In Touch</h2><p>Have a project, opportunity, or question in mind? I’d be happy to hear from you.</p></Reveal><div className="contact-grid container"><Reveal><article className="contact-card connect-card"><p className="section-kicker">Let’s connect</p><h3>Always open to a good conversation.</h3><p>Whether it’s a new role, an interesting project, or just a shared obsession with good software.</p><div className="contact-details"><a href={`mailto:${PROFILE.email}`}><Mail /><span><small>Email</small><b>{PROFILE.email}</b></span></a><a href={`tel:${PROFILE.phone}`}><Phone /><span><small>Phone</small><b>{PROFILE.phone}</b></span></a><div><MapPin /><span><small>Location</small><b>{PROFILE.location}</b></span></div></div><div className="social-row"><a href={PROFILE.github} aria-label="GitHub"><Github /></a><a href={PROFILE.linkedin} aria-label="LinkedIn"><Linkedin /></a></div><p className="availability"><span /> Available for new opportunities</p></article></Reveal><Reveal><form className="contact-card form-card" onSubmit={sendMessage}><p className="section-kicker">Send a message</p><h3>Tell me what you’re building.</h3><p>I’ll get back to you as soon as I can.</p><label>Full Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label><label>Subject<input required name="subject" placeholder="What would you like to discuss?" /></label><label>Message<textarea required name="message" rows="4" placeholder="Tell me about your project, opportunity, or idea." /></label><button className="primary-button submit-button" type="submit" disabled={sending}>{messageSent ? 'Message received — thank you!' : sending ? 'Sending…' : <>Send Message <Send size={16} /></>}</button></form></Reveal></div></section>
    </main>

    <footer><div className="footer-inner container"><div><button className="brand" onClick={() => scrollTo('home')}><span>{PROFILE.initials}</span><b>DEV</b></button><p>Building clear, useful, and memorable digital experiences one thoughtful detail at a time.</p><div className="social-row"><a href={PROFILE.github} aria-label="GitHub"><Github /></a><a href={PROFILE.linkedin} aria-label="LinkedIn"><Linkedin /></a><a href={`mailto:${PROFILE.email}`} aria-label="Email"><Mail /></a></div></div><div><h3>Quick Links</h3>{navItems.slice(1).filter(x => x[0] !== 'Open Source').map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div><div><h3>Resources</h3><a href={PROFILE.resume}>Résumé</a><a href={PROFILE.github}>GitHub</a><a href={PROFILE.linkedin}>LinkedIn</a><a href="#">Blog</a></div></div><p className="copyright">© {new Date().getFullYear()} {PROFILE.name}. Made with care.</p></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
