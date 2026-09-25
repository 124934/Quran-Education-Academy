import React from 'react';
import {
  ShieldCheck,
  Award,
  Clock,
  Users,
  CheckCircle2,
  MessageCircle,
  FileCheck,
  Smile,
  ArrowRight,
} from 'lucide-react';
import { ACADEMY_INFO, openWhatsAppDirect } from '../utils/whatsapp';

interface Props {
  onOpenWhatsAppModal: () => void;
  onNavigateContact: () => void;
}

export const WhyChooseUsPage: React.FC<Props> = ({
  onOpenWhatsAppModal,
  onNavigateContact,
}) => {
  const pillars = [
    {
      icon: Users,
      title: '1-on-1 Individual Attention',
      desc: 'No group distractions or hurried pace. Every student receives the teacher’s undivided focus for the complete session, ensuring fast progress and personalized correction.',
    },
    {
      icon: Award,
      title: 'Certified & Verified Teachers',
      desc: 'Our faculty consists of certified Huffaz and Islamic graduates with authentic certifications (Sanad) in Tajweed and proper Quranic recitation.',
    },
    {
      icon: ShieldCheck,
      title: 'Dedicated Female Quran Tutors',
      desc: 'We provide qualified female Quran teachers for sisters, women, and young daughters in a respectful, comfortable, and private online environment.',
    },
    {
      icon: Clock,
      title: '24/7 Global Flexible Schedules',
      desc: 'Whether you live in Pakistan, the UK, USA, Canada, Australia, or the Gulf, choose time slots that fit your school, work, or family commitments perfectly.',
    },
    {
      icon: FileCheck,
      title: 'Structured Curriculum & Tracking',
      desc: 'Comprehensive step-by-step syllabus with regular assessments and parent-teacher updates so you can monitor academic and spiritual growth.',
    },
    {
      icon: Smile,
      title: 'Patient & Encouraging Approach',
      desc: 'Teachers use friendly, engaging teaching methods tailored specifically for young children and beginners to build love and reverence for the Holy Quran.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Submit WhatsApp Request',
      desc: `Send a quick message to our official WhatsApp (${ACADEMY_INFO.phone}) with your student name and preferred timing.`,
    },
    {
      step: '02',
      title: 'Schedule Your Class',
      desc: 'Coordinate with our administration team to select your ideal class timing and preferred male or female tutor.',
    },
    {
      step: '03',
      title: 'Begin Learning',
      desc: 'Join your live 1-on-1 sessions on Zoom or Skype from the comfort and safety of your home.',
    },
  ];

  return (
    <div className="relative z-10 space-y-16 sm:space-y-20 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>Our Standards & Commitment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-cinzel text-slate-900">
          Why Choose {ACADEMY_INFO.name}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          We combine authentic recitation standards with digital convenience to bring sacred 
          learning straight into your home.
        </p>
      </div>

      {/* 6 Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="bg-white/95 rounded-3xl p-6 border border-emerald-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between backdrop-blur-xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl border bg-emerald-50 border-emerald-200 text-emerald-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-cinzel text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Guaranteed Standard
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* How to Get Started - 3 Simple Steps */}
      <div className="bg-white/90 border border-emerald-100 rounded-3xl p-8 sm:p-12 shadow-xs backdrop-blur-xs">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
            Easy Admission Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-slate-900 mt-1">
            How to Get Started in 3 Simple Steps
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Simple admission process with direct WhatsApp assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white font-cinzel font-bold text-xl flex items-center justify-center shadow-md mb-4 border border-emerald-500/30">
                {s.step}
              </div>
              <h3 className="text-base font-bold font-cinzel text-slate-900 mb-2">
                {s.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenWhatsAppModal}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Apply via WhatsApp ({ACADEMY_INFO.phone})</span>
          </button>

          <button
            onClick={onNavigateContact}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-emerald-50/50 border border-emerald-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            <span>Contact Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Callout */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-1">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block">
            Admissions Open Worldwide
          </span>
          <h3 className="text-xl font-bold font-cinzel">
            Take Your Next Step in Quranic Learning
          </h3>
          <p className="text-xs text-slate-300">
            Contact us today on WhatsApp or Phone: <strong>{ACADEMY_INFO.phone}</strong>
          </p>
        </div>

        <button
          onClick={() => openWhatsAppDirect()}
          className="shrink-0 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Chat on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
