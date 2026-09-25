import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  MessageCircle,
  Calendar,
} from 'lucide-react';
import { ACADEMY_INFO, openWhatsAppDirect } from '../utils/whatsapp';

interface Props {
  onOpenWhatsAppModal: (course?: string) => void;
}

interface CourseItem {
  id: string;
  title: string;
  category: 'kids' | 'adults' | 'sisters' | 'all';
  tag: string;
  duration: string;
  classTime: string;
  desc: string;
  syllabus: string[];
}

export const CoursesPage: React.FC<Props> = ({ onOpenWhatsAppModal }) => {
  const [filter, setFilter] = useState<'all' | 'kids' | 'adults' | 'sisters'>('all');

  const courses: CourseItem[] = [
    {
      id: 'qaida',
      title: 'Noorani Qaida for Beginners',
      category: 'kids',
      tag: 'Foundation Course',
      duration: '1 - 3 Months',
      classTime: '30 mins / class (3-5 days/week)',
      desc: 'The essential foundation for children and beginner adults to learn correct Arabic pronunciation, letter recognition, and articulation points (Makharij).',
      syllabus: [
        'Arabic Alphabet recognition and proper phonetics',
        'Compound letters (Murakkabat)',
        'Vowel movements: Fatha, Kasra, Damma (Harakat)',
        'Tanween (Double Vowels) and Sukoon (Jazm)',
        'Rules of Tashdeed and Madd fundamentals',
      ],
    },
    {
      id: 'tajweed',
      title: 'Quran Reading with Tajweed',
      category: 'all',
      tag: 'Most Popular',
      duration: '6 - 12 Months',
      classTime: '30 mins / class (3-5 days/week)',
      desc: 'Learn to recite the Holy Quran smoothly, fluently, and correctly without phonetic mistakes according to authentic Hafs an Asim Tajweed principles.',
      syllabus: [
        'Makharij (Points of articulation)',
        'Rules of Noon Sakin and Tanween (Izhar, Idgham, Iqlab, Ikhfa)',
        'Rules of Meem Sakin and Qalqalah letters',
        'Heavy and Light letters (Tafkheem and Tarqeeq)',
        'Waqf (Rules of proper stopping and pausing)',
      ],
    },
    {
      id: 'hifz',
      title: 'Hifz-ul-Quran (Memorization)',
      category: 'all',
      tag: 'Spiritual Milestone',
      duration: '2 - 3 Years (Customized)',
      classTime: '45-60 mins / class (5-6 days/week)',
      desc: 'Complete or selective Surahs Quran memorization under the guidance of certified Huffaz with daily systematic revision and evaluation.',
      syllabus: [
        'Daily new lesson memorization (Sabaq)',
        'Immediate recent revision (Sabqi)',
        'Long-term retention revision (Manzil)',
        'Regular retention test by senior Qari',
        'Special techniques for effortless retention',
      ],
    },
    {
      id: 'tafseer',
      title: 'Quran Translation & Tafseer',
      category: 'adults',
      tag: 'Deep Understanding',
      duration: '1 Year Module',
      classTime: '40 mins / class (3 days/week)',
      desc: 'Understand the words and divine guidance of the Holy Quran with word-by-word translation and authentic classical commentary.',
      syllabus: [
        'Word-by-word Arabic translation',
        'Grammar and contextual meaning of Arabic roots',
        'Shan-e-Nazool (Context and reasons of revelation)',
        'Life lessons, moral teachings, and practical guidance',
        'Stories of the Prophets and Quranic parables',
      ],
    },
    {
      id: 'kids-islamic',
      title: 'Kids Islamic Studies & Daily Duas',
      category: 'kids',
      tag: 'Character Building',
      duration: 'Ongoing Program',
      classTime: '30 mins / class (2-3 days/week)',
      desc: 'Comprehensive Islamic upbringing covering 6 Kalimas, method of Salah (Prayer), Wudu, daily Masnoon Duas, and Islamic manners for young minds.',
      syllabus: [
        'Step-by-step practical Salah (Prayer) and Wudu',
        'Six Kalimas with translation and meaning',
        'Essential Masnoon Duas for daily routine',
        'Basic Islamic morals, honesty, respect, and hygiene',
        'Inspiring stories from Seerat-un-Nabi',
      ],
    },
    {
      id: 'female-tutors',
      title: 'Female Quran Tutor Classes',
      category: 'sisters',
      tag: 'Sisters & Girls',
      duration: 'Flexible',
      classTime: '30 mins / class (Flexible days)',
      desc: 'Dedicated classes taught exclusively by qualified female Quran teachers for sisters, women, and young daughters in complete privacy.',
      syllabus: [
        'Strict 1-on-1 female-to-female environment',
        'Choice of Qaida, Tajweed, or Hifz courses',
        'Flexible hours according to family schedule',
        'Patient, respectful, and friendly teaching approach',
        'English and Urdu spoken teachers available',
      ],
    },
  ];

  const filteredCourses =
    filter === 'all'
      ? courses
      : courses.filter((c) => c.category === filter || c.category === 'all');

  return (
    <div className="relative z-10 space-y-12 sm:space-y-16 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header (English Only) */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Curriculum & Syllabi · {ACADEMY_INFO.name}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-cinzel text-slate-900">
          Online Quran Courses
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          All courses are conducted 1-on-1 by certified male and female teachers over Zoom or Skype.
          Flexible hours tailored to your personal schedule.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 bg-white/90 border border-emerald-200/80 rounded-2xl shadow-2xs backdrop-blur-xs gap-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              filter === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
            }`}
          >
            All Courses (6)
          </button>
          <button
            onClick={() => setFilter('kids')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              filter === 'kids'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
            }`}
          >
            For Children
          </button>
          <button
            onClick={() => setFilter('adults')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              filter === 'adults'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
            }`}
          >
            For Adults
          </button>
          <button
            onClick={() => setFilter('sisters')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              filter === 'sisters'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
            }`}
          >
            Female Tutors (Sisters)
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white/95 rounded-3xl border border-emerald-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden backdrop-blur-xs group"
          >
            <div className="p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  {course.tag}
                </span>
              </div>

              <h2 className="text-xl font-bold font-cinzel text-slate-900 group-hover:text-emerald-700 transition-colors">
                {course.title}
              </h2>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                {course.desc}
              </p>

              {/* Metadata */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Duration: <strong>{course.duration}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Classes: <strong>{course.classTime}</strong></span>
                </div>
              </div>

              {/* Syllabus points */}
              <div className="mt-5">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Curriculum Highlights:
                </span>
                <ul className="space-y-1.5">
                  {course.syllabus.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => onOpenWhatsAppModal(course.title)}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Enroll on WhatsApp</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp Help Banner */}
      <div className="bg-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-cinzel">
            Need Guidance Choosing the Right Course?
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            Our admissions team is available on WhatsApp <strong>{ACADEMY_INFO.phone}</strong> to help you.
          </p>
        </div>

        <button
          onClick={() => openWhatsAppDirect()}
          className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <MessageCircle className="w-4 h-4 text-emerald-700 fill-emerald-700" />
          <span>Ask on WhatsApp ({ACADEMY_INFO.phone})</span>
        </button>
      </div>
    </div>
  );
};
