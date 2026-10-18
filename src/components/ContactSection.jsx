import React, { useState } from 'react';
import RubberBandWord from './RubberBandText';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Mail, MapPin, Send, CheckCircle2, Phone, MessageSquare, FileText } from 'lucide-react';

const GithubIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45 1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
  </svg>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    sound.playButtonClick();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sound.playSuccess();

      // Celebrate with neon confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#08fdd8', '#fd2155', '#ffffff']
      });
    }, 800);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#1d1d1d] flex flex-col justify-center border-t border-[#262626]"
    >
      <div className="font-cursive text-[#606062] text-lg sm:text-xl md:text-2xl pointer-events-none select-none mb-6 font-medium">
        &lt;section id="contact"&gt;
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Contact Form (Enlarged) */}
        <div className="lg:col-span-7 space-y-7">
          <div className="font-cursive text-[#606062] text-lg sm:text-xl pointer-events-none select-none font-medium">
            &lt;h2&gt;
          </div>

          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
            <RubberBandWord text="Contact me" />
          </h2>

          <div className="font-cursive text-[#606062] text-lg sm:text-xl pointer-events-none select-none font-medium">
            &lt;/h2&gt;
          </div>

          <div className="font-cursive text-[#606062] text-base pointer-events-none select-none">
            &lt;p&gt;
          </div>
          <p className="text-[#cccccc] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
            I am actively open to engineering internships, technical collaborations, and full-stack software development projects. Feel free to contact me directly via phone, WhatsApp, or email below!
          </p>
          <div className="font-cursive text-[#606062] text-base pointer-events-none select-none">
            &lt;/p&gt;
          </div>

          {/* Form */}
          {submitted ? (
            <div className="p-8 sm:p-10 rounded-2xl bg-[#181818] border border-[#08fdd8]/60 text-center space-y-4 animate-in zoom-in-95 shadow-2xl">
              <CheckCircle2 size={56} className="text-[#08fdd8] mx-auto animate-bounce" />
              <h3 className="text-2xl font-extrabold text-white">Message Dispatched!</h3>
              <p className="text-base text-[#aaaaaa]">
                Thank you for getting in touch, Aman will review your note and reply promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="text-sm font-mono text-[#08fdd8] underline uppercase tracking-wider font-semibold cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#262626]/80 border-b-2 border-transparent focus:border-[#08fdd8] px-5 py-4 text-white text-base outline-none transition-colors placeholder-[#777777] rounded-t-lg"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#262626]/80 border-b-2 border-transparent focus:border-[#08fdd8] px-5 py-4 text-white text-base outline-none transition-colors placeholder-[#777777] rounded-t-lg"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Subject / Opportunity"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#262626]/80 border-b-2 border-transparent focus:border-[#08fdd8] px-5 py-4 text-white text-base outline-none transition-colors placeholder-[#777777] rounded-t-lg"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Your Message..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#262626]/80 border-b-2 border-transparent focus:border-[#08fdd8] px-5 py-4 text-white text-base outline-none transition-colors placeholder-[#777777] resize-none rounded-t-lg"
                />
              </div>

              {/* Submit Button (Enlarged) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => sound.playButtonHover()}
                  className="group relative inline-flex items-center justify-center px-12 py-4.5 border-2 border-[#08fdd8] text-[#08fdd8] text-sm sm:text-base font-mono tracking-[4px] uppercase bg-transparent overflow-hidden transition-all duration-300 hover:text-[#1d1d1d] hover:bg-[#08fdd8] hover:shadow-[0_0_30px_rgba(8,253,216,0.7)] active:scale-95 cursor-pointer disabled:opacity-50 font-bold"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    {isSubmitting ? 'Transmitting...' : 'Send Message!'}
                    <Send size={16} className="group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Aman Sharma's Exact Information Card (Enlarged) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-[#181818] border border-[#2d2d2d] p-7 sm:p-9 space-y-6 relative overflow-hidden shadow-2xl">
            {/* Glowing corner aura */}
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#fd2155]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[#08fdd8]/20 blur-3xl pointer-events-none" />

            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08fdd8]/10 text-[#08fdd8] border border-[#08fdd8]/30 text-xs font-mono font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#08fdd8] animate-ping" />
                Available for Engineering Opportunities
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white pt-2">
                Aman Sharma
              </h3>
              <p className="text-[#a0a0a0] text-sm font-mono">
                B.Tech CSE &bull; Full-Stack Software Developer
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Phone */}
              <div className="flex items-center gap-3.5 text-base text-[#e0e0e0]">
                <div className="w-11 h-11 rounded-xl bg-[#222222] flex items-center justify-center text-[#08fdd8] shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[11px] text-[#888888] uppercase font-mono font-semibold">Direct Phone / WhatsApp</div>
                  <a href="tel:+919690683156" className="hover:text-[#08fdd8] transition-colors font-mono font-semibold">
                    +91-9690683156
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3.5 text-base text-[#e0e0e0]">
                <div className="w-11 h-11 rounded-xl bg-[#222222] flex items-center justify-center text-[#fd2155] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[11px] text-[#888888] uppercase font-mono font-semibold">Personal Email</div>
                  <a href="mailto:codewithaman88@gmail.com" className="hover:text-[#08fdd8] transition-colors font-mono font-semibold">
                    codewithaman88@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3.5 text-base text-[#e0e0e0]">
                <div className="w-11 h-11 rounded-xl bg-[#222222] flex items-center justify-center text-[#08fdd8] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[11px] text-[#888888] uppercase font-mono font-semibold">Locations</div>
                  <span className="font-mono text-sm sm:text-base">Greater Noida &amp; Lucknow, UP, India</span>
                </div>
              </div>
            </div>

            {/* Resume Download Banner */}
            <div className="p-4 rounded-xl bg-[#222222] border border-[#333333] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-[#fd2155]" />
                <div>
                  <div className="text-xs font-mono text-white font-bold">Aman-Sharma-Resume.pdf</div>
                  <div className="text-[10px] text-[#888888]">Updated October 2026</div>
                </div>
              </div>
              <a
                href="./Aman-Sharma-Resume.pdf"
                download="Aman-Sharma-Resume.pdf"
                className="px-3.5 py-1.5 rounded bg-[#08fdd8] text-[#181818] font-bold text-xs font-mono hover:bg-[#06deb8] transition-colors"
              >
                Download
              </a>
            </div>

            {/* Radar Coordinates Box */}
            <div className="pt-2">
              <div className="h-32 rounded-xl bg-[#111111] border border-[#262626] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#222222_1px,transparent_1px),linear-gradient(to_bottom,#222222_1px,transparent_1px)] bg-[size:16px_16px] opacity-50" />
                <div className="w-14 h-14 rounded-full border border-[#08fdd8] animate-ping opacity-35" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#08fdd8] shadow-[0_0_14px_#08fdd8] z-10" />
                <span className="absolute bottom-2.5 right-3 text-[10px] font-mono text-[#888888] font-medium">
                  GL Bajaj, Greater Noida (28.4744° N, 77.5040° E)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code watermark: closing body and html tags (Enlarged) */}
      <div className="font-cursive text-[#606062] text-lg sm:text-xl md:text-2xl pointer-events-none select-none mt-20 font-medium">
        <div>&lt;/section&gt;</div>
        <div className="pl-6">&lt;/body&gt;</div>
        <div>&lt;/html&gt;</div>
      </div>
    </section>
  );
}
