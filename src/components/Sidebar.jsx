import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Menu,
  X,
  FileText
} from 'lucide-react';
import { sound } from '../utils/audio';

// Clean SVG icons for social links
const GithubIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45 1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
  </svg>
);

const WhatsappIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.12.17 1.77 2.7 4.28 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/>
  </svg>
);

const GlobeIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'My Skills' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Sidebar({ activeSection, onNavigate }) {
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  const handleNavClick = (id) => {
    sound.playButtonClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#181818]/95 backdrop-blur-md border-b border-[#292929] px-4 py-3.5 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-3"
        >
          <img src="./logo-icon.svg" alt="Aman Logo" className="w-9 h-9" />
          <span className="font-extrabold text-white text-lg tracking-wider">Aman</span>
        </a>

        <div className="flex items-center gap-3">
          <a
            href="./Aman-Sharma-Resume.pdf"
            download="Aman-Sharma-Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#08fdd8]/10 text-[#08fdd8] border border-[#08fdd8]/40 text-xs font-mono font-semibold"
          >
            <FileText size={13} />
            <span>CV</span>
          </a>

          <button
            onClick={toggleSound}
            className="p-1.5 text-[#8d8d8d] hover:text-[#08fdd8] transition-colors"
            title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          >
            {soundEnabled ? <Volume2 size={20} className="text-[#08fdd8]" /> : <VolumeX size={20} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white hover:text-[#08fdd8] transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-[#181818] pt-24 px-8 flex flex-col justify-between pb-10">
          <nav className="flex flex-col space-y-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-2xl font-semibold text-left transition-colors ${
                  activeSection === item.id ? 'text-[#08fdd8]' : 'text-[#8d8d8d] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6 text-[#8d8d8d] pt-6 border-t border-[#282828]">
            <a href="https://github.com/CodingWithAman1" target="_blank" rel="noreferrer" className="hover:text-[#08fdd8]"><GithubIcon size={22} /></a>
            <a href="https://www.linkedin.com/in/aman-sharma-web/" target="_blank" rel="noreferrer" className="hover:text-[#08fdd8]"><LinkedinIcon size={22} /></a>
            <a href="https://wa.me/919690683156" target="_blank" rel="noreferrer" className="hover:text-[#08fdd8]"><WhatsappIcon size={22} /></a>
            <a href="https://codingwithaman1.github.io/PORTFOLIO/" target="_blank" rel="noreferrer" className="hover:text-[#08fdd8]"><GlobeIcon size={22} /></a>
          </div>
        </div>
      )}

      {/* Desktop Left Sidebar (Enlarged & Prominent) */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-[150px] lg:w-[165px] bg-[#181818] flex-col justify-between items-center z-40 border-r border-[#242424] select-none shadow-2xl">
        {/* Top Logo Card */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="w-full pt-7 pb-6 flex flex-col items-center bg-[#000000]/40 hover:bg-[#000000]/60 transition-colors group cursor-pointer border-b border-[#242424]"
        >
          {/* Dual-Tone Logo Icon */}
          <div className="relative w-14 h-16 mb-2.5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <img src="./logo-icon.svg" alt="Aman Logo" className="w-14 h-16 object-contain drop-shadow-[0_0_10px_rgba(253,33,85,0.5)]" />
          </div>

          <span className="text-white font-extrabold text-lg lg:text-xl tracking-wider group-hover:text-[#08fdd8] transition-colors">
            Aman
          </span>
          <span className="text-[#8d8d8d] text-[11px] lg:text-xs tracking-tight mt-1 font-medium">
            CSE &bull; Full-Stack
          </span>
        </a>

        {/* Navigation Links in Center (Enlarged font & spacing) */}
        <nav className="w-full flex flex-col divide-y divide-[#262626]/50 border-y border-[#262626]/50">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => sound.playButtonHover()}
                className={`w-full py-4 lg:py-4.5 text-center text-sm lg:text-[15px] tracking-wider transition-all duration-200 relative group font-medium ${
                  isActive
                    ? 'text-[#08fdd8] font-bold bg-[#222222]/50'
                    : 'text-[#8d8d8d] hover:text-[#08fdd8] hover:bg-[#1e1e1e]'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#08fdd8] shadow-[0_0_10px_#08fdd8]" />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Social Icons, Resume & Sound */}
        <div className="w-full pb-7 pt-4 flex flex-col items-center space-y-4">
          {/* Direct Resume Download Button */}
          <a
            href="./Aman-Sharma-Resume.pdf"
            download="Aman-Sharma-Resume.pdf"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#08fdd8]/10 hover:bg-[#08fdd8] text-[#08fdd8] hover:text-[#181818] border border-[#08fdd8]/40 text-xs font-mono font-semibold transition-all shadow-[0_0_10px_rgba(8,253,216,0.2)]"
            title="Download Aman's Resume PDF"
          >
            <FileText size={13} />
            <span>Resume</span>
          </a>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3.5 text-[#888888]">
            <a
              href="https://github.com/CodingWithAman1"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#08fdd8] hover:scale-110 transition-all"
              title="GitHub Profile"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/aman-sharma-web/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#08fdd8] hover:scale-110 transition-all"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="https://wa.me/919690683156"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#08fdd8] hover:scale-110 transition-all"
              title="WhatsApp: +91-9690683156"
            >
              <WhatsappIcon size={16} />
            </a>
            <a
              href="https://codingwithaman1.github.io/PORTFOLIO/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#08fdd8] hover:scale-110 transition-all"
              title="Existing Portfolio"
            >
              <GlobeIcon size={16} />
            </a>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 text-xs text-[#777777] hover:text-[#08fdd8] transition-colors py-1 px-2.5 rounded border border-[#262626] hover:border-[#383838]"
            title={soundEnabled ? 'Click to mute sounds' : 'Click to enable futuristic UI sounds'}
          >
            {soundEnabled ? (
              <>
                <Volume2 size={13} className="text-[#08fdd8]" />
                <span className="text-[#08fdd8] font-mono">Sound On</span>
              </>
            ) : (
              <>
                <VolumeX size={13} />
                <span className="font-mono">Muted</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
