import React from 'react';
import RubberBandWord from './RubberBandText';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

const ARTICLES = [
  {
    id: 1,
    title: 'Designing Fluid 3D Parametric Ribbons on HTML5 Canvas',
    excerpt: 'Deep-dive into harmonographs, Lorenz attractors, and projective geometry to render silk-smooth 60fps ribbon curves.',
    date: 'Oct 2026',
    readTime: '6 min read',
    tag: 'Creative Coding'
  },
  {
    id: 2,
    title: 'The Art of Micro-Interactions: Why RubberBand Resonates',
    excerpt: 'How tactile physics-based feedback in typography transforms a passive reader into an engaged, smiling explorer.',
    date: 'Sep 2026',
    readTime: '4 min read',
    tag: 'UI/UX Design'
  },
  {
    id: 3,
    title: 'Headless WordPress with Next.js in Production',
    excerpt: 'Best practices for cache invalidation, custom post types with ACF Pro, and lightning-fast edge rendering.',
    date: 'Aug 2026',
    readTime: '8 min read',
    tag: 'Architecture'
  }
];

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="relative min-h-screen w-full py-20 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#1d1d1d] flex flex-col justify-center border-t border-[#252525]/50"
    >
      <div className="font-cursive text-[#515152] text-sm md:text-base pointer-events-none select-none mb-4">
        &lt;section id="blog"&gt;
      </div>

      <div className="space-y-6">
        <div className="font-cursive text-[#515152] text-sm pointer-events-none select-none">
          &lt;h2&gt;
        </div>

        <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          <RubberBandWord text="Articles & Insights" />
        </h2>

        <div className="font-cursive text-[#515152] text-sm pointer-events-none select-none">
          &lt;/h2&gt;
        </div>

        <p className="text-[#a0a0a0] text-sm sm:text-base max-w-2xl font-light">
          Thoughts on frontend craft, canvas mathematics, micro-interactions, and engineering high-fidelity web applications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              className="p-6 rounded-xl bg-[#181818] border border-[#2b2b2b] hover:border-[#08fdd8]/50 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8d8d8d]">
                  <span className="text-[#fd2155] font-semibold">{article.tag}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-white text-lg font-bold group-hover:text-[#08fdd8] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-[#888888] text-xs font-light leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#252525] flex items-center justify-between">
                <span className="text-[11px] text-[#666666] font-mono flex items-center gap-1">
                  <Calendar size={12} />
                  {article.date}
                </span>

                <button
                  onClick={() => sound.playButtonHover()}
                  className="text-xs font-mono text-[#08fdd8] flex items-center gap-1 group-hover:gap-2 transition-all font-semibold"
                >
                  Read Post <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="font-cursive text-[#515152] text-sm md:text-base pointer-events-none select-none mt-6">
        &lt;/section&gt;
      </div>
    </section>
  );
}
