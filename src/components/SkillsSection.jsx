import React from 'react';
import RubberBandWord from './RubberBandText';
import { Cpu, Terminal, Award, CheckCircle2, Briefcase, Database, Globe, Wrench } from 'lucide-react';

export default function SkillsSection() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: ['Python', 'JavaScript (ES6+)', 'SQL', 'C Language', 'HTML5', 'CSS3'],
      color: '#08fdd8'
    },
    {
      title: 'Frameworks & Web Engineering',
      skills: ['Flask 3.x', 'Jinja2', 'RESTful APIs', 'Chart.js', 'Tailwind CSS', 'Bootstrap 5'],
      color: '#fd2155'
    },
    {
      title: 'Databases & ORM',
      skills: ['PostgreSQL', 'SQLite', 'SQLAlchemy 2.0 (Relational Schemas)', 'ACID Transactions'],
      color: '#08fdd8'
    },
    {
      title: 'Cloud, AI & DevOps Tools',
      skills: ['Google Gemini Vision AI', 'Vercel Serverless', 'Render Cloud', 'Netlify', 'Git & GitHub', 'Postman'],
      color: '#fd2155'
    }
  ];

  const skillBars = [
    { name: 'Python & Backend Architecture (Flask, SQLAlchemy, REST APIs)', percent: 92, color: '#08fdd8' },
    { name: 'Full-Stack Web (JavaScript ES6+, Jinja2, Tailwind, Bootstrap)', percent: 90, color: '#fd2155' },
    { name: 'Relational Databases (PostgreSQL, SQLite, SQL)', percent: 88, color: '#08fdd8' },
    { name: 'AI Integration (Gemini Multimodal Vision, Leaflet GPS)', percent: 85, color: '#fd2155' },
    { name: 'Data Structures, Algorithms & C Programming', percent: 86, color: '#08fdd8' }
  ];

  const certifications = [
    {
      title: 'Python Programming (90h Intensive)',
      issuer: 'Reliance Foundation & N.S.D.C.',
      tag: 'Core Certification'
    },
    {
      title: 'Cisco CyberSecurity & AI',
      issuer: 'AI & Security Learn-a-Thon',
      tag: 'Security & AI'
    },
    {
      title: '200+ DSA Problems Solved',
      issuer: 'LeetCode & HackerRank Problem Solving',
      tag: 'Competitive Coding'
    },
    {
      title: '4 Live Production Deployments',
      issuer: 'Vercel, Render & Netlify Cloud Platforms',
      tag: 'DevOps & Deployment'
    }
  ];

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#1d1d1d] flex flex-col justify-center border-t border-[#262626]"
    >
      <div className="font-cursive text-[#606062] text-lg sm:text-xl md:text-2xl pointer-events-none select-none mb-6 font-medium">
        &lt;section id="skills"&gt;
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Skills & Progress */}
        <div className="lg:col-span-6 space-y-8">
          <div className="font-cursive text-[#606062] text-lg sm:text-xl pointer-events-none select-none font-medium">
            &lt;h2&gt;
          </div>

          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
            <RubberBandWord text="Skills & Experience" />
          </h2>

          <div className="font-cursive text-[#606062] text-lg sm:text-xl pointer-events-none select-none font-medium">
            &lt;/h2&gt;
          </div>

          <p className="text-[#cccccc] text-base sm:text-lg font-light leading-relaxed">
            Hands-on expertise across backend architectures, full-stack web platforms, transactional relational databases, and multimodal AI integrations.
          </p>

          {/* Categorized Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#181818] border border-[#2c2c2c] hover:border-[#08fdd8]/40 transition-colors"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-[#fd2155] font-bold mb-2">
                  {cat.title}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-[#242424] text-[#e0e0e0] text-xs font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Animated Progress Bars */}
          <div className="space-y-5 pt-4">
            <div className="text-xs font-mono uppercase tracking-[3px] text-[#08fdd8] font-bold">
              // Proficiency Metrics
            </div>
            {skillBars.map((skill, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-[#08fdd8] font-bold">{skill.percent}%</span>
                </div>
                <div className="w-full h-2 bg-[#252525] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${skill.percent}%`,
                      backgroundColor: skill.color,
                      boxShadow: `0 0 12px ${skill.color}`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Work Experience & Certifications */}
        <div className="lg:col-span-6 space-y-10">
          {/* Work Experience */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm uppercase font-mono tracking-[3px] text-[#fd2155] font-bold">
              <Briefcase size={18} />
              <span>Industry Experience</span>
            </div>

            <div className="p-6 rounded-xl bg-[#181818] border border-[#2d2d2d] space-y-3 relative overflow-hidden group hover:border-[#08fdd8]/50 transition-colors">
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#08fdd8] transition-colors">
                  Web Development Intern
                </h3>
                <span className="text-xs font-mono text-[#08fdd8] px-2.5 py-1 rounded bg-[#08fdd8]/10 border border-[#08fdd8]/30">
                  July 2024 &ndash; Aug 2024 &bull; Remote
                </span>
              </div>

              <div className="text-sm font-semibold text-[#fd2155] font-mono">
                3 Skills India
              </div>

              <ul className="space-y-2 text-[#cccccc] text-sm sm:text-base font-light leading-relaxed pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#08fdd8] shrink-0 mt-1" />
                  <span>Modernized frontend web architectures with semantic HTML5, CSS3, and JavaScript, reducing mobile layout shifts across responsive viewports.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#08fdd8] shrink-0 mt-1" />
                  <span>Collaborated with senior engineers on sprint velocity, pull request reviews, and cross-device accessibility optimizations.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm uppercase font-mono tracking-[3px] text-[#08fdd8] font-bold">
              <Award size={18} />
              <span>Certifications &amp; Achievements</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((c, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#181818] border border-[#2c2c2c] hover:border-[#fd2155]/50 transition-all hover:-translate-y-0.5 space-y-1.5"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#fd2155] font-semibold block">
                    {c.tag}
                  </span>
                  <div className="text-sm sm:text-base font-bold text-white">
                    {c.title}
                  </div>
                  <div className="text-xs text-[#888888] font-mono">
                    {c.issuer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="font-cursive text-[#606062] text-lg sm:text-xl md:text-2xl pointer-events-none select-none mt-10 font-medium">
        &lt;/section&gt;
      </div>
    </section>
  );
}
