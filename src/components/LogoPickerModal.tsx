import React, { useRef } from 'react';
import { X, Upload, Check, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { useLogo, PRESET_LOGOS } from '../context/LogoContext';

export const LogoPickerModal: React.FC = () => {
  const {
    activeLogoUrl,
    currentLogoId,
    selectPresetLogo,
    uploadCustomLogo,
    resetDefaultLogo,
    isLogoPickerOpen,
    setIsLogoPickerOpen,
  } = useLogo();

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isLogoPickerOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadCustomLogo(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-emerald-900/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ImageIcon className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold block">
                Academy Branding
              </span>
              <h2 className="text-lg font-bold font-cinzel">Choose or Upload Logo</h2>
            </div>
          </div>

          <button
            onClick={() => setIsLogoPickerOpen(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Preset Options */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
              Available Logo Designs
            </label>
            <div className="grid grid-cols-2 gap-3">
              {PRESET_LOGOS.map((logo) => {
                const isSelected = currentLogoId === logo.id;
                return (
                  <button
                    key={logo.id}
                    onClick={() => selectPresetLogo(logo.id)}
                    className={`relative p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between group overflow-hidden ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/30 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                    }`}
                  >
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-2 mb-2 shadow-2xs border border-amber-300 overflow-hidden">
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {logo.name}
                    </span>
                    {isSelected && (
                      <div className="absolute top-2 right-2 p-1 bg-emerald-600 text-white rounded-full shadow-xs">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upload Custom Logo File */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Or Upload Any Custom Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Upload className="w-4 h-4 text-emerald-700" />
              <span>Upload Image from Device</span>
            </button>
          </div>

          {/* Reset Action */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              onClick={resetDefaultLogo}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Default</span>
            </button>

            <button
              onClick={() => setIsLogoPickerOpen(false)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
