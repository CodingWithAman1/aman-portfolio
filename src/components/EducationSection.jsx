import React from 'react';
import RubberBandWord from './RubberBandText';
import { GraduationCap, BookOpen, Calendar, MapPin, Award } from 'lucide-react';

export default function EducationSection() {
  const education = [
    {
      degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
      institution: 'GL Bajaj Institute of Technology and Management',
      location: 'Greater Noida, Uttar Pradesh',
      period: '2025 – 2029',
      badge: 'Current &bull; Undergrad',
      coursework: 'Operating Systems, DBMS, Object-Oriented Programming (OOP), Data Structures & Algorithms, Computer Networks',
      highlight: 'Specializing in full-stack cloud systems, AI integrations, and transactional database architecture.'
    },
    {
      degree: 'Intermediate (Class XII) • Science (Physics, Chemistry, Math)',
      institution: 'Brightland School, Lucknow',
      location: 'Lucknow, Uttar Pradesh (CBSE)',
      period: '2024',
      badge: 'Completed',
      coursework: 'Higher Mathematics, Physics, Chemistry, Computer Applications',
      highlight: 'Strong mathematical foundation in calculus, linear algebra, and algorithmic logic.'
    },
    {
      degree: 'High School (Class X)',
      institution: 'Brightland School, Lucknow',
      location: 'Lucknow, Uttar Pradesh (CBSE)',
      period: '2022',
      badge: 'Completed',
      coursework: 'Science, Mathematics, Social Studies, English',
      highlight: 'Early passion for programming languages, computer systems, and web scripting.'
    }
  ];

  return (
    <section
      id="education"
      className="relative min-h-screen w-full py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#1d1d1d] flex flex-col justify-center border-t border-[#262626]"
    >
      <div className="font-cursive text-[#606062] text-lg sm:text-xl md:text-2xl pointer-events-none select-none mb-6 font-medium">
        &lt;section id="education"&gt;
      </div>

      <div className="space-y-8">
        <div className="font-cursive text-[#606062] text-lg sm:text-xl pointer-events-none select-none font-medium">
          &lt;h2&gt;
        </div>

        <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
          <RubberBandWord text="Education & Academics" />
        </h2>

        <div className="font-cursive text-[#606062] text-lg sm:text-xl pointer-events-none select-none font-medium">
          &lt;/h2&gt;
        </div>

        <p className="text-[#cccccc] text-base sm:text-lg lg:text-xl max-w-3xl font-light leading-relaxed">
          Academic credentials and engineering coursework establishing deep theoretical grounding in computer systems and software engineering.
        </p>

        <div className="space-y-6 pt-4">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#181818] border border-[#2c2c2c] hover:border-[#08fdd8]/60 transition-all duration-300 space-y-4 hover:-translate-y-1 group"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#222222] flex items-center justify-center text-[#fd2155] group-hover:scale-110 transition-transform">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#08fdd8] transition-colors">
                      {edu.degree}
                    </h3>
                    <div className="text-sm font-semibold text-[#fd2155] font-mono mt-0.5">
                      {edu.institution}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#08fdd8]/10 text-[#08fdd8] border border-[#08fdd8]/30 text-xs font-mono font-semibold">
                    {edu.period}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#888888] font-mono">
                <MapPin size={14} className="text-[#08fdd8]" />
                <span>{edu.location}</span>
              </div>

              <div className="pt-2 border-t border-[#242424] space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#08fdd8] font-semibold">
                  Coursework &amp; Specialization:
                </div>
                <div className="text-sm sm:text-base text-[#cccccc] font-light">
                  {edu.coursework}
                </div>
                <p className="text-xs sm:text-sm text-[#888888] italic">
                  {edu.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="font-cursive text-[#606062] text-lg sm:text-xl md:text-2xl pointer-events-none select-none mt-10 font-medium">
        &lt;/section&gt;
      </div>
    </section>
  );
}
