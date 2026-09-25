import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  MessageCircle,
  Phone,
  Mail,
  ShieldCheck,
  Users,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';
import { ACADEMY_INFO, openWhatsAppDirect, WhatsAppFormData } from '../utils/whatsapp';
import { AcademyLogo } from '../components/AcademyLogo';
import { useBackground } from '../context/BackgroundContext';

interface Props {
  onOpenWhatsAppModal: (course?: string) => void;
  onNavigateCourses: () => void;
  onNavigateWhyChooseUs: () => void;
  onNavigateContact: () => void;
}

export const HomePage: React.FC<Props> = ({
  onOpenWhatsAppModal,
  onNavigateCourses,
  onNavigateWhyChooseUs,
  onNavigateContact,
}) => {
  const { setIsBgModalOpen } = useBackground();
  const [homeForm, setHomeForm] = useState<WhatsAppFormData>({
    name: '',
    phone: '',
    course: 'Quran with Tajweed',
    studentType: 'Child (Boy / Girl)',
    timing: 'Flexible (Any Available Time)',
    country: '',
    notes: '',
  });

  const handleHomeFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsAppDirect(homeForm);
  };

  const featuredCourses = [
    {
      title: 'Noorani Qaida',
      desc: 'Foundation course for beginners and young children. Master Arabic alphabet pronunciation with proper Makharij.',
      duration: '1-3 Months',
      level: 'Beginner',
    },
    {
      title: 'Quran with Tajweed',
      desc: 'Learn fluent recitation of the Holy Quran following authentic Tajweed rules with qualified Quran teachers.',
      duration: '6-12 Months',
      level: 'All Levels',
    },
    {
      title: 'Hifz-ul-Quran',
      desc: 'Full or selective Quran memorization under guidance of experienced Huffaz with daily systematic revision.',
      duration: 'Flexible',
      level: 'Intermediate/Advanced',
    },
    {
      title: 'Female Quran Tutors',
      desc: 'Qualified and certified female teachers available for sisters and girls in a completely comfortable environment.',
      duration: 'Ongoing',
      level: 'Sisters & Girls',
    },
  ];

  return (
    <div className="relative z-10 space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-2xs backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  1-on-1 Personalized Classes
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsBgModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                title="Click to select or upload a new background image"
              >
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Change / Upload Background</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3.5">
                <AcademyLogo className="w-16 h-16 shadow-lg" />
                <div>
                  <span className="block text-xs uppercase tracking-widest text-emerald-700 font-bold">
                    Online Learning Academy
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-extrabold font-cinzel text-slate-900 tracking-tight leading-tight">
                    {ACADEMY_INFO.name}
                  </h1>
                </div>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl bg-white/80 p-5 rounded-2xl border border-emerald-100 backdrop-blur-xs shadow-2xs">
              Learn the Holy Quran from home with certified male and female tutors. 
              Personalized live interactive classes for children, adults, and sisters worldwide.
            </p>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white/90 border border-emerald-100 p-3.5 rounded-2xl backdrop-blur-xs shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                <h4 className="font-bold text-xs text-slate-800">1-on-1 Classes</h4>
                <p className="text-[11px] text-slate-500">Dedicated attention</p>
              </div>
              <div className="bg-white/90 border border-emerald-100 p-3.5 rounded-2xl backdrop-blur-xs shadow-2xs">
                <Users className="w-5 h-5 text-emerald-600 mb-1" />
                <h4 className="font-bold text-xs text-slate-800">Female Tutors</h4>
                <p className="text-[11px] text-slate-500">For sisters & daughters</p>
              </div>
              <div className="bg-white/90 border border-emerald-100 p-3.5 rounded-2xl backdrop-blur-xs shadow-2xs col-span-2 sm:col-span-1">
                <Clock className="w-5 h-5 text-emerald-600 mb-1" />
                <h4 className="font-bold text-xs text-slate-800">Flexible Timings</h4>
                <p className="text-[11px] text-slate-500">Global schedules</p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenWhatsAppModal()}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-emerald-600/30 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Start on WhatsApp</span>
              </button>

              <button
                onClick={onNavigateCourses}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-emerald-50/50 text-slate-800 font-semibold text-sm border border-emerald-200 shadow-2xs transition-colors"
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Explore Courses</span>
              </button>
            </div>

            {/* Direct Contact Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <a
                href={`tel:${ACADEMY_INFO.phone}`}
                className="flex items-center gap-1.5 font-bold text-slate-800 hover:text-emerald-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call: {ACADEMY_INFO.phone}</span>
              </a>
              <span className="text-slate-300">·</span>
              <a
                href={`mailto:${ACADEMY_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>{ACADEMY_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Right Hero: WhatsApp Admission Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 rounded-3xl shadow-xl border border-emerald-200/80 p-6 sm:p-7 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-emerald-600" />

              <div className="mb-5">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md mb-1 border border-emerald-200">
                  Direct Admission Form
                </span>
                <h3 className="text-xl font-bold font-cinzel text-slate-900">
                  Register via WhatsApp
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill details and open direct conversation with <strong>{ACADEMY_INFO.phone}</strong>.
                </p>
              </div>

              <form onSubmit={handleHomeFormSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student / Parent Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={homeForm.name}
                    onChange={(e) => setHomeForm({ ...homeForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 03001234567"
                    value={homeForm.phone}
                    onChange={(e) => setHomeForm({ ...homeForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Course
                    </label>
                    <select
                      value={homeForm.course}
                      onChange={(e) => setHomeForm({ ...homeForm, course: e.target.value })}
                      className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                    >
                      <option value="Noorani Qaida">Noorani Qaida</option>
                      <option value="Quran with Tajweed">Quran with Tajweed</option>
                      <option value="Hifz-ul-Quran">Hifz-ul-Quran</option>
                      <option value="Quran Translation & Tafseer">Translation & Tafseer</option>
                      <option value="Islamic Studies for Kids">Kids Islamic Studies</option>
                      <option value="Female Quran Tutor">Female Tutor Class</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Student Category
                    </label>
                    <select
                      value={homeForm.studentType}
                      onChange={(e) => setHomeForm({ ...homeForm, studentType: e.target.value })}
                      className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                    >
                      <option value="Child (Boy / Girl)">Child (Kid)</option>
                      <option value="Adult Male">Adult Brother</option>
                      <option value="Sister (Female Tutor)">Sister (Female Tutor)</option>
                      <option value="Family Batch">Family Batch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Country
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Islamabad, London, New York"
                    value={homeForm.country}
                    onChange={(e) => setHomeForm({ ...homeForm, country: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send to WhatsApp ({ACADEMY_INFO.phone})</span>
                </button>
              </form>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Teachers
                </span>
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Flexible Hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
            Curriculum
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-slate-900 mt-1">
            Featured Online Courses
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Structured step-by-step Quranic learning suitable for all age groups
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((c, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-2xl p-5 border border-emerald-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between backdrop-blur-xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {c.level}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-cinzel text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {c.duration}
                </span>
                <button
                  onClick={() => onOpenWhatsAppModal(c.title)}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                  <span>Enroll</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={onNavigateCourses}
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-5 py-2.5 rounded-xl border border-emerald-200 transition-colors"
          >
            <span>Explore All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Academy Highlights Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                Why Choose {ACADEMY_INFO.name}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-cinzel leading-tight">
                Quality Quran Education for You and Your Family
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                We provide individualized one-on-one sessions where students learn at their own pace. 
                Our certified teachers focus on exact Tajweed rules, correct pronunciation, and moral values.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1-on-1 Classes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Certified Female Tutors</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Flexible Timings</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => onOpenWhatsAppModal()}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Start on WhatsApp</span>
              </button>
              <button
                onClick={onNavigateWhyChooseUs}
                className="w-full py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Quick Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 border border-emerald-100 rounded-3xl p-6 sm:p-8 backdrop-blur-xs shadow-xs text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="text-lg font-bold font-cinzel text-slate-900">
              Have Questions? We Are Available 24/7
            </h3>
            <p className="text-xs text-slate-600">
              Contact Quran Education Academy for schedules, fees, and admission details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${ACADEMY_INFO.phone}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors shadow-2xs"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Call: {ACADEMY_INFO.phone}</span>
            </a>

            <button
              onClick={() => openWhatsAppDirect()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp: {ACADEMY_INFO.phone}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
