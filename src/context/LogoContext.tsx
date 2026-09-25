import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import newEmblemImg from '../assets/images/academy_gold_logo_1790359404316.jpg';
import vectorLogoSvg from '../assets/images/logo.svg';

export interface LogoOption {
  id: string;
  name: string;
  url: string;
}

export const PRESET_LOGOS: LogoOption[] = [
  {
    id: 'emblem-gold',
    name: 'Luxury Golden Quran Emblem',
    url: newEmblemImg,
  },
  {
    id: 'vector-arch',
    name: 'Geometric Mosque Arch & Quran',
    url: vectorLogoSvg,
  },
];

interface LogoContextType {
  activeLogoUrl: string;
  currentLogoId: string;
  customLogoUrl: string | null;
  selectPresetLogo: (id: string) => void;
  uploadCustomLogo: (file: File) => Promise<void>;
  resetDefaultLogo: () => void;
  isLogoPickerOpen: boolean;
  setIsLogoPickerOpen: (open: boolean) => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

const LOGO_STORAGE_KEY = 'qea_active_logo_v1';

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLogoId, setCurrentLogoId] = useState<string>('emblem-gold');
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [isLogoPickerOpen, setIsLogoPickerOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOGO_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentLogoId) setCurrentLogoId(parsed.currentLogoId);
        if (parsed.customLogoUrl) setCustomLogoUrl(parsed.customLogoUrl);
      }
    } catch {
      // ignore
    }
  }, []);

  const saveState = (id: string, custom: string | null) => {
    try {
      localStorage.setItem(
        LOGO_STORAGE_KEY,
        JSON.stringify({
          currentLogoId: id,
          customLogoUrl: custom && custom.length < 2000000 ? custom : null,
        })
      );
    } catch {
      // ignore
    }
  };

  const selectPresetLogo = (id: string) => {
    setCurrentLogoId(id);
    saveState(id, customLogoUrl);
  };

  const uploadCustomLogo = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please select an image file'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomLogoUrl(result);
        setCurrentLogoId('custom');
        saveState('custom', result);
        resolve();
      };
      reader.onerror = () => reject(new Error('Failed to read image'));
      reader.readAsDataURL(file);
    });
  };

  const resetDefaultLogo = () => {
    setCurrentLogoId('emblem-gold');
    setCustomLogoUrl(null);
    saveState('emblem-gold', null);
  };

  let activeLogoUrl = newEmblemImg;
  if (currentLogoId === 'custom' && customLogoUrl) {
    activeLogoUrl = customLogoUrl;
  } else {
    const preset = PRESET_LOGOS.find((p) => p.id === currentLogoId);
    if (preset) {
      activeLogoUrl = preset.url;
    }
  }

  return (
    <LogoContext.Provider
      value={{
        activeLogoUrl,
        currentLogoId,
        customLogoUrl,
        selectPresetLogo,
        uploadCustomLogo,
        resetDefaultLogo,
        isLogoPickerOpen,
        setIsLogoPickerOpen,
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};
