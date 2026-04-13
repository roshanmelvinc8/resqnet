"use client";

import { useCallback, useRef } from "react";

export const useBuzzer = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBuzzer = useCallback((duration = 1000, frequency = 440) => {
    if (typeof window === "undefined") return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioCtxRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration / 1000);
  }, []);

  return { playBuzzer };
};
