/* eslint-disable import/prefer-default-export */
// src/utils/useWindowWidth.ts

import { useState, useEffect } from 'react';

const MAX_WIDTH_MOBILE = 1024;

export function useDeviceInfo() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MAX_WIDTH_MOBILE);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      setIsMobile(newWidth <= MAX_WIDTH_MOBILE);
    };

    window.addEventListener('resize', handleResize);

    // Execute o manipulador de redimensionamento ao iniciar
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { windowWidth, isMobile };
}

// Este Hook retorna a largura `windowWidth` da tela e o booleano `isMobile`.
