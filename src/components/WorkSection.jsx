import React, { useState } from 'react';
import RubberBandWord from './RubberBandText';
import { ExternalLink, Eye, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

const GithubIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS = [
  {
    id: 1,
    title: 'CivicConnect',
    tagline: 'AI Civic Action & Grievance Governance Platform',
    category: 'ai',
    tag: 'Flask 3.x • Gemini Vision AI',
    image: './civicconnect.png',
    description: 'Full-lifecycle municipal governance platform with automated Gemini Vision AI defect detection, Haversine GPS proximity clustering, and photographic repair verification.',
    tech: ['Flask 3.x', 'Google Gemini Vision AI', 'PostgreSQL', 'Leaflet GPS', 'Cloudinary', 'Bootstrap 5'],
    demoUrl: 'https://civicconnectweb.onrender.com/',
    codeUrl: 'https://github.com/CodingWithAman1/CivicConnect',
    bullets: [
      'Architected full-lifecycle civic governance portal with role-based routing across Citizens, NGOs, and Municipal Authorities.',
      'Integrated Google Gemini Multimodal Vision AI to analyze uploaded complaint photos, auto-detect infrastructure defects (potholes, garbage, water leaks), and compute severity index.',
      'Engineered Haversine GPS proximity clustering (300m radius) to merge duplicate citizen reports, preventing municipal backlog.',
      'Implemented photographic resolution audit engine comparing before/after repair photos before authorizing ticket completion.'
    ]
  },
  {
    id: 2,
    title: 'Inventra',
    tagline: 'Smart Cloud Inventory & Stock Analytics Platform',
    category: 'cloud',
    tag: 'Flask • SQLAlchemy • Chart.js',
    image: './inv.png',
    description: 'Production warehouse management solution with real-time stock monitoring, automated low-inventory alerts, ACID-compliant audit trails, and Vercel serverless deployment.',
    tech: ['Flask', 'SQLAlchemy 2.0', 'PostgreSQL', 'Chart.js', 'Vercel Serverless WSGI'],
    demoUrl: 'https://inventra-rho-lac.vercel.app/',
    codeUrl: 'https://github.com/CodingWithAman1/Inventra',
    bullets: [
      'Engineered production warehouse inventory system with real-time stock monitoring, automated low-inventory reorder alerts, and supplier directories.',
      'Built ACID-compliant relational audit trails recording immutable delta history for every inventory transaction (+/- adjustments).',
      'Designed interactive Chart.js dashboards delivering warehouse asset valuation, monthly movement graphs, and dynamic CSV exports.',
      'Architected serverless WSGI microservice on Vercel with PostgreSQL cloud database connection pooling.'
    ]
  },
  {
    id: 3,
    title: 'MyRail',
    tagline: 'Real-Time Indian Railway PNR & Live Train Tracking',
    category: 'api',
    tag: 'JavaScript ES6+ • Railway REST APIs',
    image: './myrail.png',
    description: 'High-speed railway tracker providing real-time PNR status, live train running status, station autocomplete lookups, and asynchronous sub-second caching.',
    tech: ['JavaScript (ES6+)', 'RapidAPI', 'Railway REST APIs', 'Asynchronous Fetch', 'Bootstrap 5', 'Netlify'],
    demoUrl: 'https://myrailbase.netlify.app/',
    codeUrl: 'https://github.com/CodingWithAman1/myrail',
    bullets: [
      'Engineered responsive railway tracker web application providing real-time PNR status, live train status, and station autocomplete lookups.',
      'Implemented asynchronous API caching and error boundary layer ensuring sub-second response times and high availability.'
    ]
  },
  {
    id: 4,
    title: 'Amanzon',
    tagline: 'Responsive Full-Featured E-Commerce Storefront',
    category: 'web',
    tag: 'HTML5 • CSS3 • JavaScript',
    image: './resume_preview.png',
    description: 'Multi-page responsive e-commerce storefront with dynamic product catalog filtering, interactive cart state, and optimized cross-browser rendering pipeline.',
    tech: ['HTML5', 'CSS3 (Flexbox & Grid)', 'JavaScript (ES6+)', 'LocalStorage State'],
    demoUrl: 'https://github.com/CodingWithAman1/amanzon',
    codeUrl: 'https://github.com/CodingWithAman1/amanzon',
    bullets: [
      'Developed responsive multi-page e-commerce storefront featuring dynamic product catalog filtering, interactive cart state, and modal checkout.',
      'Optimized cross-browser rendering pipeline ensuring 100% responsive fidelity across desktop, tablet, and mobile breakpoints.'
    ]
  }
];

export default function WorkSection() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  const categories = [
    { id: 'all', label: 'All Featured Projects' },
    { id: 'ai', label: 'AI & Civic Systems' },
    { id: 'cloud', label: 'Cloud & Database SaaS' },
    { id: 'api', label: 'REST APIs & Real-Time' },
    { id: 'web', label: 'Frontend & E-Commerce' }
  ];

  return (
    <section
      id="work"
      className="relative min-h-screen w-full py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#1d1d1d] flex flex-col justify-center border-t border-[#262626]"
    >
      <div className="font-cursive text-[#606062] text-lg sm:text-xl md:text-2xl pointer-events-none select-none mb-6 font-medium">
        &lt;section id="work"&gt;
      </div>

      <div className="space-y-8">
        <div className="font-cursive text-[#606062] text-lg sm:text-xl pointer-events-none select-none font-medium">
          &lt;h2&gt;
        </div>

        <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
          <RubberBandWord text="Selected Works" />
        </h2>

        <div className="font-cursive text-[#606062] text-lg sm:text-xl pointer-events-none select-none font-medium">
          &lt;/h2&gt;
        </div>

        <p className="text-[#cccccc] text-base sm:text-lg lg:text-xl max-w-3xl font-light leading-relaxed">
          Production full-stack platforms engineered by Aman Sharma, featuring AI vision processing, live database workflows, and cloud deployments.
        </p>

        {/* Filter Tabs (Enlarged) */}
        <div className="flex flex-wrap gap-2.5 pt-2 pb-4">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                sound.playButtonClick();
                setFilter(c.id);
              }}
              onMouseEnter={() => sound.playButtonHover()}
              className={`px-5 py-2.5 text-xs sm:text-sm font-mono tracking-wider transition-all rounded-lg font-medium cursor-pointer ${
                filter === c.id
                  ? 'bg-[#08fdd8] text-[#181818] font-bold shadow-[0_0_16px_rgba(8,253,216,0.5)]'
                  : 'bg-[#181818] text-[#a0a0a0] hover:text-white border border-[#2d2d2d] hover:border-[#444]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Projects Grid (Enlarged Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-2xl bg-[#181818] border border-[#2c2c2c] hover:border-[#08fdd8] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between"
            >
              {/* Project Image Banner */}
              <div className="h-56 sm:h-64 w-full bg-[#111111] relative overflow-hidden flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    // Fallback gradient if image not found
                    e.target.style.display = 'none';
                  }}
                />

                {/* Tag pill */}
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#181818]/90 backdrop-blur-md text-xs font-mono text-[#08fdd8] border border-[#08fdd8]/40 font-semibold shadow-md">
                  {project.tag}
                </span>

                {/* Hover overlay button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-xs">
                  <span className="px-6 py-3 rounded-full bg-[#08fdd8] text-[#181818] font-extrabold text-sm tracking-wider flex items-center gap-2 shadow-2xl">
                    <Eye size={16} /> View Project Deep-Dive
                  </span>
                </div>
              </div>

              {/* Project Info (Enlarged) */}
              <div className="p-6 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-extrabold text-2xl group-hover:text-[#08fdd8] transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-[#fd2155] font-semibold mt-1">
                    {project.tagline}
                  </div>

                  <p className="text-[#a0a0a0] text-sm sm:text-base leading-relaxed pt-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#242424] text-[#d0d0d0] text-xs font-mono font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#181818] border border-[#333333] shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#252525] text-[#8d8d8d] hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="h-56 sm:h-64 rounded-xl overflow-hidden bg-[#111111] relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-3 left-3 text-xs font-mono text-[#08fdd8] px-3.5 py-1.5 bg-black/80 backdrop-blur-sm rounded-full border border-[#08fdd8]/40 font-semibold">
                {selectedProject.tag}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedProject.title}
              </h3>
              <p className="text-sm font-mono text-[#fd2155] font-semibold">
                {selectedProject.tagline}
              </p>
              <p className="text-[#b0b0b0] text-base leading-relaxed pt-1">
                {selectedProject.description}
              </p>
            </div>

            {/* Bullets */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs uppercase font-mono tracking-wider text-[#08fdd8] font-bold">
                // Technical Architecture Highlights
              </h4>
              <ul className="space-y-2 text-[#cccccc] text-sm leading-relaxed">
                {selectedProject.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#08fdd8] shrink-0 mt-1" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs uppercase font-mono tracking-wider text-[#777777] mb-2 font-bold">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded bg-[#242424] text-[#08fdd8] font-mono text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-[#262626]">
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playSuccess()}
                  className="flex-1 py-3.5 rounded-lg bg-[#08fdd8] text-[#181818] font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#06deb8] transition-colors shadow-lg"
                >
                  <ExternalLink size={16} /> Open Live Platform
                </a>
              )}
              {selectedProject.codeUrl && (
                <a
                  href={selectedProject.codeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playButtonClick()}
                  className="px-6 py-3.5 rounded-lg bg-[#252525] text-white hover:text-[#08fdd8] font-mono text-sm flex items-center gap-2 transition-colors border border-[#383838]"
                >
                  <GithubIcon size={16} /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="font-cursive text-[#606062] text-lg sm:text-xl md:text-2xl pointer-events-none select-none mt-10 font-medium">
        &lt;/section&gt;
      </div>
    </section>
  );
}
