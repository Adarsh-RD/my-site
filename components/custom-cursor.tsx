'use client';

import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    setMounted(true);

    // Hide the default cursor since spider is drawn on canvas
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    // Also hide on all interactive elements
    const style = document.createElement('style');
    style.textContent =
      '*, *::before, *::after { cursor: none !important; } a, button, [role="button"], input, textarea, select, label { cursor: pointer !important; }';
    document.head.appendChild(style);

    return () => {
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      style.remove();
    };
  }, []);

  // No DOM elements needed — spider is rendered on the FloatingObjects canvas
  return null;
}
