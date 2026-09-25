import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Check,
  RotateCcw,
  Image as ImageIcon,
  Sliders,
  CheckCircle2,
  Loader2,
  Sparkles,
} from 'lucide-react';
import {
  useBackground,
  BACKGROUND_PRESET_OPTIONS,
} from '../context/BackgroundContext';

export const BackgroundEditModal: React.FC = () => {
  const {
    currentBgId,
    customBgUrl,
    bgOpacity,
    bgSize,
    isCover,
    uploadCustomBg,
    applyBackgroundChanges,
    resetDefaultBg,
    isBgModalOpen,
    setIsBgModalOpen,
  } = useBackground();

  // Staged state before OK & Submit
  const [stagedId, setStagedId] = useState<string>(currentBgId);
  const [stagedCustomUrl, setStagedCustomUrl] = useState<string | null>(customBgUrl);
  const [stagedOpacity, setStagedOpacity] = useState<number>(bgOpacity);
  const [stagedSize, setStagedSize] = useState<number>(bgSize);
  const [stagedIsCover, setStagedIsCover] = useState<boolean>(isCover);

  // Flow control states
  const [isOkPressed, setIsOkPressed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync staged state whenever modal opens
  useEffect(() => {
    if (isBgModalOpen) {
      setStagedId(currentBgId);
      setStagedCustomUrl(customBgUrl);
      setStagedOpacity(bgOpacity);
      setStagedSize(bgSize);
      setStagedIsCover(isCover);
      setIsOkPressed(false);
      setIsLoading(false);
      setIsSuccess(false);
      setLoadingProgress(0);
    }
  }, [isBgModalOpen, currentBgId, customBgUrl, bgOpacity, bgSize, isCover]);

  if (!isBgModalOpen) return null;

  const handleSelectDesign = (id: string) => {
    setStagedId(id);
    setIsOkPressed(false); // require pressing OK for the newly selected design
  };

  const handleCustomFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await uploadCustomBg(file);
      setStagedCustomUrl(dataUrl);
      setStagedId('custom');
      setIsOkPressed(false);
    }
  };

  const handlePressOk = (id?: string) => {
    if (id) {
      setStagedId(id);
    }
    setIsOkPressed(true);
  };

  const handleSubmitChanges = () => {
    if (!isOkPressed) return;

    setIsLoading(true);
    setLoadingProgress(20);

    const step1 = setTimeout(() => setLoadingProgress(65), 400);
    const step2 = setTimeout(() => setLoadingProgress(90), 800);

    const finish = setTimeout(() => {
      setLoadingProgress(100);
      applyBackgroundChanges({
        bgId: stagedId,
        customUrl: stagedCustomUrl,
        opacity: stagedOpacity,
        size: stagedSize,
        isCover: stagedIsCover,
      });
      setIsLoading(false);
      setIsSuccess(true);

      // Close modal after showing success
      setTimeout(() => {
        setIsBgModalOpen(false);
      }, 700);
    }, 1200);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(finish);
    };
  };

  // Find name of currently chosen staged design
  let selectedDesignName = 'Original Light Geometric Pattern';
  if (stagedId === 'custom') {
    selectedDesignName = 'Custom Uploaded Image';
  } else {
    const found = BACKGROUND_PRESET_OPTIONS.find((p) => p.id === stagedId);
    if (found) selectedDesignName = found.name;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-900/10 flex flex-col max-h-[92vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading Overlay Animation */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin flex items-center justify-center" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-emerald-600 animate-pulse" />
              </div>
            </div>

            <h3 className="text-lg font-bold font-cinzel text-slate-900">
              Applying Background Changes
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xs">
              Updating website background design and saving your preference...
            </p>

            {/* Progress Bar */}
            <div className="w-48 bg-slate-100 rounded-full h-2 mt-4 overflow-hidden border border-slate-200">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Success Overlay */}
        {isSuccess && (
          <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold font-cinzel text-slate-900">
              Background Successfully Changed!
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Your new background is now active across all pages.
            </p>
          </div>
        )}

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ImageIcon className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold block">
                Website Background
              </span>
              <h2 className="text-lg font-bold font-cinzel">Edit Background Design</h2>
            </div>
          </div>

          <button
            onClick={() => setIsBgModalOpen(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Guide Banner */}
        <div className="bg-emerald-50/80 px-6 py-2.5 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
          <span className="font-medium">
            Step: Select a design &rarr; Click <strong>OK</strong> &rarr; Click <strong>Submit</strong>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
            Interactive
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Preset Designs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
              1. Choose Background Design
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BACKGROUND_PRESET_OPTIONS.map((item) => {
                const isSelected = stagedId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectDesign(item.id)}
                    className={`relative p-3 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer group overflow-hidden ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/30 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                    }`}
                  >
                    <div
                      className="w-full h-20 rounded-xl border border-slate-200 mb-2 relative overflow-hidden"
                      style={{
                        backgroundImage: `url(${item.url})`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '120px auto',
                      }}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 p-1 bg-emerald-600 text-white rounded-full shadow-xs">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <span className="text-xs font-bold text-slate-800 leading-tight block mb-2">
                      {item.name}
                    </span>

                    {/* OK Button for this specific item */}
                    {isSelected ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePressOk(item.id);
                        }}
                        className={`w-full py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                          isOkPressed
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white animate-pulse'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>{isOkPressed ? 'Confirmed (OK)' : 'Press OK'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectDesign(item.id);
                        }}
                        className="w-full py-1.5 px-2 rounded-xl text-[11px] font-semibold text-slate-600 hover:bg-slate-200/70 border border-slate-200 transition-colors"
                      >
                        Select
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upload Custom Image Option */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              2. Or Upload Custom Image from Device
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleCustomFileUpload}
              className="hidden"
            />

            {stagedId === 'custom' && stagedCustomUrl ? (
              <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl border border-slate-200 bg-cover bg-center shrink-0 shadow-2xs"
                    style={{ backgroundImage: `url(${stagedCustomUrl})` }}
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Custom Image Selected
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      Press OK to confirm this upload
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePressOk('custom')}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                      isOkPressed
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white animate-pulse'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>{isOkPressed ? 'Confirmed (OK)' : 'Press OK'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 hover:bg-slate-50 rounded-xl font-semibold text-slate-700 shadow-2xs"
                  >
                    Replace
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Upload className="w-4 h-4 text-emerald-700" />
                <span>Upload Background Image from Phone or PC</span>
              </button>
            )}
          </div>

          {/* Adjustments: Opacity & Style */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-700" />
              <span>3. Fine-Tune Appearance</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Opacity:</span>
                  <span className="font-mono text-emerald-800 font-bold">
                    {Math.round(stagedOpacity * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={stagedOpacity}
                  onChange={(e) => setStagedOpacity(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Pattern Zoom:</span>
                  <span className="font-mono text-emerald-800 font-bold">
                    {stagedSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min="160"
                  max="600"
                  step="20"
                  value={stagedSize}
                  onChange={(e) => setStagedSize(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-700">Display Style:</span>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => setStagedIsCover(false)}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    !stagedIsCover ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Repeating Pattern Tile
                </button>
                <button
                  type="button"
                  onClick={() => setStagedIsCover(true)}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    stagedIsCover ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Full Stretched Image
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Area with Conditional Submit Option */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          {isOkPressed ? (
            /* Submit section revealed after OK is pressed */
            <div className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center gap-2 text-xs text-emerald-900 bg-emerald-100/80 px-3 py-2 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Design confirmed: <strong>{selectedDesignName}</strong>. Click Submit below to apply changes!
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={resetDefaultBg}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitChanges}
                  className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2 transition-all active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit & Apply Background</span>
                </button>
              </div>
            </div>
          ) : (
            /* Prompt until user presses OK */
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Please select a design above and click <span className="font-bold text-emerald-700">&quot;Press OK&quot;</span> to unlock Submit.
              </div>

              <button
                type="button"
                onClick={() => handlePressOk()}
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>OK (Confirm Selection)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
