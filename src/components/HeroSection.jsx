import React from 'react';
import LiveRibbonCanvas from './LiveRibbonCanvas';
import RubberBandWord, { RubberBandChar } from './RubberBandText';
import { sound } from '../utils/audio';
import { ArrowDown, FileText, Sparkles } from 'lucide-react';

export default function HeroSection({ onContactClick, onScrollDown, onProjectsClick }) {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden bg-[#1d1d1d] select-none"
    >
      {/* Live Ribbon Animation Canvas in background & right side */}
      <LiveRibbonCanvas />

      {/* Code Watermark Tag: <html> and <body> top left (Enlarged for readability) */}
      <div className="absolute top-8 md:top-12 left-6 sm:left-12 md:left-16 lg:left-24 font-cursive text-[#606062] text-lg sm:text-xl md:text-2xl pointer-events-none select-none z-10 font-medium">
        <div>&lt;html&gt;</div>
        <div className="pl-6">&lt;body&gt;</div>
      </div>

      {/* Main Content Area (Fluid Typography & Expanded Container) */}
      <div className="relative z-20 max-w-4xl lg:max-w-5xl xl:max-w-6xl py-24 md:py-20 pointer-events-auto">
        {/* <h1> opening tag */}
        <div className="font-cursive text-[#606062] text-lg sm:text-xl md:text-2xl mb-2 pointer-events-none select-none font-medium">
          &lt;h1&gt;
        </div>

        {/* Hero Headline with RubberBand bouncing letters (Fluid & Unbroken) */}
        <div
          className="font-heading font-extrabold tracking-tight text-white leading-[1.0] mb-3"
          style={{ fontSize: 'clamp(2.4rem, 6.2vw, 5.8rem)' }}
        >
          {/* Line 1: Hi, */}
          <div className="block whitespace-nowrap">
            <RubberBandWord text="Hi," nowrap={true} />
          </div>

          {/* Line 2: I'm Aman, with stylized dual-tone 'A' */}
          <div className="flex items-baseline flex-nowrap whitespace-nowrap">
            <RubberBandWord text="I'm" nowrap={true} />
            <span className="inline-block w-3 md:w-5">&nbsp;</span>
            <RubberBandChar char="A" isSpecialDualTone={true} />
            <RubberBandWord text="man," nowrap={true} />
          </div>

          {/* Line 3: software engineer (Strictly single line, never breaks) */}
          <div className="block whitespace-nowrap">
            <RubberBandWord text="software engineer" nowrap={true} />
          </div>
        </div>

        {/* </h1> closing tag */}
        <div className="font-cursive text-[#606062] text-lg sm:text-xl md:text-2xl mt-2 mb-6 pointer-events-none select-none font-medium">
          &lt;/h1&gt;
        </div>

        {/* Subtitle with <p> tags (Enlarged & Real Title) */}
        <div className="mb-10 pl-2">
          <div className="font-cursive text-[#606062] text-base sm:text-lg pointer-events-none select-none">
            &lt;p&gt;
          </div>
          <p className="text-[#b0b0b0] text-sm sm:text-base md:text-lg tracking-[4px] sm:tracking-[6px] uppercase font-mono py-1.5 pl-6 font-medium">
            B.Tech CSE Student &bull; Full-Stack Developer &bull; AI Integrations
          </p>
          <div className="font-cursive text-[#606062] text-base sm:text-lg pointer-events-none select-none">
            &lt;/p&gt;
          </div>
        </div>

        {/* Action Buttons (Enlarged) */}
        <div className="pl-6 flex flex-wrap gap-4 items-center">
          <button
            onClick={() => {
              sound.playButtonClick();
              onContactClick();
            }}
            onMouseEnter={() => sound.playButtonHover()}
            className="group relative inline-flex items-center justify-center px-10 py-4.5 border-2 border-[#08fdd8] text-[#08fdd8] text-sm sm:text-base font-mono tracking-[4px] uppercase bg-transparent overflow-hidden transition-all duration-300 hover:text-[#1d1d1d] hover:bg-[#08fdd8] hover:shadow-[0_0_30px_rgba(8,253,216,0.7)] active:scale-95 cursor-pointer font-bold"
          >
            <span className="relative z-10">Contact me!</span>
          </button>

          <a
            href="./Aman-Sharma-Resume.pdf"
            download="Aman-Sharma-Resume.pdf"
            onMouseEnter={() => sound.playButtonHover()}
            className="inline-flex items-center gap-2 px-8 py-4.5 border border-[#383838] hover:border-[#fd2155] text-white hover:text-[#fd2155] text-sm sm:text-base font-mono tracking-[3px] uppercase bg-[#181818]/80 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(253,33,85,0.4)] cursor-pointer font-semibold"
          >
            <FileText size={16} />
            <span>Resume PDF</span>
          </a>
        </div>
      </div>

      {/* Rotated Vertical "scroll down" with down arrow (Enlarged & Prominent) */}
      <div
        onClick={onScrollDown}
        className="absolute left-6 sm:left-12 md:left-16 lg:left-24 bottom-10 z-20 flex items-center gap-3 cursor-pointer group"
      >
        <span
          className="text-white text-xs sm:text-sm font-mono tracking-[3px] uppercase opacity-80 group-hover:opacity-100 group-hover:text-[#08fdd8] transition-colors font-medium"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)'
          }}
        >
          scroll down
        </span>
        <div className="animate-bounce text-white group-hover:text-[#08fdd8] transition-colors">
          <ArrowDown size={18} />
        </div>
      </div>
    </section>
  );
}
