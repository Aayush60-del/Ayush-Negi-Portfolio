import React, { useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown, ArrowUpRight, Award, BookOpen, Braces, BriefcaseBusiness,
  CheckCircle2, ChevronRight, Cloud, Code2, Cpu, Database, Download,
  ExternalLink, FileCode2, FileText, Globe, GraduationCap, Heart,
  Home, Layers3, Mail, MapPin, Menu, Moon, Palette, Send, Server,
  Sparkles, Star, Sun, Terminal, Trophy, Users, X, Zap, AlertCircle
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import './styles.css';

// ─── EmailJS Configuration ───────────────────────────────────────
// These come from your .env file (VITE_ prefix required for Vite)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_CONFIGURED = EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
  && !EMAILJS_SERVICE_ID.includes('YOUR_') && !EMAILJS_TEMPLATE_ID.includes('YOUR_') && !EMAILJS_PUBLIC_KEY.includes('YOUR_');

// Project preview images
const projectOneImage = '/resumai-preview.jpg';
const projectTwoImage = '/symponify-preview.jpg';
const projectThreeImage = '/readnest-preview.jpg';
const projectFourImage = '/expensetracker-preview.png';

// Authentic SVG Icons for Developer & Competitive Programming Platforms
function GithubIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M15 22v-3.8c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6.2a4.8 4.8 0 0 0-1.3-3.3A4.5 4.5 0 0 0 18.6 3S17.5 2.7 15 4.3a12.4 12.4 0 0 0-6 0C6.5 2.7 5.4 3 5.4 3a4.5 4.5 0 0 0-.1 3.7A4.8 4.8 0 0 0 4 10c0 4.8 2.7 5.9 5.5 6.2-.5.5-.7 1.1-.7 2V22"/>
      <path d="M9 19c-2.5.8-4.5-1.2-4.5-1.2"/>
    </svg>
  );
}

function LinkedinIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function LeetCodeIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.26a1.373 1.373 0 0 0-.404.975c0 .363.141.71.404.975l5.406 4.847a1.373 1.373 0 0 0 1.838 0 1.373 1.373 0 0 0 0-1.95L9.65 6.75l4.794-4.364a1.373 1.373 0 0 0-.961-2.386z" fill="#B3B1B0" />
      <path d="M9.833 13.916a1.373 1.373 0 0 0-1.838 0l-5.406 4.847a1.373 1.373 0 0 0-.404.975c0 .363.141.71.404.975l5.406 4.847a1.373 1.373 0 0 0 1.838 0 1.373 1.373 0 0 0 0-1.95L4.639 19.75l4.794-4.364a1.373 1.373 0 0 0 0-1.95z" fill="#FFA116" />
      <path d="M7.77 15.01h9.46a1.37 1.37 0 0 0 0-2.74H7.77a1.37 1.37 0 0 0 0 2.74z" fill="#B3B1B0" />
    </svg>
  );
}

function CodeforcesIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <rect x="2" y="9" width="4.5" height="12" rx="1.5" fill="#FFC107" />
      <rect x="9.5" y="3" width="4.5" height="18" rx="1.5" fill="#2196F3" />
      <rect x="17" y="13" width="4.5" height="8" rx="1.5" fill="#F44336" />
    </svg>
  );
}

// User Profile Information
const PROFILE = {
  name: 'Ayush Negi',
  initials: 'AN',
  title: 'MERN Stack Developer & Software Engineer',
  tagline: 'MERN Stack Developer & Software Engineer building full-stack, AI-integrated web applications',
  bio: 'Computer Science undergraduate and Software Developer with hands-on experience across the MERN stack, Python, and cloud platforms. I enjoy building full-stack applications — from AI-powered tools to media platforms — that solve real problems with clean, scalable code.',
  email: 'negiius724@gmail.com',
  location: 'Mohali, Punjab',
  github: 'https://github.com/Aayush60-del',
  linkedin: 'https://www.linkedin.com/in/aayush-negi-a08367334',
  leetcode: 'https://leetcode.com/u/iuscu_378/',
  codeforces: 'https://codeforces.com/profile/Ayush-Negi-23',
  profileImage: '/ayush-negi.jpg',
  resume: '/Ayush_Negi_Resume.pdf',
};

const TECH_PILLS = ['React', 'Node.js', 'MongoDB', 'Express', 'Python', 'AWS'];

const NAV_ITEMS = [
  { label: 'Home', id: 'home', icon: Home },
  { label: 'About', id: 'about', icon: Users },
  { label: 'Skills', id: 'skills', icon: Braces },
  { label: 'Projects', id: 'projects', icon: BriefcaseBusiness },
  { label: 'Experience', id: 'experience', icon: Award },
  { label: 'Achievements', id: 'achievements', icon: Trophy },
  { label: 'Contact', id: 'contact', icon: Mail },
];

const SKILL_CATEGORIES = [
  {
    category: 'Languages',
    icon: Code2,
    tag: 'Core Problem Solving',
    skills: ['Python', 'C', 'C++', 'Java', 'JavaScript'],
  },
  {
    category: 'Frontend',
    icon: Palette,
    tag: 'Modern UI & UX',
    skills: ['React', 'Next.js', 'Redux Toolkit', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    icon: Server,
    tag: 'Scalable Architecture',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Postman Testing'],
  },
  {
    category: 'Databases',
    icon: Database,
    tag: 'Optimized Data Storage',
    skills: ['MongoDB', 'SQL'],
  },
  {
    category: 'Cloud & Tools',
    icon: Cloud,
    tag: 'DevOps & Deployment',
    skills: ['AWS S3', 'Docker', 'Kubernetes', 'Linux', 'Git/GitHub', 'Postman'],
  },
];

const EXPERIENCES = [
  {
    role: 'Software Developer',
    company: 'Algoson Software Pvt. Ltd.',
    period: 'Present',
    type: 'Current Role',
    document: '/24BCS11877_Ayush_Negi.pdf',
    documentType: 'pdf',
    documentTitle: 'Ayush Negi - Algoson Software Internship Offer',
    documentLabel: 'View Internship Offer',
    bullets: [
      'Web development and backend integration for dynamic, production web features.',
      'API testing, endpoint validation, and automated request workflows using Postman to ensure seamless client-server communication.',
      'Data cleaning and analysis using Python-based approaches to extract insights and power data pipelines.',
      'Collaborating with cross-functional dev teams to build, debug, and integrate reliable software features.',
    ],
    tech: ['MERN Stack', 'Python', 'Backend Integration', 'REST APIs', 'Postman Testing', 'Data Analysis'],
  },
];

const PROJECTS = [
  {
    id: 1,
    title: 'AI Resume Analysis',
    badge: 'MERN Stack & AWS S3',
    tech: ['MERN Stack', 'AWS S3', 'Node.js', 'Express', 'MongoDB', 'AI Parsing', 'Postman Testing'],
    description:
      'Full-stack AI resume analysis platform with secure S3 upload, authentication, resume parsing, and AI feedback generation; dashboard showing score, strengths, weaknesses, and suggestions.',
    live: 'https://ai-resume-analysis-wheat.vercel.app/',
    code: 'https://github.com/Aayush60-del/AI-Resume-Analysis',
    image: projectOneImage,
    highlight: 'AI Scoring Engine',
  },
  {
    id: 2,
    title: 'Symponify – Music Streaming Web App',
    badge: 'React & Cloudinary',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary', 'JWT Auth'],
    description:
      'JWT auth, playlists, liked songs, album browsing, admin panel for uploads, Cloudinary media storage.',
    live: 'https://symponify-8tga.vercel.app/',
    code: 'https://github.com/Aayush60-del/Symponify',
    image: projectTwoImage,
    highlight: 'Full Audio Pipeline',
  },
  {
    id: 3,
    title: 'ReadNest – Library Management & Reading Tracker',
    badge: 'MERN Stack & AWS S3',
    tech: ['MERN Stack', 'AWS S3', 'React', 'Node.js', 'MongoDB', 'Custom APIs', 'Postman Testing'],
    description:
      'Book browsing and reading progress tracking with per-user saved position, AWS S3 file storage, custom backend APIs.',
    live: 'https://read-nest-tau.vercel.app/',
    code: 'https://github.com/Aayush60-del/READ-NEST',
    image: projectThreeImage,
    highlight: 'Reading Tracker & Sync',
  },
  {
    id: 4,
    title: 'ExpenseTracker',
    badge: 'React & Redux Toolkit',
    tech: ['React', 'Redux Toolkit', 'Node.js', 'JWT Authentication', 'Analytics', 'CSV Export'],
    description:
      'A modern personal finance dashboard that turns income, expenses, and categories into clear, actionable insights, with secure login and one-click CSV exports.',
    live: 'https://expense-tracker-redux-toolkit.vercel.app/',
    code: 'https://github.com/Aayush60-del/Expense_Tracker_ReduxToolkit',
    image: projectFourImage,
    highlight: 'Finance Analytics & CSV',
  },
];

const ACHIEVEMENTS = [
  {
    title: 'Code Relay 2.0',
    event: 'AI Fest 2026 (InnovFest 2026)',
    organization: 'Department of Computer Science & Engineering, Chandigarh University',
    date: '19–21 February 2026',
    category: 'Competitive Coding & Hackathon',
    document: '/code-relay-certificate.jpg',
    documentTitle: 'Code Relay 2.0 - Certificate of Participation',
    documentLabel: 'View Certificate',
    description:
      'Actively participated in Code Relay 2.0 organized by the Department of Computer Science & Engineering (2nd year, UIE) during InnovFest 2026 under AI Fest 2026 at Chandigarh University. Demonstrated algorithmic problem-solving and rapid collaborative engineering under time constraints.',
    badge: 'Official Certificate of Participation',
    icon: Trophy,
  },
  {
    title: 'Quantum-Based Kill Switch Framework for Safe Control of Advanced Artificial Intelligence Systems',
    event: 'ACIFFS-2026 (Manipal University Jaipur, India)',
    organization: 'International Conference on Advances in Computational Intelligence for Fluid and Fuzzy Systems',
    date: 'July 29–31, 2026',
    category: 'Research Publication',
    document: '/aciffs-research-acceptance.png',
    documentTitle: 'ACIFFS-2026 Abstract Acceptance Letter',
    documentLabel: 'View Acceptance Letter',
    description:
      'Abstract accepted for Oral Presentation. Investigates safe control mechanisms for advanced AI systems using quantum-based approaches (co-authored as part of a multi-member research team).',
    badge: 'Abstract Accepted for Oral Presentation',
    icon: Sparkles,
  },
];

const CERTIFICATIONS = [
  {
    title: 'Python Data Analytics',
    issuer: 'Coursera',
    badge: 'Data Analysis & Insights',
  },
  {
    title: 'Thinking Python for Data Science AI and Development',
    issuer: 'Coursera',
    badge: 'Data Science & AI',
  },
  {
    title: 'Leadership',
    issuer: 'Coursera',
    badge: 'Team Collaboration & Leadership',
  },
  {
    title: 'Communication & Critical Thinking',
    issuer: 'Coursera',
    badge: 'Problem Solving & Communication',
  },
];

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Toast Notification Component ────────────────────────────────
function Toast({ toast, onClose }) {
  if (!toast) return null;
  const isSuccess = toast.type === 'success';
  return (
    <AnimatePresence>
      <motion.div
        className={`toast-notification ${isSuccess ? 'toast-success' : 'toast-error'}`}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="toast-icon">
          {isSuccess ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
        </div>
        <div className="toast-body">
          <strong>{toast.title}</strong>
          <p>{toast.message}</p>
        </div>
        <button className="toast-close" onClick={onClose} aria-label="Dismiss notification">
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [sending, setSending] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [previewDoc, setPreviewDoc] = useState(null);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', title, message }
  const [formErrors, setFormErrors] = useState({}); // { name, email, subject, message }
  const formRef = useRef(null);

  // Typing animation for "Ayush Negi"
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedName(PROFILE.name.slice(0, ++index));
      if (index >= PROFILE.name.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Theme Persistence
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light') {
      setLight(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
  }, [light]);

  // Section Observer for active navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'research', 'education', 'achievements', 'contact'];
      const scrollPos = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  // ─── Show/dismiss toast ────────────────────────────────────────
  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 6000);
  };

  // ─── Form field validation ────────────────────────────────────
  const validateForm = (data) => {
    const errors = {};
    const name = data.get('name')?.trim();
    const email = data.get('email')?.trim();
    const subject = data.get('subject')?.trim();
    const message = data.get('message')?.trim();

    if (!name) errors.name = 'Full name is required.';
    if (!email) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!subject) errors.subject = 'Subject is required.';
    if (!message) {
      errors.message = 'Message is required.';
    } else if (message.length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }
    return errors;
  };

  // ─── Contact form submit via EmailJS ──────────────────────────
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Client-side validation
    const errors = validateForm(data);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSending(true);

    try {
      if (EMAILJS_CONFIGURED) {
        // ─── EmailJS: actually send the email ───────────────────
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          form,
          EMAILJS_PUBLIC_KEY
        );
        showToast('success', 'Message Sent!', 'Your message has been delivered. I\'ll respond as soon as possible.');
        form.reset();
        setFormErrors({});
      } else {
        // ─── Fallback: open mailto with pre-filled data ─────────
        const name = data.get('name');
        const email = data.get('email');
        const subject = data.get('subject') || 'Portfolio Contact';
        const message = data.get('message');
        const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          `From: ${name} (${email})\n\nMessage:\n${message}`
        )}`;
        window.location.href = mailtoUrl;
        showToast('success', 'Email Client Opened', 'Your default email app was opened with the message. Please click Send there.');
        form.reset();
        setFormErrors({});
      }
    } catch (err) {
      console.error('EmailJS Error:', err);
      showToast('error', 'Failed to Send', 'Something went wrong. Please try again or email me directly at ' + PROFILE.email);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="site-shell">
      {/* ──────────────── NAVBAR (sticky, fixed top) ──────────────── */}
      <header className="navbar">
        <div className="navbar-container">
          {/* Left: Logo mark + short brand name */}
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Go to top">
            <span className="brand-badge">{PROFILE.initials}</span>
            <div className="brand-text">
              <b>{PROFILE.name}</b>
            </div>
          </button>

          {/* Center: Nav links with icons */}
          <nav className="nav-links desktop-nav" aria-label="Main navigation">
            {NAV_ITEMS.map(({ label, id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`nav-link-btn ${activeSection === id ? 'active' : ''}`}
              >
                <Icon size={15} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Right: Theme toggle + Let's Talk button + mobile hamburger */}
          <div className="nav-actions">
            <button
              className="icon-button theme-toggle"
              onClick={() => setLight(!light)}
              aria-label="Toggle light or dark theme"
              title={light ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {light ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              className="talk-button pill-button"
              onClick={() => scrollTo('contact')}
              aria-label="Contact Ayush Negi"
            >
              Let's Talk <ArrowUpRight size={15} />
            </button>

            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle mobile menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {NAV_ITEMS.map(({ label, id, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`mobile-nav-link ${activeSection === id ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
              <div className="mobile-actions">
                <button
                  className="talk-button pill-button w-full"
                  onClick={() => scrollTo('contact')}
                >
                  Let's Talk <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ──────────────── HERO SECTION (two-column layout) ──────────────── */}
        <section id="home" className="hero section">
          {/* Subtle background decoration: faint diagonal lines */}
          <div className="hero-diagonal-pattern" aria-hidden="true" />
          <div className="hero-glow-orb orb-left" aria-hidden="true" />
          <div className="hero-glow-orb orb-right" aria-hidden="true" />

          <div className="container hero-layout">
            {/* Left column */}
            <Reveal className="hero-content">
              <h1 className="hero-heading">
                Hello, I'm <br />
                <span className="accent-text typing-text">
                  {typedName}
                  <span className="typing-cursor">|</span>
                </span>
              </h1>

              <p className="hero-tagline">{PROFILE.tagline}</p>

              {/* Row of tech pill badges */}
              <div className="tech-row hero-pills">
                {TECH_PILLS.map((tech) => (
                  <span className="pill tech-pill" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Two CTA buttons */}
              <div className="hero-actions">
                <button
                  className="primary-button pill-cta"
                  onClick={() => scrollTo('projects')}
                >
                  View My Work <ArrowDown size={17} />
                </button>
                <button
                  className="secondary-button pill-cta"
                  onClick={() => scrollTo('contact')}
                >
                  <Mail size={17} /> Get in Touch
                </button>
              </div>

              {/* Social icons: GitHub, LinkedIn, LeetCode, Codeforces, Resume */}
              <div className="social-row hero-socials">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ayush Negi GitHub Profile"
                  title="GitHub Profile"
                  className="social-icon-btn"
                >
                  <GithubIcon size={20} />
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ayush Negi LinkedIn Profile"
                  title="LinkedIn Profile"
                  className="social-icon-btn"
                >
                  <LinkedinIcon size={20} />
                </a>
                <a
                  href={PROFILE.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ayush Negi LeetCode Profile"
                  title="LeetCode Profile"
                  className="social-icon-btn"
                >
                  <LeetCodeIcon size={19} />
                </a>
                <a
                  href={PROFILE.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ayush Negi Codeforces Profile"
                  title="Codeforces Profile"
                  className="social-icon-btn"
                >
                  <CodeforcesIcon size={19} />
                </a>
                <a
                  href={PROFILE.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Ayush_Negi_Resume.pdf"
                  className="social-icon-btn resume-btn"
                  aria-label="Download Ayush Negi Résumé (PDF)"
                  title="Download Résumé (PDF)"
                >
                  <Download size={19} />
                </a>
              </div>
            </Reveal>

            {/* Right column: photo card with profile picture */}
            <Reveal className="profile-column" delay={0.15}>
              <div className="profile-container">
                <div className="profile-ambient-glow" />
                <div className="profile-card-wrapper">
                  <div className="profile-card">
                    <img
                      src={PROFILE.profileImage}
                      alt="Ayush Negi - Software Developer"
                      className="profile-photo"
                    />
                    <div className="profile-floating-badge">
                      <div className="badge-spark">
                        <Sparkles size={16} />
                      </div>
                      <div className="badge-meta">
                        <b>Ayush Negi</b>
                        <small>MERN & AI Developer</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Small animated scroll-down indicator */}
          <button
            className="scroll-cue"
            onClick={() => scrollTo('about')}
            aria-label="Scroll down to About section"
          >
            <span>Scroll to explore</span>
            <ArrowDown size={15} />
          </button>
        </section>

        {/* ──────────────── ABOUT SECTION ──────────────── */}
        <section id="about" className="section about-section">
          <div className="container">
            <Reveal className="section-heading centered">
              <p className="section-kicker">Introduction</p>
              <h2>About Me</h2>
              <p className="section-intro">{PROFILE.bio}</p>
            </Reveal>

            <div className="about-layout">
              {/* Left: "My Journey" narrative */}
              <Reveal className="journey-card surface-card">
                <p className="section-kicker">My Journey</p>
                <h3>Engineering products with purpose and scalable precision.</h3>
                <div className="journey-body">
                  <p>
                    Currently pursuing my <strong>Bachelor of Computer Science at Chandigarh University</strong> while working as a <strong>Software Developer at Algoson Software Pvt. Ltd.</strong>, I bridge the gap between academic theory and production-grade engineering.
                  </p>
                  <p>
                    My core passion revolves around <strong>AI-driven development</strong> and full-stack software systems — architecting solutions with the MERN stack, crafting Python data processing pipelines, and building intuitive user experiences that solve real-world problems.
                  </p>
                  <p>
                    Whether formulating quantum-based AI safety frameworks or engineering responsive cloud-connected web applications, I focus on clean code, testability, and high-performance design.
                  </p>
                </div>
                <div className="journey-cta">
                  <a
                    href={`mailto:${PROFILE.email}?subject=Collaboration%20Inquiry%20-%20Ayush%20Negi`}
                    className="inline-link"
                  >
                    <span>Connect with me</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </Reveal>

              {/* Right: Vertical stack of highlight cards */}
              <div className="highlights-stack">
                <Reveal delay={0.05}>
                  <div className="highlight-item surface-card">
                    <div className="highlight-icon-box">
                      <Layers3 size={22} />
                    </div>
                    <div>
                      <h4>Full Stack Development</h4>
                      <p>
                        Shipping end-to-end web applications with MongoDB, Express, React, and Node.js, complete with secure authentication, Postman API testing, cloud storage, and responsive UI.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="highlight-item surface-card">
                    <div className="highlight-icon-box">
                      <Code2 size={22} />
                    </div>
                    <div>
                      <h4>Data-Driven Development</h4>
                      <p>
                        Writing Python-based algorithms, data cleaning pipelines, and analytics routines to transform complex data into actionable software capabilities.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="highlight-item surface-card highlight-research">
                    <div className="highlight-icon-box">
                      <Sparkles size={22} />
                    </div>
                    <div>
                      <div className="flex-title">
                        <h4>Research & Innovation</h4>
                        <span className="mini-badge">ACIFFS-2026</span>
                      </div>
                      <p>
                        Contributing to peer-reviewed academic research, including the quantum-based kill switch framework for safe control of advanced AI systems.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="highlight-item surface-card">
                    <div className="highlight-icon-box">
                      <Zap size={22} />
                    </div>
                    <div>
                      <h4>Continuous Learning</h4>
                      <p>
                        Active competitive programmer on LeetCode & Codeforces, constantly refining algorithmic problem solving and expanding cloud knowledge.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── SKILLS SECTION ──────────────── */}
        <section id="skills" className="section skills-section">
          <div className="container">
            <Reveal className="section-heading centered">
              <p className="section-kicker">Technical Arsenal</p>
              <h2>Skills & Competencies</h2>
              <p className="section-intro">
                A structured overview of the languages, frameworks, databases, and DevOps tools I use to build scalable digital products.
              </p>
            </Reveal>

            <div className="skills-grid">
              {SKILL_CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <Reveal key={cat.category} delay={idx * 0.08}>
                    <div className="skill-category-card surface-card">
                      <div className="skill-card-header">
                        <div className="skill-icon-wrapper">
                          <Icon size={24} />
                        </div>
                        <span className="skill-card-tag">{cat.tag}</span>
                      </div>

                      <h3 className="skill-card-title">{cat.category}</h3>

                      <div className="tech-row skill-badge-row">
                        {cat.skills.map((skill) => (
                          <span className="pill skill-pill" key={skill}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Currently Learning / Active Expansion Banner */}
            <Reveal delay={0.2}>
              <div className="skills-learning-card surface-card">
                <div className="skills-learning-left">
                  <div className="skills-learning-badge">
                    <span className="pulse-dot" />
                    <span>Currently Learning &amp; Expanding</span>
                  </div>
                  <p className="skills-learning-desc">
                    Currently learning <strong>Java &amp; Spring Boot</strong> — building backend systems and REST APIs to expand beyond the MERN stack.
                  </p>
                </div>
                <div className="skills-learning-tags">
                  <span className="pill in-progress-pill">
                    <Sparkles size={13} /> Java
                  </span>
                  <span className="pill in-progress-pill">
                    <Sparkles size={13} /> Spring Boot
                  </span>
                  <span className="in-progress-badge">In Progress</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ──────────────── PROJECTS SECTION ──────────────── */}
        <section id="projects" className="section projects-section">
          <div className="container">
            <Reveal className="section-heading centered">
              <p className="section-kicker">Featured Work</p>
              <h2>Highlighted Projects</h2>
              <p className="section-intro">
                Full-stack, production-ready web applications architected with robust backends, cloud integration, and intuitive frontend experiences.
              </p>
            </Reveal>

            <div className="projects-grid">
              {PROJECTS.map((proj, idx) => (
                <Reveal key={proj.id} delay={idx * 0.1}>
                  <article className="project-card surface-card">
                    <div className="project-visual-wrapper">
                      <img
                        src={proj.image}
                        alt={`${proj.title} Preview`}
                        className="project-image"
                        loading="lazy"
                      />
                      <div className="project-overlay" />
                      <div className="project-badges-bar">
                        <span className="project-badge">{proj.badge}</span>
                        <span className="status-live">
                          <span className="live-dot" /> Live
                        </span>
                      </div>
                    </div>

                    <div className="project-body">
                      <h3 className="project-title">{proj.title}</h3>
                      <p className="project-desc">{proj.description}</p>

                      <div className="tech-row project-tech-list">
                        {proj.tech.map((t) => (
                          <span className="pill micro-pill" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="project-actions">
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="primary-button project-btn"
                          aria-label={`Open live demo for ${proj.title}`}
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={15} />
                        </a>
                        <a
                          href={proj.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="secondary-button project-btn"
                          aria-label={`View source code for ${proj.title} on GitHub`}
                        >
                          <GithubIcon size={16} />
                          <span>Code</span>
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── EXPERIENCE SECTION ──────────────── */}
        <section id="experience" className="section experience-section">
          <div className="container">
            <Reveal className="section-heading centered">
              <p className="section-kicker">Work History</p>
              <h2>Experience</h2>
              <p className="section-intro">
                Hands-on professional engineering experience shipping features and data solutions in structured production environments.
              </p>
            </Reveal>

            <div className="experience-timeline">
              {EXPERIENCES.map((exp, idx) => (
                <Reveal key={exp.role + exp.period} delay={idx * 0.1}>
                  <div className="experience-card surface-card">
                    <div className="experience-header">
                      <div className="experience-role-info">
                        <div className="experience-badge-row">
                          <span className="company-tag">{exp.type}</span>
                          <span className="date-tag">{exp.period}</span>
                        </div>
                        <h3 className="experience-title">{exp.role}</h3>
                        <h4 className="experience-company">{exp.company}</h4>
                      </div>
                      <div className="experience-icon-badge">
                        <BriefcaseBusiness size={24} />
                      </div>
                    </div>

                    <ul className="experience-bullets">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="bullet-icon" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="tech-row experience-tech-row">
                      {exp.tech.map((t) => (
                        <span className="pill" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {exp.document && (
                      <div className="doc-preview-container">
                        {exp.documentType === 'pdf' ? (
                          <a
                            className="doc-attachment-card experience-doc-card document-pdf-preview"
                            href={exp.document}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${exp.documentLabel}: ${exp.documentTitle}`}
                          >
                            <FileText size={30} />
                            <span>PDF DOCUMENT</span>
                            <strong>{exp.documentLabel}</strong>
                            <ExternalLink size={15} />
                          </a>
                        ) : (
                          <div
                            className="doc-attachment-card experience-doc-card"
                            onClick={() => setPreviewDoc({ src: exp.document, title: exp.documentTitle })}
                            role="button"
                            tabIndex={0}
                          >
                            <img src={exp.document} alt={exp.documentTitle} className="doc-attachment-thumb" />
                            <div className="doc-attachment-overlay">
                              <ExternalLink size={16} />
                              <span>{exp.documentLabel}</span>
                            </div>
                          </div>
                        )}
                        <div className="doc-attachment-meta">
                          <FileText size={14} className="doc-meta-icon" />
                          <span>Official Internship Offer • Algoson Software Pvt. Ltd.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── RESEARCH / PUBLICATION SECTION (highlight block) ──────────────── */}
        <section id="research" className="section research-section">
          <div className="container">
            <Reveal className="section-heading centered">
              <p className="section-kicker">Scholarly Work</p>
              <h2>Research & Publication</h2>
              <p className="section-intro">
                Peer-reviewed academic research exploring safe control mechanisms and emergency containment protocols for autonomous AI systems.
              </p>
            </Reveal>

            <Reveal>
              <div className="research-card surface-card">
                <div className="research-glow-edge" />
                
                {/* Header Badges */}
                <div className="research-header-bar">
                  <div className="research-type-badge">
                    <BookOpen size={15} />
                    <span>Research Publication</span>
                  </div>
                  <div className="research-status-badge">
                    <Sparkles size={14} />
                    <span>Abstract Accepted for Oral Presentation</span>
                  </div>
                </div>

                <div className="research-grid-layout">
                  <div className="research-text-col">
                    {/* Conference full name */}
                    <div className="research-conference-name">
                      <Globe size={18} />
                      <span>International Conference on Advances in Computational Intelligence for Fluid and Fuzzy Systems (ACIFFS-2026)</span>
                    </div>

                    {/* Paper Title */}
                    <h3 className="research-title">
                      "Quantum-Based Kill Switch Framework for Safe Control of Advanced Artificial Intelligence Systems"
                    </h3>

                    {/* One-line description of the paper's focus */}
                    <div className="research-focus-box">
                      <Sparkles size={18} />
                      <div>
                        <strong>Paper Focus:</strong> Safe control mechanisms for advanced AI systems using quantum-based approaches.
                      </div>
                    </div>

                    {/* Structured Metadata Grid */}
                    <div className="research-meta-grid">
                      <div className="research-meta-item">
                        <span className="meta-label">Conference</span>
                        <span className="meta-val">ACIFFS-2026</span>
                      </div>
                      <div className="research-meta-item">
                        <span className="meta-label">Venue</span>
                        <span className="meta-val">Manipal University Jaipur, India</span>
                      </div>
                      <div className="research-meta-item">
                        <span className="meta-label">Dates</span>
                        <span className="meta-val">July 29–31, 2026</span>
                      </div>
                      <div className="research-meta-item">
                        <span className="meta-label">Status</span>
                        <span className="meta-val">Oral Presentation</span>
                      </div>
                    </div>

                    {/* Co-authorship Note */}
                    <div className="research-team-note">
                      <Users size={14} />
                      <span>Note: Co-authored as part of a multi-member research team</span>
                    </div>
                  </div>

                  {/* Research Acceptance Letter Image Preview */}
                  <div className="research-media-col">
                    <div
                      className="doc-attachment-card research-media-card"
                      onClick={() => setPreviewDoc({ src: '/aciffs-research-acceptance.png', title: 'ACIFFS-2026 Abstract Acceptance Letter' })}
                      role="button"
                      tabIndex={0}
                    >
                      <img
                        src="/aciffs-research-acceptance.png"
                        alt="ACIFFS-2026 Abstract Acceptance Letter"
                        className="doc-attachment-thumb research-thumb-img"
                      />
                      <div className="doc-attachment-overlay">
                        <ExternalLink size={18} />
                        <span>View Acceptance Letter</span>
                      </div>
                    </div>
                    <div className="doc-attachment-meta justify-center">
                      <CheckCircle2 size={14} className="doc-meta-icon text-emerald" />
                      <span>Verified Acceptance Letter</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ──────────────── EDUCATION & CERTIFICATIONS SECTION ──────────────── */}
        <section id="education" className="section education-section">
          <div className="container">
            <Reveal className="section-heading centered">
              <p className="section-kicker">Academic & Professional Credentials</p>
              <h2>Education & Certifications</h2>
              <p className="section-intro">
                Formal computer science foundation complemented by continuous certified coursework in data analytics, AI, and leadership.
              </p>
            </Reveal>

            <div className="education-grid">
              {/* Education Card */}
              <Reveal>
                <div className="education-card surface-card">
                  <div className="card-top-icon">
                    <GraduationCap size={28} />
                  </div>
                  <span className="date-tag">2025 – 2028</span>
                  <h3 className="edu-degree">Bachelor of Computer Science</h3>
                  <h4 className="edu-institution">Chandigarh University</h4>

                  <div className="cgpa-pill">
                    <span className="cgpa-label">Academic Performance:</span>
                    <span className="cgpa-value">CGPA 8.1</span>
                  </div>

                  <p className="edu-description">
                    Focusing on foundational algorithms, data structures, operating systems, database management systems, and modern full-stack web engineering.
                  </p>
                </div>
              </Reveal>

              {/* Certifications List */}
              <div className="certifications-list">
                {CERTIFICATIONS.map((cert, i) => (
                  <Reveal key={cert.title} delay={i * 0.08}>
                    <div className="cert-item surface-card">
                      <div className="cert-icon-wrapper">
                        <Award size={20} />
                      </div>
                      <div className="cert-content">
                        <div className="cert-top">
                          <h4 className="cert-title">{cert.title}</h4>
                          <span className="cert-issuer">{cert.issuer}</span>
                        </div>
                        <span className="cert-badge">{cert.badge}</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── ACHIEVEMENTS & PARTICIPATION SECTION ──────────────── */}
        <section id="achievements" className="section achievements-section">
          <div className="container">
            <Reveal className="section-heading centered">
              <p className="section-kicker">Honors & Competitions</p>
              <h2>Achievements & Participation</h2>
              <p className="section-intro">
                Recognition and competitive technical participation across university events, hackathons, and research symposiums.
              </p>
            </Reveal>

            <div className="achievements-grid">
              {ACHIEVEMENTS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <Reveal key={item.title} delay={idx * 0.1}>
                    <div className="achievement-card surface-card">
                      <div className="achievement-card-top">
                        <div className="achievement-icon-box">
                          <IconComponent size={24} />
                        </div>
                        <div className="achievement-meta-badges">
                          <span className="company-tag">{item.category}</span>
                          <span className="date-tag">{item.date}</span>
                        </div>
                      </div>

                      <h3 className="achievement-title">{item.title}</h3>
                      <h4 className="achievement-org">{item.organization}</h4>
                      <p className="achievement-desc">{item.description}</p>

                      {item.document && (
                        <div className="achievement-doc-preview">
                          <div
                            className="doc-attachment-card achievement-thumb-card"
                            onClick={() => setPreviewDoc({ src: item.document, title: item.documentTitle })}
                            role="button"
                            tabIndex={0}
                          >
                            <img src={item.document} alt={item.documentTitle} className="doc-attachment-thumb cert-thumb-img" />
                            <div className="doc-attachment-overlay">
                              <ExternalLink size={16} />
                              <span>{item.documentLabel}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="achievement-badge-bar">
                        <CheckCircle2 size={16} />
                        <span>{item.badge}</span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ──────────────── CONTACT SECTION ──────────────── */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <Reveal className="section-heading centered">
              <p className="section-kicker">Let’s Connect</p>
              <h2>Get In Touch</h2>
              <p className="section-intro">
                Have a project, role opportunity, or question in mind? Send me a message or connect through any platform.
              </p>
            </Reveal>

            <div className="contact-layout">
              {/* Left Column: Let's Connect */}
              <Reveal className="connect-card surface-card">
                <p className="section-kicker">Direct Reachout</p>
                <h3>Let's build something impactful together.</h3>
                <p className="connect-intro">
                  Whether you have an upcoming project, are looking for a dedicated full-stack developer, or want to discuss AI integration and competitive programming:
                </p>

                <div className="contact-info-list">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="contact-info-row"
                    title="Send Email"
                  >
                    <div className="info-icon">
                      <Mail size={18} />
                    </div>
                    <div>
                      <small>Email</small>
                      <b>{PROFILE.email}</b>
                    </div>
                  </a>

                  <div className="contact-info-row">
                    <div className="info-icon">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <small>Location</small>
                      <b>{PROFILE.location}</b>
                    </div>
                  </div>
                </div>

                {/* CP Platforms & Socials Callout */}
                <div className="cp-section">
                  <small className="section-kicker">Competitive Programming & Profiles</small>
                  <div className="cp-grid">
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cp-link-card"
                    >
                      <LinkedinIcon size={18} />
                      <span>LinkedIn</span>
                      <ArrowUpRight size={14} />
                    </a>

                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cp-link-card"
                    >
                      <GithubIcon size={18} />
                      <span>GitHub</span>
                      <ArrowUpRight size={14} />
                    </a>

                    <a
                      href={PROFILE.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cp-link-card"
                    >
                      <LeetCodeIcon size={18} />
                      <span>LeetCode</span>
                      <ArrowUpRight size={14} />
                    </a>

                    <a
                      href={PROFILE.codeforces}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cp-link-card"
                    >
                      <CodeforcesIcon size={18} />
                      <span>Codeforces</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Send a Message Form */}
              <Reveal className="form-card surface-card" delay={0.1}>
                <p className="section-kicker">Inquiry Form</p>
                <h3>Send a Message</h3>
                <p className="form-intro">
                  Fill out the form below and I'll respond as soon as possible.
                </p>

                <form ref={formRef} onSubmit={handleSendMessage} className="contact-form" noValidate>
                  <div className={`form-group ${formErrors.name ? 'has-error' : ''}`}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. John Doe"
                      className="form-input"
                      onChange={() => setFormErrors(prev => ({ ...prev, name: undefined }))}
                    />
                    {formErrors.name && <span className="field-error"><AlertCircle size={13} /> {formErrors.name}</span>}
                  </div>

                  <div className={`form-group ${formErrors.email ? 'has-error' : ''}`}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g. john@example.com"
                      className="form-input"
                      onChange={() => setFormErrors(prev => ({ ...prev, email: undefined }))}
                    />
                    {formErrors.email && <span className="field-error"><AlertCircle size={13} /> {formErrors.email}</span>}
                  </div>

                  <div className={`form-group ${formErrors.subject ? 'has-error' : ''}`}>
                    <label htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="e.g. Project Discussion / Job Opportunity"
                      className="form-input"
                      onChange={() => setFormErrors(prev => ({ ...prev, subject: undefined }))}
                    />
                    {formErrors.subject && <span className="field-error"><AlertCircle size={13} /> {formErrors.subject}</span>}
                  </div>

                  <div className={`form-group ${formErrors.message ? 'has-error' : ''}`}>
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Describe your project, timeline, or inquiry..."
                      className="form-textarea"
                      onChange={() => setFormErrors(prev => ({ ...prev, message: undefined }))}
                    />
                    {formErrors.message && <span className="field-error"><AlertCircle size={13} /> {formErrors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="primary-button submit-btn"
                  >
                    {sending ? (
                      <>
                        <span className="spinner" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  {!EMAILJS_CONFIGURED && (
                    <p className="form-fallback-note">
                      <AlertCircle size={13} /> EmailJS not configured — form will open your email client as a fallback.
                    </p>
                  )}
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ──────────────── FOOTER ──────────────── */}
      <footer className="footer">
        <div className="container footer-content">
          {/* Brand & Tagline */}
          <div className="footer-brand-col">
            <button className="brand" onClick={() => scrollTo('home')} aria-label="Go to top">
              <span className="brand-badge">{PROFILE.initials}</span>
              <div className="brand-text">
                <b>{PROFILE.name}</b>
              </div>
            </button>
            <p className="footer-tagline">
              Engineering polished, production-ready digital products — one thoughtful commit at a time.
            </p>
            <div className="social-row footer-socials">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-icon-btn"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon-btn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={PROFILE.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="social-icon-btn"
              >
                <LeetCodeIcon size={18} />
              </a>
              <a
                href={PROFILE.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Codeforces"
                className="social-icon-btn"
              >
                <CodeforcesIcon size={18} />
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                aria-label="Email"
                className="social-icon-btn"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <div className="footer-links-list">
              <button onClick={() => scrollTo('about')}>About</button>
              <button onClick={() => scrollTo('skills')}>Skills</button>
              <button onClick={() => scrollTo('projects')}>Projects</button>
              <button onClick={() => scrollTo('experience')}>Experience</button>
              <button onClick={() => scrollTo('education')}>Education</button>
              <button onClick={() => scrollTo('research')}>Research</button>
              <button onClick={() => scrollTo('achievements')}>Achievements</button>
              <button onClick={() => scrollTo('contact')}>Contact</button>
            </div>
          </div>

          {/* Resources */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Resources & Profiles</h4>
            <div className="footer-links-list">
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                download="Ayush_Negi_Resume.pdf"
              >
                Résumé
              </a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={PROFILE.leetcode} target="_blank" rel="noopener noreferrer">
                LeetCode
              </a>
              <a href={PROFILE.codeforces} target="_blank" rel="noopener noreferrer">
                Codeforces
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
            <p className="built-with">Built with React & Tailwind CSS • Electric Blue Theme</p>
          </div>
        </div>
      </footer>

      {/* ──────────────── DOCUMENT LIGHTBOX MODAL ──────────────── */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            className="doc-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              className="doc-lightbox-dialog"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="doc-lightbox-header">
                <h4>{previewDoc.title}</h4>
                <button
                  className="doc-lightbox-close"
                  onClick={() => setPreviewDoc(null)}
                  aria-label="Close document preview"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="doc-lightbox-body">
                <img src={previewDoc.src} alt={previewDoc.title} className="doc-lightbox-img" />
              </div>
              <div className="doc-lightbox-footer">
                <a
                  href={previewDoc.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-button pill-cta"
                >
                  <span>Open Full Resolution Image</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────── TOAST NOTIFICATION ──────────────── */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
const rootElement = document.getElementById('root');
if (!window.__portfolioRoot) {
  window.__portfolioRoot = createRoot(rootElement);
}
window.__portfolioRoot.render(<App />);
