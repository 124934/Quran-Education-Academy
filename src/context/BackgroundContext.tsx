import React, { createContext, useContext, useState, useEffect } from 'react';
import originalPatternImg from '../assets/images/islamic_pattern_bg_1790357126226.jpg';
import goldPatternImg from '../assets/images/islamic_gold_pattern_1790357491898.jpg';
import emeraldPatternImg from '../assets/images/islamic_emerald_pat_1790357511933.jpg';

export interface BackgroundPresetOption {
  id: string;
  name: string;
  url: string;
  description: string;
}

export const BACKGROUND_PRESET_OPTIONS: BackgroundPresetOption[] = [
  {
    id: 'original',
    name: 'Original Light Geometric Pattern',
    url: originalPatternImg,
    description: 'The subtle light arabesque geometric pattern from the initial design.',
  },
  {
    id: 'gold',
    name: 'Royal Gold & Ivory Pattern',
    url: goldPatternImg,
    description: 'Golden Islamic arabesque symmetry on cream ivory backdrop.',
  },
  {
    id: 'emerald',
    name: 'Emerald Mosque Tile Pattern',
    url: emeraldPatternImg,
    description: 'Emerald green and gold traditional architectural mosaic.',
  },
];

export interface BackgroundApplyData {
  bgId: string;
  customUrl?: string | null;
  opacity?: number;
  size?: number;
  isCover?: boolean;
}

interface BackgroundContextType {
  activeBgUrl: string;
  currentBgId: string;
  customBgUrl: string | null;
  bgOpacity: number;
  bgSize: number;
  isCover: boolean;
  selectPresetBg: (id: string) => void;
  uploadCustomBg: (file: File) => Promise<string>;
  setBgOpacity: (opacity: number) => void;
  setBgSize: (size: number) => void;
  setIsCover: (cover: boolean) => void;
  applyBackgroundChanges: (data: BackgroundApplyData) => void;
  resetDefaultBg: () => void;
  isBgModalOpen: boolean;
  setIsBgModalOpen: (open: boolean) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

const BG_STORAGE_KEY = 'qea_background_settings_v3';

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBgId, setCurrentBgId] = useState<string>('original');
  const [customBgUrl, setCustomBgUrl] = useState<string | null>(null);
  const [bgOpacity, setBgOpacity] = useState<number>(0.8);
  const [bgSize, setBgSize] = useState<number>(360);
  const [isCover, setIsCover] = useState<boolean>(false);
  const [isBgModalOpen, setIsBgModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(BG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentBgId) setCurrentBgId(parsed.currentBgId);
        if (parsed.customBgUrl) setCustomBgUrl(parsed.customBgUrl);
        if (typeof parsed.bgOpacity === 'number') setBgOpacity(parsed.bgOpacity);
        if (typeof parsed.bgSize === 'number') setBgSize(parsed.bgSize);
        if (typeof parsed.isCover === 'boolean') setIsCover(parsed.isCover);
      }
    } catch {
      // ignore
    }
  }, []);

  const saveState = (
    id: string,
    custom: string | null,
    opacity: number,
    size: number,
    cover: boolean
  ) => {
    try {
      localStorage.setItem(
        BG_STORAGE_KEY,
        JSON.stringify({
          currentBgId: id,
          customBgUrl: custom && custom.length < 2500000 ? custom : null,
          bgOpacity: opacity,
          bgSize: size,
          isCover: cover,
        })
      );
    } catch {
      // ignore
    }
  };

  const selectPresetBg = (id: string) => {
    setCurrentBgId(id);
    saveState(id, customBgUrl, bgOpacity, bgSize, isCover);
  };

  const uploadCustomBg = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please select an image file'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve(result);
      };
      reader.onerror = () => reject(new Error('Failed to read image'));
      reader.readAsDataURL(file);
    });
  };

  const applyBackgroundChanges = (data: BackgroundApplyData) => {
    const newId = data.bgId;
    const newCustom = data.customUrl !== undefined ? data.customUrl : customBgUrl;
    const newOpacity = data.opacity !== undefined ? data.opacity : bgOpacity;
    const newSize = data.size !== undefined ? data.size : bgSize;
    const newCover = data.isCover !== undefined ? data.isCover : isCover;

    setCurrentBgId(newId);
    if (data.customUrl !== undefined) setCustomBgUrl(data.customUrl);
    if (data.opacity !== undefined) setBgOpacity(newOpacity);
    if (data.size !== undefined) setBgSize(newSize);
    if (data.isCover !== undefined) setIsCover(newCover);

    saveState(newId, newCustom, newOpacity, newSize, newCover);
  };

  const handleSetOpacity = (opacity: number) => {
    setBgOpacity(opacity);
    saveState(currentBgId, customBgUrl, opacity, bgSize, isCover);
  };

  const handleSetSize = (size: number) => {
    setBgSize(size);
    saveState(currentBgId, customBgUrl, bgOpacity, size, isCover);
  };

  const handleSetIsCover = (cover: boolean) => {
    setIsCover(cover);
    saveState(currentBgId, customBgUrl, bgOpacity, bgSize, cover);
  };

  const resetDefaultBg = () => {
    setCurrentBgId('original');
    setCustomBgUrl(null);
    setBgOpacity(0.8);
    setBgSize(360);
    setIsCover(false);
    saveState('original', null, 0.8, 360, false);
  };

  let activeBgUrl = originalPatternImg;
  if (currentBgId === 'custom' && customBgUrl) {
    activeBgUrl = customBgUrl;
  } else {
    const found = BACKGROUND_PRESET_OPTIONS.find((p) => p.id === currentBgId);
    if (found) {
      activeBgUrl = found.url;
    }
  }

  return (
    <BackgroundContext.Provider
      value={{
        activeBgUrl,
        currentBgId,
        customBgUrl,
        bgOpacity,
        bgSize,
        isCover,
        selectPresetBg,
        uploadCustomBg,
        setBgOpacity: handleSetOpacity,
        setBgSize: handleSetSize,
        setIsCover: handleSetIsCover,
        applyBackgroundChanges,
        resetDefaultBg,
        isBgModalOpen,
        setIsBgModalOpen,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};
