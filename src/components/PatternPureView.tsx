import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  MessageCircle,
  Phone,
  Mail,
  ArrowLeft,
} from 'lucide-react';
import { ACADEMY_INFO } from '../utils/whatsapp';
import { AcademyLogo } from './AcademyLogo';
import { useBackground } from '../context/BackgroundContext';

interface Props {
  onExit: () => void;
  onOpenWhatsAppModal: () => void;
}

export const PatternPureView: React.FC<Props> = ({
  onExit,
  onOpenWhatsAppModal,
}) => {
  const { activeBgUrl, bgOpacity, isCover } = useBackground();
  const [scale, setScale] = useState<number>(360);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#faf9f6] flex flex-col justify-between select-none">
      {/* Background layer */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300"
        style={{
          backgroundImage: `url(${activeBgUrl})`,
          backgroundRepeat: isCover ? 'no-repeat' : 'repeat',
          backgroundSize: isCover ? 'cover' : `${scale}px auto`,
          backgroundPosition: 'center',
          opacity: bgOpacity,
        }}
      />

      {/* Floating Top Bar */}
      <header className="relative z-20 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3 bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Academy Pages</span>
          </button>

          <div className="flex items-center gap-2.5">
            <AcademyLogo className="w-10 h-10" />
            <div>
              <h1 className="font-cinzel font-bold text-slate-900 text-sm sm:text-base leading-none">
                {ACADEMY_INFO.name}
              </h1>
              <p className="text-[11px] text-emerald-700 font-semibold">
                Pure Islamic Geometric Design View
              </p>
            </div>
          </div>
        </div>

        {/* Zoom & WhatsApp Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center bg-white border border-slate-300 rounded-xl p-1 gap-1 text-xs">
            <button
              onClick={() => setScale((s) => Math.max(180, s - 60))}
              className="p-1 hover:bg-slate-100 rounded text-slate-700"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="px-1 text-[11px] font-mono text-slate-500">{scale}px</span>
            <button
              onClick={() => setScale((s) => Math.min(600, s + 60))}
              className="p-1 hover:bg-slate-100 rounded text-slate-700"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenWhatsAppModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp ({ACADEMY_INFO.phone})</span>
          </button>
        </div>
      </header>

      {/* Center Subtle Box */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-lg text-slate-800">
          <div className="flex justify-center mb-3">
            <AcademyLogo className="w-16 h-16 shadow-md" />
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {ACADEMY_INFO.name}
          </h2>
          <p className="text-xs text-slate-600 mt-1.5">
            Islamic Geometric Wallpaper Theme
          </p>

          <div className="mt-6 pt-4 border-t border-slate-200/80 flex flex-col gap-2">
            <button
              onClick={onOpenWhatsAppModal}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact via WhatsApp: {ACADEMY_INFO.phone}</span>
            </button>

            <button
              onClick={onExit}
              className="w-full py-2 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
            >
              Back to Pages (Home, Courses, Why Choose Us, Contact)
            </button>
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      <footer className="relative z-20 py-3 px-6 text-center text-xs text-slate-500 bg-white/80 backdrop-blur-xs border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <span>© 2026 {ACADEMY_INFO.name}. All rights reserved.</span>
        <span>Contact: <strong>{ACADEMY_INFO.phone}</strong> · {ACADEMY_INFO.email}</span>
      </footer>
    </div>
  );
};
