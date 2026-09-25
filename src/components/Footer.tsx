import React from 'react';
import {
  Phone,
  Mail,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import { ACADEMY_INFO, openWhatsAppDirect } from '../utils/whatsapp';
import { PageId } from './Navbar';
import { AcademyLogo } from './AcademyLogo';

interface Props {
  onNavigate: (page: PageId) => void;
  onOpenWhatsAppModal: (course?: string) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate, onOpenWhatsAppModal }) => {
  return (
    <footer className="relative z-10 bg-slate-950 text-slate-300 border-t border-emerald-900/40 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand Info with Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AcademyLogo className="w-12 h-12" />
              <div>
                <span className="text-base font-bold font-cinzel text-white block">
                  {ACADEMY_INFO.name}
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold block">
                  Online Quran Academy
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated online institute providing 1-on-1 personalized Quran education 
              for children, sisters, and adults worldwide.
            </p>

            <div className="pt-1">
              <span className="inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800">
                ✓ 1-on-1 Certified Teachers
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links (English only) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-cinzel">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Courses</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('why-choose-us')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Why Choose Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Contact Us</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Courses */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-cinzel">
              Featured Courses
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onOpenWhatsAppModal('Noorani Qaida')}
                  className="hover:text-white transition-colors"
                >
                  • Noorani Qaida for Kids
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenWhatsAppModal('Quran Reading with Tajweed')}
                  className="hover:text-white transition-colors"
                >
                  • Quran Reading with Tajweed
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenWhatsAppModal('Hifz-ul-Quran')}
                  className="hover:text-white transition-colors"
                >
                  • Hifz-ul-Quran (Memorization)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenWhatsAppModal('Female Quran Tutor Classes')}
                  className="hover:text-white transition-colors"
                >
                  • Female Quran Tutor (Sisters)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenWhatsAppModal('Kids Islamic Studies')}
                  className="hover:text-white transition-colors"
                >
                  • Kids Islamic Studies & Duas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-cinzel">
              Contact & Inquiries
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${ACADEMY_INFO.phone}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Call: <strong>{ACADEMY_INFO.phone}</strong></span>
              </a>

              <button
                onClick={() => openWhatsAppDirect()}
                className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors text-left"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: <strong>{ACADEMY_INFO.phone}</strong></span>
              </button>

              <a
                href={`mailto:${ACADEMY_INFO.email}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{ACADEMY_INFO.email}</span>
              </a>

              <div className="pt-2">
                <button
                  onClick={() => onOpenWhatsAppModal()}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Open WhatsApp Form</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {ACADEMY_INFO.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Contact: {ACADEMY_INFO.phone}</span>
            <span>·</span>
            <span>{ACADEMY_INFO.email}</span>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-4 pt-4 border-t border-slate-900 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-1.5">
          <span>Developed &amp; Designed by Abixion Digital Marketing</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <a
            href="https://abixion.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 decoration-emerald-500/40 hover:decoration-emerald-400 transition-all inline-flex items-center gap-1"
          >
            <span>abixion.pk</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
