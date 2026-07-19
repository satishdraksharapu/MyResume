import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'experience', href: '#experience' },
  { label: 'education', href: '#education' },
  { label: 'contact', href: '#contact' },
]

const SKILLS = {
  'Backend': ['.NET Core', 'C#', 'ASP.NET MVC', 'Web API', 'Entity Framework', 'NUnit'],
  'Cloud & DevOps': ['Microsoft Azure', 'Azure Functions', 'Logic Apps', 'APIM', 'Service Bus', 'Entra ID', 'CI/CD', 'DevOps'],
  'Frontend': ['Angular', 'AngularJS', 'TypeScript', 'Bootstrap', 'HTML5', 'CSS3'],
  'Data': ['SQL Server', 'Query Optimization', 'ETL', 'Data Analysis'],
  'Architecture': ['Microservices', 'RESTful APIs', 'System Design', 'Scalable Architecture', 'Multithreading'],
  'Leadership': ['Team Lead', 'Code Review', 'Agile', 'Mentoring', 'Stakeholder Management'],
}

const EXPERIENCES = [
  {
    company: 'Techwave',
    role: 'Team Lead',
    period: 'Aug 2025 – Jul 2026',
    location: 'Hyderabad, India',
    current: true,
    highlights: [
      'Lead end-to-end design, development, and deployment of scalable applications using .NET, Azure, and modern architectural patterns',
      'Drive technical excellence through coding standards, code reviews, design decisions, and performance optimization',
      'Manage and mentor cross-functional teams, fostering Agile culture and knowledge sharing',
      'Spearhead cloud migration, API integrations, and enterprise solutions with Azure services (APIM, Logic Apps, Functions, Service Bus, Entra ID)',
    ],
  },
  {
    company: 'Techwave',
    role: 'Technical Lead',
    period: 'Jul 2023 – Jul 2025',
    location: 'Hyderabad, India',
    current: false,
    highlights: [
      'Led design, development, and deployment of enterprise applications using .NET, C#, and Microsoft Azure',
      'Implemented WhatsApp integration using Whapi cloud APIs and webhooks',
      'Developed scalable solutions with Azure Functions and Azure Logic Apps; optimized APIs with new configuration solutions',
      'Drove DevOps practices to optimize CI/CD pipelines and enhance development efficiency',
    ],
  },
  {
    company: 'ValueMomentum',
    role: 'Senior Software Engineer',
    period: 'Oct 2022 – Jul 2023',
    location: 'Hyderabad, India',
    current: false,
    highlights: [
      'Contributed to innovative software solutions for insurance and healthcare industries',
      'Introduced NUnit framework to streamline unit testing across the system',
      'Enhanced applications by optimizing backend processes with .NET Core and C#',
      'Improved front-end interfaces using modern frameworks for better UX and accessibility',
    ],
  },
  {
    company: 'Softblobs Private Limited',
    role: 'Senior Software Engineer',
    period: 'May 2021 – Oct 2022',
    location: 'Hyderabad, India',
    current: false,
    highlights: [
      'Led a team of 5 engineers on the legal client management product "IPro"',
      'Designed and implemented new features using .NET Core, Angular, and ASP.NET MVC',
      'Applied multithreading techniques to enhance application performance and reliability',
      'Optimized databases using Microsoft SQL Server; developed RESTful APIs with ASP.NET Web API',
    ],
  },
  {
    company: 'Resource Integration Solutions',
    role: 'Senior Software Engineer',
    period: 'Apr 2020 – May 2021',
    location: 'Visakhapatnam, India',
    current: false,
    highlights: [
      'Managed development and enhancement of data-centric applications for ETL and analysis domain',
      'Optimized complex SQL queries to ensure high performance of data processing tasks',
    ],
  },
  {
    company: 'Lonrix Ltd',
    role: 'Senior Software Engineer / Onsite Engineer',
    period: 'Aug 2017 – Apr 2020',
    location: 'Visakhapatnam / Waikato, New Zealand',
    current: false,
    highlights: [
      'Created scalable solutions and workflows to streamline operations across multiple applications',
      'Acted as primary onsite point of contact in New Zealand — ensured smooth client communication',
      'Delivered seamless client experience maintaining high-quality standards and SLA adherence',
    ],
  },
  {
    company: 'ANAX Info Services',
    role: 'Junior Software Developer',
    period: 'Feb 2016 – Aug 2017',
    location: 'India',
    current: false,
    highlights: [
      'Built and maintained dynamic web applications using ASP.NET and SQL Server',
      'Participated in full SDLC including requirement analysis, coding, and testing',
    ],
  },
]

const EDUCATION = [
  {
    school: 'Andhra University',
    degree: "Master's Degree — Master of Computer Applications",
    period: '2014 – 2017',
  },
  {
    school: 'Andhra University',
    degree: 'Bachelor of Science — Maths, Electronics & Computers',
    period: '2011 – 2014',
  },
  {
    school: 'Narayana Junior College',
    degree: 'Intermediate — Maths, Physics & Chemistry',
    period: '2009 – 2011',
  },
]

function useTypewriter(text: string, speed = 50) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    let i = 0
    setDisplayed('')
    setDone(false)
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])
  return { displayed, done }
}

function TerminalLine({ prefix, text, color = '#e6edf3', delay = 0 }: { prefix?: string; text: string; color?: string; delay?: number }) {
  const [visible, setVisible] = useState(delay === 0)
  useEffect(() => {
    if (delay > 0) {
      const t = setTimeout(() => setVisible(true), delay)
      return () => clearTimeout(t)
    }
  }, [delay])
  if (!visible) return null
  return (
    <div className="flex gap-2 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace', animationDelay: `${delay}ms` }}>
      {prefix && <span style={{ color: '#00d4aa' }}>{prefix}</span>}
      <span style={{ color }}>{text}</span>
    </div>
  )
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(13,17,23,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #30363d' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00d4aa', fontSize: '0.9rem' }}>
          <span style={{ color: '#8b949e' }}>~/</span>satish<span style={{ color: '#8b949e' }}>$</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 text-sm"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                color: '#8b949e',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00d4aa')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8b949e')}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/satishdraksharapu/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm transition-all duration-200"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              background: 'transparent',
              border: '1px solid #00d4aa',
              color: '#00d4aa',
              borderRadius: '4px',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00d4aa'
              e.currentTarget.style.color = '#0d1117'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#00d4aa'
            }}
          >
            LinkedIn
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-0.5 w-5 transition-all"
              style={{ background: '#8b949e' }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#161b22', borderBottom: '1px solid #30363d' }} className="md:hidden px-6 pb-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'JetBrains Mono, monospace', color: '#8b949e', textDecoration: 'none', fontSize: '0.9rem' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const { displayed, done } = useTypewriter('Team Lead | Full Stack .NET Developer', 45)
  const [showSub, setShowSub] = useState(false)
  const [showCta, setShowCta] = useState(false)

  useEffect(() => {
    if (done) {
      setTimeout(() => setShowSub(true), 300)
      setTimeout(() => setShowCta(true), 700)
    }
  }, [done])

  return (
    <section
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{ background: '#0d1117' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,170,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #00d4aa, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        {/* Terminal header */}
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded"
          style={{ background: '#161b22', border: '1px solid #30363d' }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: '#f85149' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#d29922' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#3fb950' }} />
          <span className="ml-2 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#8b949e' }}>
            satishdraksharapu ~ bash
          </span>
        </div>

        <div className="mb-4">
          <TerminalLine prefix="$" text="whoami" delay={0} />
        </div>

        <h1
          className="font-bold leading-none mb-4"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: '#e6edf3',
            letterSpacing: '-0.02em',
          }}
        >
          Satish Kumar{' '}
          <span style={{ color: '#00d4aa' }}>Draksharapu</span>
        </h1>

        <div
          className="mb-8 h-8 flex items-center"
          style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00d4aa', fontSize: 'clamp(0.85rem, 2vw, 1.1rem)' }}
        >
          <span>{displayed}</span>
          {!done && <span className="typing-cursor" />}
        </div>

        {showSub && (
          <p
            className="mb-10 max-w-2xl fade-up"
            style={{ color: '#8b949e', fontSize: '1.05rem', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}
          >
            10+ years architecting scalable enterprise applications with{' '}
            <span style={{ color: '#e6edf3' }}>.NET Core</span>,{' '}
            <span style={{ color: '#e6edf3' }}>Microsoft Azure</span>, and{' '}
            <span style={{ color: '#e6edf3' }}>SQL Server</span>. Leading teams, solving complex systems problems, and shipping production-grade software.
          </p>
        )}

        {showCta && (
          <div className="flex flex-wrap gap-4 fade-up">
            <a
              href="#experience"
              className="px-6 py-3 font-medium transition-all duration-200"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                background: '#00d4aa',
                color: '#0d1117',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#00b894')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#00d4aa')}
            >
              view_experience()
            </a>
            <a
              href="mailto:satish.draksharapu@gmail.com"
              className="px-6 py-3 font-medium transition-all duration-200"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                background: 'transparent',
                color: '#e6edf3',
                border: '1px solid #30363d',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00d4aa'
                e.currentTarget.style.color = '#00d4aa'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#30363d'
                e.currentTarget.style.color = '#e6edf3'
              }}
            >
              get_in_touch()
            </a>
          </div>
        )}

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: '11+', label: 'Years Experience' },
            { val: '7+', label: 'Companies' },
            { val: '3', label: 'Team Lead Roles' },
            { val: '∞', label: 'Problems Solved' },
          ].map(({ val, label }) => (
            <div
              key={label}
              className="p-4 rounded"
              style={{ background: '#161b22', border: '1px solid #30363d' }}
            >
              <div
                style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#00d4aa' }}
              >
                {val}
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#8b949e', marginTop: '2px' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-24" style={{ background: '#0d1117', borderTop: '1px solid #21262d' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel text="// about.md" />

        <div className="grid md:grid-cols-2 gap-12 mt-10 items-start">
          <div>
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#e6edf3', marginBottom: '1.5rem' }}>
              Building systems that{' '}
              <span style={{ color: '#00d4aa' }}>scale.</span>
            </h2>
            <p style={{ color: '#8b949e', lineHeight: 1.8, marginBottom: '1rem' }}>
              I'm a Full Stack .NET Developer with over <strong style={{ color: '#e6edf3' }}>10 years</strong> of experience designing, developing, and deploying scalable applications using Microsoft technologies. Currently serving as <strong style={{ color: '#e6edf3' }}>Team Lead at Techwave</strong> in Hyderabad.
            </p>
            <p style={{ color: '#8b949e', lineHeight: 1.8 }}>
              My focus lies in code optimization, system performance, and translating complex business requirements into elegant technical solutions — bridging architecture decisions with hands-on delivery across cloud, APIs, and data layers.
            </p>
          </div>

          {/* Code snippet card */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #30363d', background: '#161b22' }}>
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#1c2128', borderBottom: '1px solid #30363d' }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#f85149' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#d29922' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#3fb950' }} />
              <span className="ml-2 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#8b949e' }}>
                SatishProfile.cs
              </span>
            </div>
            <pre
              className="p-6 text-sm overflow-x-auto"
              style={{ fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.7, margin: 0 }}
            >
              <code>
                <span style={{ color: '#7c5cfc' }}>public class</span>
                <span style={{ color: '#e6edf3' }}> Developer</span>
                {'\n'}
                <span style={{ color: '#e6edf3' }}>{'{'}</span>
                {'\n'}
                <span style={{ color: '#8b949e' }}>  // Identity</span>
                {'\n'}
                <span style={{ color: '#3fb950' }}>  Name</span>
                <span style={{ color: '#e6edf3' }}> = </span>
                <span style={{ color: '#d29922' }}>"Satish Kumar Draksharapu"</span>
                {'\n'}
                <span style={{ color: '#3fb950' }}>  Role</span>
                <span style={{ color: '#e6edf3' }}> = </span>
                <span style={{ color: '#d29922' }}>"Team Lead"</span>
                {'\n'}
                <span style={{ color: '#3fb950' }}>  Location</span>
                <span style={{ color: '#e6edf3' }}> = </span>
                <span style={{ color: '#d29922' }}>"Greater Chicago Area"</span>
                {'\n'}
                <span style={{ color: '#3fb950' }}>  Experience</span>
                <span style={{ color: '#e6edf3' }}> = </span>
                <span style={{ color: '#00d4aa' }}>10</span>
                <span style={{ color: '#8b949e' }}> // years</span>
                {'\n\n'}
                <span style={{ color: '#8b949e' }}>  // Strengths</span>
                {'\n'}
                <span style={{ color: '#3fb950' }}>  PrimaryStack</span>
                <span style={{ color: '#e6edf3' }}> = [</span>
                <span style={{ color: '#d29922' }}>"NET Core"</span>
                <span style={{ color: '#e6edf3' }}>, </span>
                <span style={{ color: '#d29922' }}>"Azure"</span>
                <span style={{ color: '#e6edf3' }}>, </span>
                <span style={{ color: '#d29922' }}>"SQL"</span>
                <span style={{ color: '#e6edf3' }}>]</span>
                {'\n'}
                <span style={{ color: '#3fb950' }}>  Mindset</span>
                <span style={{ color: '#e6edf3' }}> = </span>
                <span style={{ color: '#d29922' }}>"Engineering Excellence"</span>
                {'\n'}
                <span style={{ color: '#e6edf3' }}>{'}'}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <section id="skills" className="py-24" style={{ background: '#0a0d13', borderTop: '1px solid #21262d' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel text="// tech.stack" />
        <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.2rem', fontWeight: 700, color: '#e6edf3', marginTop: '0.5rem', marginBottom: '2.5rem' }}>
          Technical Arsenal
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div
              key={category}
              className="rounded-lg p-5 cursor-pointer transition-all duration-200"
              style={{
                background: activeCategory === category ? '#1c2128' : '#161b22',
                border: `1px solid ${activeCategory === category ? '#00d4aa' : '#30363d'}`,
              }}
              onMouseEnter={() => setActiveCategory(category)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#00d4aa', boxShadow: activeCategory === category ? '0 0 8px #00d4aa' : 'none' }}
                />
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.75rem',
                    color: '#00d4aa',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs rounded"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      background: '#0d1117',
                      color: '#c9d1d9',
                      border: '1px solid #21262d',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section id="experience" className="py-24" style={{ background: '#0d1117', borderTop: '1px solid #21262d' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel text="// git log --oneline" />
        <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.2rem', fontWeight: 700, color: '#e6edf3', marginTop: '0.5rem', marginBottom: '2.5rem' }}>
          Experience Timeline
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #00d4aa, #30363d)' }}
          />

          <div className="flex flex-col gap-6">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="md:pl-14 relative">
                {/* Timeline dot */}
                <div
                  className="absolute left-2 top-6 w-4 h-4 rounded-full hidden md:flex items-center justify-center -translate-x-1/2"
                  style={{
                    background: exp.current ? '#00d4aa' : '#21262d',
                    border: `2px solid ${exp.current ? '#00d4aa' : '#30363d'}`,
                    boxShadow: exp.current ? '0 0 12px rgba(0,212,170,0.5)' : 'none',
                  }}
                >
                  {exp.current && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#0d1117' }} />
                  )}
                </div>

                <div
                  className="rounded-lg overflow-hidden cursor-pointer transition-all duration-200"
                  style={{
                    background: expanded === i ? '#161b22' : '#13181f',
                    border: `1px solid ${expanded === i ? '#30363d' : '#21262d'}`,
                  }}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#e6edf3' }}>
                          {exp.role}
                        </span>
                        {exp.current && (
                          <span
                            className="px-2 py-0.5 text-xs rounded-full"
                            style={{ fontFamily: 'JetBrains Mono, monospace', background: 'rgba(0,212,170,0.1)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)' }}
                          >
                            Latest
                          </span>
                        )}
                      </div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#00d4aa', marginTop: '2px' }}>
                        {exp.company}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#8b949e' }}>{exp.period}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#6e7681', marginTop: '2px' }}>{exp.location}</div>
                    </div>
                  </div>

                  {expanded === i && (
                    <div
                      className="px-5 pb-5 pt-0"
                      style={{ borderTop: '1px solid #21262d' }}
                    >
                      <ul className="mt-4 flex flex-col gap-3">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex gap-3 items-start text-sm" style={{ color: '#8b949e', lineHeight: 1.6 }}>
                            <span style={{ color: '#00d4aa', fontFamily: 'JetBrains Mono, monospace', flexShrink: 0, marginTop: '2px' }}>▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="py-24" style={{ background: '#0a0d13', borderTop: '1px solid #21262d' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel text="// education.json" />
        <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.2rem', fontWeight: 700, color: '#e6edf3', marginTop: '0.5rem', marginBottom: '2.5rem' }}>
          Academic Background
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EDUCATION.map((edu, i) => (
            <div
              key={i}
              className="rounded-lg p-6 transition-all duration-200"
              style={{ background: '#161b22', border: '1px solid #30363d' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#00d4aa')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#30363d')}
            >
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#00d4aa', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {edu.period}
              </div>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.15rem', fontWeight: 600, color: '#e6edf3', marginBottom: '6px' }}>
                {edu.school}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#8b949e', lineHeight: 1.5 }}>
                {edu.degree}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'satish.draksharapu@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-24" style={{ background: '#0d1117', borderTop: '1px solid #21262d' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel text="// reach_out()" />
        <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.2rem', fontWeight: 700, color: '#e6edf3', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Let's Build Something
        </h2>
        <p style={{ color: '#8b949e', fontSize: '1rem', lineHeight: 1.7, maxWidth: '480px', marginBottom: '2.5rem' }}>
          Open to senior engineering and leadership roles. If you're working on interesting systems problems, let's connect.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={copyEmail}
            className="flex items-center gap-3 px-5 py-3 rounded transition-all duration-200"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              background: '#161b22',
              border: '1px solid #30363d',
              color: copied ? '#00d4aa' : '#e6edf3',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#00d4aa')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#30363d')}
          >
            <span style={{ color: copied ? '#00d4aa' : '#8b949e' }}>{copied ? '✓' : '✉'}</span>
            {copied ? 'copied!' : email}
          </button>

          <a
            href="https://www.linkedin.com/in/satishdraksharapu/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded transition-all duration-200"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              background: '#161b22',
              border: '1px solid #30363d',
              color: '#e6edf3',
              textDecoration: 'none',
              fontSize: '0.85rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0a66c2'
              e.currentTarget.style.color = '#0a66c2'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#30363d'
              e.currentTarget.style.color = '#e6edf3'
            }}
          >
            <span>in</span>
            LinkedIn Profile
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8" style={{ background: '#0a0d13', borderTop: '1px solid #21262d' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#6e7681' }}>
          © 2026 Satish Kumar Draksharapu
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#6e7681' }}>
          Greater Chicago Area · <span style={{ color: '#00d4aa' }}>Open to opportunities</span>
        </div>
      </div>
    </footer>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.75rem',
        color: '#3fb950',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        marginBottom: '4px',
      }}
    >
      {text}
    </div>
  )
}

export default function App() {
  return (
    <div style={{ background: '#0d1117', minHeight: '100vh' }}>
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </div>
  )
}
