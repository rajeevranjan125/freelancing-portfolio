import { useEffect, useRef, useState } from 'react';

export function useScrollProgress() {
  const targetRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId;

    const updateProgress = () => {
      if (!targetRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();
      const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);
      const nextProgress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
      setProgress(nextProgress);
    };

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return { progress, targetRef };
}
