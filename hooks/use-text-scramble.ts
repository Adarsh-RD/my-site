'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export function useTextScramble(text: string, trigger: boolean = true, speed: number = 30) {
  const [displayText, setDisplayText] = useState(text); // Initialize with final text to prevent hydration mismatch
  const [hasMounted, setHasMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const scramble = useCallback(() => {
    if (!trigger || !hasMounted || hasRunRef.current) return;
    hasRunRef.current = true;

    let iteration = 0;
    const maxIterations = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iteration) return text[idx];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iteration += 1 / 2;

      if (iteration >= maxIterations) {
        setDisplayText(text);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, trigger, speed, hasMounted]);

  useEffect(() => {
    const cleanup = scramble();
    return cleanup;
  }, [scramble]);

  return displayText;
}
