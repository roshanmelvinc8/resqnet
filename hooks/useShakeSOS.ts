"use client";

import { useEffect, useState } from "react";

export const useShakeSOS = (onShake: () => void) => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    let lastX: number | null = null;
    let lastY: number | null = null;
    let lastZ: number | null = null;
    let lastUpdate = 0;
    const shakeThreshold = 15;

    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const currentTime = Date.now();
      if (currentTime - lastUpdate > 100) {
        const diffTime = currentTime - lastUpdate;
        lastUpdate = currentTime;

        const { x, y, z } = acceleration;

        if (lastX !== null && lastY !== null && lastZ !== null) {
          const speed = Math.abs(x! + y! + z! - lastX - lastY - lastZ) / diffTime * 10000;

          if (speed > shakeThreshold) {
            onShake();
          }
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    if (typeof window !== "undefined" && "DeviceMotionEvent" in window) {
      setIsSupported(true);
      window.addEventListener("devicemotion", handleMotion);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("devicemotion", handleMotion);
      }
    };
  }, [onShake]);

  return { isSupported };
};
