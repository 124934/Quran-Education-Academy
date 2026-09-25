import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MessageCircle,
  Menu,
  X,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { ACADEMY_INFO, openWhatsAppDirect } from '../utils/whatsapp';
import { AcademyLogo } from './AcademyLogo';
import { useLogo } from '../context/LogoContext';

export type PageId = 'home' | 'courses' | 'why-choose-us' | 'contact';

interface Props {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenWhatsAppModal: (course?: string) => void;
  isPurePatternMode: boolean;
  onTogglePurePattern: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentPage,
  onNavigate,
  onOpenWhatsAppModal,
  isPurePatternMode,
  onTogglePurePattern,
}) => {
  const { setIsLogoPickerOpen } = useLogo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // English-only navigation links
  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'why-choose-us', label: 'Why Choose Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Contact Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-emerald-900/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-300">
              Admissions Open · Online 1-on-1 Quran Classes
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${ACADEMY_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
              title="Call Academy"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold">{ACADEMY_INFO.phone}</span>
            </a>

            <a
              href={`mailto:${ACADEMY_INFO.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
              title="Email Academy"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span className="truncate max-w-[220px]">{ACADEMY_INFO.email}</span>
            </a>

            <button
              onClick={() => openWhatsAppDirect()}
              className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo in Circular Format (NO camera icon) & Academy Name */}
            <div className="flex items-center gap-3">
              <AcademyLogo className="w-13 h-13" clickable={true} />

              <button
                onClick={() => handleNavClick('home')}
                className="text-left group"
              >
                <span className="block text-[11px] uppercase tracking-widest text-emerald-700 font-bold">
                  Online Quran Academy
                </span>
                <span className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900 tracking-tight leading-none mt-0.5 group-hover:text-emerald-800 transition-colors">
                  {ACADEMY_INFO.name}
                </span>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-emerald-800 bg-emerald-50 border border-emerald-200 shadow-xs'
                        : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Actions: Pattern Toggle + WhatsApp Admission CTA */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Pattern pure view button */}
              <button
                onClick={onTogglePurePattern}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                  isPurePatternMode
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
                title="View Pure Islamic Pattern Design"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isPurePatternMode ? 'Exit Pattern View' : 'Pattern Pure View'}</span>
              </button>

              {/* Instant WhatsApp Form Button */}
              <button
                onClick={() => onOpenWhatsAppModal()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-emerald-600/30 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Admission</span>
              </button>
            </div>

            {/* Mobile Menu & Quick Buttons */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => onOpenWhatsAppModal()}
                className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-xs"
                title="Open WhatsApp Form"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-left font-semibold text-sm transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsLogoPickerOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300"
              >
                <span>Change / Upload Academy Logo</span>
              </button>

              <button
                onClick={() => {
                  onTogglePurePattern();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm"
              >
                <Eye className="w-4 h-4" />
                <span>{isPurePatternMode ? 'Exit Pure Pattern View' : 'Pattern Pure View'}</span>
              </button>

              <button
                onClick={() => {
                  onOpenWhatsAppModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Apply via WhatsApp ({ACADEMY_INFO.phone})</span>
              </button>

              <div className="text-center text-xs text-slate-500 pt-2">
                <span>Direct Contact: </span>
                <a href={`tel:${ACADEMY_INFO.phone}`} className="font-bold text-slate-800">
                  {ACADEMY_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
