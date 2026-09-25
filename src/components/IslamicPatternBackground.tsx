import React from 'react';
import { useBackground } from '../context/BackgroundContext';

interface Props {
  className?: string;
  fixed?: boolean;
}

export const IslamicPatternBackground: React.FC<Props> = ({
  className = '',
  fixed = true,
}) => {
  const { activeBgUrl, bgOpacity, bgSize, isCover } = useBackground();

  return (
    <div
      className={`${
        fixed ? 'fixed inset-0 pointer-events-none' : 'absolute inset-0'
      } z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* 
        Pure Background Image Layer:
        Completely direct image display with zero SVG overlays or interference.
        Any image uploaded or selected directly replaces this background image.
      */}
      <div
        className="absolute inset-0 w-full h-full transition-all duration-300 bg-center"
        style={{
          backgroundImage: `url(${activeBgUrl})`,
          backgroundRepeat: isCover ? 'no-repeat' : 'repeat',
          backgroundSize: isCover ? 'cover' : `${bgSize}px auto`,
          opacity: bgOpacity,
        }}
      />
    </div>
  );
};
