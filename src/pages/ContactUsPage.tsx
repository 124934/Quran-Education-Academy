import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  User,
  BookOpen,
  Copy,
  Check,
} from 'lucide-react';
import { ACADEMY_INFO, openWhatsAppDirect, WhatsAppFormData } from '../utils/whatsapp';

interface Props {
  onOpenWhatsAppModal: () => void;
}

export const ContactUsPage: React.FC<Props> = ({ onOpenWhatsAppModal }) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [formData, setFormData] = useState<WhatsAppFormData>({
    name: '',
    phone: '',
    course: 'Quran Reading with Tajweed',
    studentType: 'Child (Boy / Girl)',
    timing: 'Flexible (Any Available Time)',
    country: '',
    notes: '',
  });

  const handleCopy = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsAppDirect(formData);
  };

  const previewText = `Hello! I want to enroll in ${ACADEMY_INFO.name}.\nName: ${
    formData.name || '[Your Name]'
  }\nContact: ${formData.phone || '[Your Phone]'}\nCourse: ${formData.course}\nCategory: ${
    formData.studentType
  }\nTiming: ${formData.timing}`;

  return (
    <div className="relative z-10 space-y-12 sm:space-y-16 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>Get in Touch with Quran Education Academy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-cinzel text-slate-900">
          Contact Us
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          We are ready to assist you. Send us a message on WhatsApp or call us directly 
          for admissions and class timings.
        </p>
      </div>

      {/* 3 Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phone Card */}
        <div className="bg-white/95 rounded-3xl p-6 border border-emerald-100 shadow-xs backdrop-blur-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Direct Phone Call
            </span>
            <h3 className="text-xl font-bold font-cinzel text-slate-900 mt-1">
              {ACADEMY_INFO.phone}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Call us directly for instant inquiries, fee structures, and tutor allocation.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
            <a
              href={`tel:${ACADEMY_INFO.phone}`}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Now</span>
            </a>
            <button
              onClick={() => handleCopy(ACADEMY_INFO.phone, 'phone')}
              className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors"
              title="Copy Phone Number"
            >
              {copiedPhone ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* WhatsApp Card */}
        <div className="bg-white/95 rounded-3xl p-6 border border-emerald-400 shadow-md backdrop-blur-xs flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase rounded-bl-xl">
            Instant Support
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 fill-emerald-600" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Official WhatsApp
            </span>
            <h3 className="text-xl font-bold font-cinzel text-emerald-950 mt-1">
              {ACADEMY_INFO.phone}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Fast response 24/7. Send a message to start classes today.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => openWhatsAppDirect()}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Open in WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Email Card */}
        <div className="bg-white/95 rounded-3xl p-6 border border-emerald-100 shadow-xs backdrop-blur-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Official Email
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1 break-all">
              {ACADEMY_INFO.email}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Send inquiries, questions, or official correspondence.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
            <a
              href={`mailto:${ACADEMY_INFO.email}`}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>Send Email</span>
            </a>
            <button
              onClick={() => handleCopy(ACADEMY_INFO.email, 'email')}
              className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors"
              title="Copy Email Address"
            >
              {copiedEmail ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main WhatsApp Admission Form Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white/95 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 shadow-xs backdrop-blur-xs">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              WhatsApp Registration Form
            </span>
            <h2 className="text-2xl font-bold font-cinzel text-slate-900 mt-1">
              Send Admission Request to WhatsApp
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Submitting opens WhatsApp with your chosen course and details ready to send.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student / Parent Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 03001234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Selected Course
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                  >
                    <option value="Noorani Qaida for Beginners">Noorani Qaida for Beginners</option>
                    <option value="Quran Reading with Tajweed">Quran Reading with Tajweed</option>
                    <option value="Hifz-ul-Quran (Memorization)">Hifz-ul-Quran (Memorization)</option>
                    <option value="Quran Translation & Tafseer">Translation & Tafseer</option>
                    <option value="Kids Islamic Studies & Duas">Kids Islamic Studies & Duas</option>
                    <option value="Female Quran Tutor Classes">Female Quran Tutor Classes</option>
                    <option value="General Consultation">General Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Category
                </label>
                <select
                  value={formData.studentType}
                  onChange={(e) => setFormData({ ...formData, studentType: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                >
                  <option value="Child (Boy / Girl)">Child (Kid)</option>
                  <option value="Adult Male">Adult Brother</option>
                  <option value="Sister (Female Tutor)">Sister (Requires Female Tutor)</option>
                  <option value="Family Batch">Family Batch</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Class Timing
                </label>
                <select
                  value={formData.timing}
                  onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                >
                  <option value="Flexible (Any Available Time)">Flexible</option>
                  <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                  <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                  <option value="Night (8 PM - 12 AM)">Night (8 PM - 12 AM)</option>
                  <option value="Weekend Only">Weekend Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City / Country (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Islamabad, London, Dubai"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Special Requests / Prior Knowledge
              </label>
              <textarea
                rows={2}
                placeholder="Mention any prior Quran reading background or special requirements..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Open in WhatsApp & Submit ({ACADEMY_INFO.phone})</span>
            </button>
          </form>
        </div>

        {/* Right Info Box & Preview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Message Preview */}
          <div className="bg-slate-900 text-slate-200 rounded-3xl p-6 shadow-md border border-slate-800">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
              <span className="font-mono">WhatsApp Message Preview:</span>
              <span className="text-emerald-400 font-semibold">To: {ACADEMY_INFO.phone}</span>
            </div>
            <div className="bg-slate-800/80 rounded-xl p-3.5 font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed border border-slate-700/80">
              {previewText}
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              This message will be automatically filled into WhatsApp when you click submit.
            </p>
          </div>

          {/* Academy Information */}
          <div className="bg-white/95 rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-4">
            <h4 className="font-bold font-cinzel text-slate-900 text-sm">
              Academy Details
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800 block">Class Availability:</span>
                  <span>24 Hours a day, 7 days a week</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800 block">WhatsApp & Phone:</span>
                  <span>{ACADEMY_INFO.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800 block">Email Address:</span>
                  <span>{ACADEMY_INFO.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800 block">Learning Platform:</span>
                  <span>Live 1-on-1 via Zoom & Skype</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
