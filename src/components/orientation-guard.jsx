'use client';

import { useState, useEffect } from 'react';

export default function OrientationGuard({ children }) {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isMobileDevice = window.innerWidth <= 768; // Detecta dispositivos móviles
      const isPortraitMode = window.innerHeight > window.innerWidth;
      
      setIsMobile(isMobileDevice);
      setIsPortrait(isPortraitMode && isMobileDevice);
    };

    // Verificar orientación al cargar
    checkOrientation();

    // Escuchar cambios de orientación
    window.addEventListener('orientationchange', checkOrientation);
    window.addEventListener('resize', checkOrientation);

    return () => {
      window.removeEventListener('orientationchange', checkOrientation);
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  // Si es móvil y está en portrait, mostrar mensaje de rotación
  if (isMobile && isPortrait) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white text-center z-50">
        <div className="animate-bounce text-6xl mb-4">📱</div>
        <h2 className="text-2xl font-bold mb-4">¡Rota tu dispositivo!</h2>
        <p className="text-lg mb-6 px-4">
          Por favor, gira tu dispositivo a orientación horizontal para una mejor experiencia
        </p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-12 border-2 border-white rounded"></div>
          <div className="text-2xl">→</div>
          <div className="w-12 h-8 border-2 border-white rounded"></div>
        </div>
      </div>
    );
  }

  // Si no es móvil o está en landscape, mostrar el contenido normal
  return children;
}
