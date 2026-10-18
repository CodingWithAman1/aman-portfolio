import React, { useState } from 'react';
import { sound } from '../utils/audio';

export function RubberBandChar({ char, isSpecialDualTone = false, isSpecialJ = false, className = '' }) {
  const [animating, setAnimating] = useState(false);

  const handleMouseEnter = () => {
    if (char === ' ') return;
    setAnimating(true);
    sound.playLetterHover(char);
  };

  const handleAnimationEnd = () => {
    setAnimating(false);
  };

  if (char === ' ') {
    return <span className="inline-block w-2 md:w-3">&nbsp;</span>;
  }

  if (isSpecialDualTone || isSpecialJ) {
    return (
      <span
        onMouseEnter={handleMouseEnter}
        onAnimationEnd={handleAnimationEnd}
        className={`inline-block relative cursor-default select-none transition-colors duration-150 ${
          animating ? 'rubber-band-anim text-[#08fdd8]' : ''
        } ${className}`}
        style={{ display: 'inline-block' }}
      >
        <span className="relative inline-block">
          {/* Cyan glitch shadow underneath */}
          <span
            className="absolute -left-1.5 top-0 text-[#08fdd8] select-none pointer-events-none drop-shadow-[0_0_8px_rgba(8,253,216,0.8)]"
            aria-hidden="true"
          >
            {char}
          </span>
          {/* Main magenta letter */}
          <span className="relative text-[#fd2155] drop-shadow-[0_0_8px_rgba(253,33,85,0.8)]">{char}</span>
        </span>
      </span>
    );
  }

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onAnimationEnd={handleAnimationEnd}
      className={`inline-block cursor-default select-none transition-colors duration-150 hover:text-[#08fdd8] ${
        animating ? 'rubber-band-anim text-[#08fdd8]' : ''
      } ${className}`}
    >
      {char}
    </span>
  );
}

export default function RubberBandWord({ text, specialCharIndex = -1, className = '', nowrap = false }) {
  // Split by words to ensure individual words NEVER break in the middle
  const words = text.split(' ');
  let runningIndex = 0;

  return (
    <span className={`inline-flex items-baseline ${nowrap ? 'flex-nowrap whitespace-nowrap' : 'flex-wrap'} gap-x-2.5 sm:gap-x-3 md:gap-x-4 ${className}`}>
      {words.map((word, wIdx) => {
        const wordStartIdx = runningIndex;
        runningIndex += word.length + 1; // account for space

        return (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {word.split('').map((char, cIdx) => {
              const charIdx = wordStartIdx + cIdx;
              return (
                <RubberBandChar
                  key={cIdx}
                  char={char}
                  isSpecialDualTone={charIdx === specialCharIndex}
                />
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
