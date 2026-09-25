import React, { useState } from 'react';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { ACADEMY_INFO, openWhatsAppDirect } from '../utils/whatsapp';

interface Props {
  onOpenModal: () => void;
}

export const FloatingWhatsApp: React.FC<Props> = ({ onOpenModal }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip Pill */}
      {hovered && (
        <div className="hidden sm:flex items-center gap-2 bg-slate-900 text-white text-xs py-2 px-3.5 rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-right-2 duration-150">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Chat with us on WhatsApp: <strong>{ACADEMY_INFO.phone}</strong></span>
        </div>
      )}

      {/* Main Floating WhatsApp Bubble */}
      <button
        onClick={onOpenModal}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative group p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-2xl shadow-emerald-600/40 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-300"
        title="Open WhatsApp Admission Form"
        aria-label="Open WhatsApp Admission Form"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white"></span>
        </span>

        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
      </button>
    </div>
  );
};
