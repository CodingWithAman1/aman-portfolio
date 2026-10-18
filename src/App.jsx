import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import WorkSection from './components/WorkSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';
import { ChevronUp } from 'lucide-react';
import { sound } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Smooth scroll handler
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll listener to update active section in sidebar and back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      setShowBackToTop(window.scrollY > 400);

      const sections = ['home', 'about', 'skills', 'work', 'education', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1d1d1d] text-white selection:bg-[#08fdd8] selection:text-[#181818] overflow-x-hidden">
      {/* Custom Neon Cursor */}
      <CustomCursor />

      {/* Left Navigation Sidebar */}
      <Sidebar activeSection={activeSection} onNavigate={scrollTo} />

      {/* Main Content Area (Offset for enlarged desktop sidebar) */}
      <main className="w-full md:pl-[150px] lg:pl-[165px] pt-14 md:pt-0">
        <HeroSection
          onContactClick={() => scrollTo('contact')}
          onScrollDown={() => scrollTo('about')}
        />
        <AboutSection onContactClick={() => scrollTo('contact')} />
        <SkillsSection />
        <WorkSection />
        <EducationSection />
        <ContactSection />

        {/* Minimal Footer */}
        <footer className="w-full py-10 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-[#252525] bg-[#181818] flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-[#888888] font-mono">
          <div>
            © {new Date().getFullYear()} Aman Sharma &bull; B.Tech CSE GL Bajaj. All rights reserved.
          </div>
          <div className="mt-3 sm:mt-0 flex items-center gap-5">
            <span className="text-[#08fdd8] font-semibold">60 FPS Live Canvas</span>
            <span className="text-[#fd2155] font-semibold">Full-Stack Cloud Architecture</span>
          </div>
        </footer>
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => {
            sound.playButtonClick();
            scrollTo('home');
          }}
          className="fixed bottom-6 right-24 z-30 p-3 rounded-full bg-[#181818] border border-[#333333] text-[#08fdd8] hover:border-[#08fdd8] hover:bg-[#252525] shadow-2xl transition-all duration-300 animate-in fade-in cursor-pointer"
          title="Back to Top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  );
}
