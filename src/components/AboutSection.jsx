import React from 'react';
import SphereTagCloud from './SphereTagCloud';
import RubberBandWord from './RubberBandText';
import { sound } from '../utils/audio';
import { GraduationCap, Award, Code2, Cloud, FileText, CheckCircle2 } from 'lucide-react';

export default function AboutSection({ onContactClick }) {
  const stats = [
    { label: 'B.Tech CSE Student', value: 'GL Bajaj', sub: 'Greater Noida', icon: GraduationCap },
    { label: 'DSA Problems Solved', value: '200+', sub: 'LeetCode & HackerRank', icon: Code2 },
    { label: 'Live Cloud Apps', value: '4+', sub: 'Vercel, Render, Netlify', icon: Cloud },
    { label: 'Certified Programmer', value: '90h', sub: 'Reliance & NSDC', icon: Award }
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#1d1d1d] flex flex-col justify-center border-t border-[#262626]"
    >
      {/* Code tag watermark (Enlarged) */}
      <div className="font-cursive text-[#606062] text-lg sm:text-xl md:text-2xl pointer-events-none select-none mb-6 font-medium">
        &lt;section id="about"&gt;
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Story & Bio (Enlarged text) */}
        <div className="lg:col-span-7 space-y-7">
          <div className="font-cursive text-[#606062] text-lg sm:text-xl pointer-events-none select-none font-medium">
            &lt;h2&gt;
          </div>

          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
            <RubberBandWord text="Me, Myself and I" />
          </h2>

          <div className="font-cursive text-[#606062] text-lg sm:text-xl pointer-events-none select-none font-medium">
            &lt;/h2&gt;
          </div>

          <div className="space-y-5 text-[#cccccc] text-base sm:text-lg lg:text-xl leading-relaxed font-light">
            <div className="font-cursive text-[#606062] text-base pointer-events-none select-none">
              &lt;p&gt;
            </div>
            <p>
              I am <span className="text-[#08fdd8] font-semibold">Aman Sharma</span>, a proactive <span className="text-white font-semibold">B.Tech Computer Science Engineering student</span> at <span className="text-[#fd2155] font-semibold">GL Bajaj Institute of Technology and Management, Greater Noida</span> (Batch 2025 – 2029).
            </p>
            <p>
              I possess hands-on expertise building production web platforms, transactional database architectures, and AI-integrated workflows. Proven track record deploying live, full-stack cloud applications (such as <span className="text-[#08fdd8] font-medium">CivicConnect</span>, <span className="text-[#08fdd8] font-medium">Inventra</span>, and <span className="text-[#08fdd8] font-medium">MyRail</span>) featuring automated AI triage, RESTful APIs, and responsive interfaces.
            </p>
            <p>
              Dedicated to engineering scalable, high-impact software solutions within forward-thinking engineering teams. I also previously interned as a <span className="text-white font-medium">Web Development Intern at 3 Skills India</span>, focusing on semantic UI architectures and performance optimizations.
            </p>
            <div className="font-cursive text-[#606062] text-base pointer-events-none select-none">
              &lt;/p&gt;
            </div>
          </div>

          {/* Key Milestones Bar (Enlarged) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-[#2d2d2d] hover:border-[#08fdd8]/60 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                >
                  <Icon size={22} className="text-[#fd2155] mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">{s.value}</div>
                  <div className="text-xs sm:text-sm font-semibold text-[#cccccc] mt-1">{s.label}</div>
                  <div className="text-[11px] text-[#777777] font-mono mt-0.5">{s.sub}</div>
                </div>
              );
            })}
          </div>

          {/* Action Links */}
          <div className="pt-4 flex flex-wrap gap-5 items-center">
            <button
              onClick={() => {
                sound.playButtonClick();
                onContactClick();
              }}
              onMouseEnter={() => sound.playButtonHover()}
              className="px-8 py-4 border-2 border-[#08fdd8] text-[#08fdd8] text-sm font-mono tracking-[3px] uppercase hover:bg-[#08fdd8] hover:text-[#181818] transition-all hover:shadow-[0_0_24px_rgba(8,253,216,0.6)] font-bold cursor-pointer"
            >
              Let's build something impactful!
            </button>

            <a
              href="./Aman-Sharma-Resume.pdf"
              download="Aman-Sharma-Resume.pdf"
              className="flex items-center gap-2 px-6 py-4 rounded bg-[#242424] hover:bg-[#2e2e2e] text-white hover:text-[#08fdd8] border border-[#383838] text-sm font-mono tracking-[2px] transition-all"
            >
              <FileText size={16} />
              <span>Download Official Resume</span>
            </a>
          </div>
        </div>

        {/* Right Column: 3D Interactive Tag Cloud */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full text-center mb-3">
            <span className="text-xs sm:text-sm font-mono tracking-wider text-[#888888] uppercase font-semibold">
              // Interactive 3D Sphere (Move Cursor to Rotate)
            </span>
          </div>
          <SphereTagCloud />
        </div>
      </div>

      <div className="font-cursive text-[#606062] text-lg sm:text-xl md:text-2xl pointer-events-none select-none mt-10 font-medium">
        &lt;/section&gt;
      </div>
    </section>
  );
}
