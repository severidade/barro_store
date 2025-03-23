/* eslint-disable max-len */
import { useState, useEffect } from 'react';

const MAX_WIDTH_MOBILE = 1024;

export function useDeviceInfo() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const isMobile = windowSize.width <= MAX_WIDTH_MOBILE;

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      setWindowSize((prev) => (prev.width !== newWidth || prev.height !== newHeight ? { width: newWidth, height: newHeight } : prev));
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowWidth: windowSize.width, windowHeight: windowSize.height, isMobile };
}
