import React, { useState, useEffect } from 'react';
import {
  X,
  MessageCircle,
  Phone,
  Mail,
  Send,
  User,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { ACADEMY_INFO, openWhatsAppDirect, WhatsAppFormData } from '../utils/whatsapp';
import { AcademyLogo } from './AcademyLogo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: string;
}

const COURSES = [
  'Noorani Qaida for Beginners',
  'Quran Reading with Tajweed',
  'Hifz-ul-Quran (Memorization)',
  'Quran Translation & Tafseer',
  'Kids Islamic Studies & Daily Duas',
  'Female Quran Tutor Special Classes',
  'General Inquiry & Consultation',
];

const STUDENT_TYPES = [
  'Child (Boy / Girl)',
  'Adult Male (Brother)',
  'Sister / Female (Requires Female Tutor)',
  'Multiple Family Members',
];

const TIMINGS = [
  'Flexible (Any Available Time)',
  'Morning Classes',
  'Afternoon Classes',
  'Evening Classes',
  'Night Classes',
  'Weekend Only',
];

export const WhatsAppModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialCourse,
}) => {
  const [formData, setFormData] = useState<WhatsAppFormData>({
    name: '',
    phone: '',
    course: initialCourse || COURSES[0],
    studentType: STUDENT_TYPES[0],
    timing: TIMINGS[0],
    country: '',
    notes: '',
  });

  useEffect(() => {
    if (initialCourse) {
      setFormData((prev) => ({ ...prev, course: initialCourse }));
    }
  }, [initialCourse]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsAppDirect(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-900/10 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <AcademyLogo className="w-12 h-12" />
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-200 font-bold block">
                Instant WhatsApp Admission
              </span>
              <h2 className="text-xl font-bold font-cinzel leading-tight">
                {ACADEMY_INFO.name}
              </h2>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                WhatsApp: <span className="font-semibold text-white">{ACADEMY_INFO.phone}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span>
              Fill in your details below to start a direct WhatsApp chat with our admission team.
            </span>
          </div>

          {/* Student/Parent Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student or Parent Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="e.g. Muhammad Ali"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>
          </div>

          {/* WhatsApp / Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone / WhatsApp Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                placeholder="e.g. 03001234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Desired Course <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <select
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 appearance-none"
              >
                {COURSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Category & Timing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Category
              </label>
              <select
                value={formData.studentType}
                onChange={(e) => setFormData({ ...formData, studentType: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              >
                {STUDENT_TYPES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Timing
              </label>
              <select
                value={formData.timing}
                onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              >
                {TIMINGS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* City / Country */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              City / Country (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Islamabad, London, New York"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Additional Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Prefer female teacher, weekend classes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg hover:shadow-emerald-600/30 transition-all active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>Send & Open in WhatsApp ({ACADEMY_INFO.phone})</span>
            </button>
          </div>

          {/* Alternative contacts */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-600">
            <a
              href={`tel:${ACADEMY_INFO.phone}`}
              className="flex items-center gap-1 hover:text-emerald-700 font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call: {ACADEMY_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${ACADEMY_INFO.email}`}
              className="flex items-center gap-1 hover:text-emerald-700"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>Email Academy</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
