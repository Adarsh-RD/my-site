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

    // Also hide on non-interactive elements, but restore on interactive ones
    const style = document.createElement('style');
    style.textContent = \`
      html, body { cursor: none !important; }
      
      /* Force hide on all elements by default so spider takes over */
      *:not(a):not(button):not([role="button"]):not(input):not(textarea):not(select):not(label):not(.cursor-pointer) {
        cursor: none !important;
      }
      
      /* Restore correct cursors for interactive elements AND their children */
      a, a *, button, button *, [role="button"], [role="button"] *, .cursor-pointer, .cursor-pointer * {
        cursor: pointer !important;
      }
      
      input, textarea, select {
        cursor: text !important;
      }
    \`;
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
