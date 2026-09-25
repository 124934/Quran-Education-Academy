import React from 'react';
import { useLogo } from '../context/LogoContext';

interface Props {
  className?: string;
  size?: number;
  clickable?: boolean;
}

export const AcademyLogo: React.FC<Props> = ({
  className = 'w-12 h-12',
  size,
  clickable = true,
}) => {
  const { activeLogoUrl, setIsLogoPickerOpen } = useLogo();

  return (
    <div
      onClick={clickable ? () => setIsLogoPickerOpen(true) : undefined}
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white border-2 border-amber-400/70 shadow-sm ${
        clickable ? 'cursor-pointer group hover:border-emerald-500 hover:scale-105 transition-all' : ''
      } ${className}`}
      style={size ? { width: size, height: size } : undefined}
      title={clickable ? 'Click to change or upload logo' : 'Quran Education Academy Logo'}
    >
      <img
        src={activeLogoUrl}
        alt="Quran Education Academy Logo"
        className="w-full h-full object-contain p-1 transition-transform duration-200 group-hover:scale-110"
      />
    </div>
  );
};
