import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  char: string;
}

const SPARKLE_ICONS = ['✨', '💖', '⭐', '🌸', '🍊'];
const COLORS = ['#FF9473', '#F87550', '#ABC9AC', '#FFD4C5', '#FF7A00'];

export function MagicCursorTrail() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let lastTime = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const now = Date.now();
      // Throttle sparkle creation to every 60ms
      if (now - lastTime < 60) return;
      lastTime = now;

      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      if (clientX === 0 && clientY === 0) return;

      const newSparkle: Sparkle = {
        id: Math.random(),
        x: clientX,
        y: clientY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        char: SPARKLE_ICONS[Math.floor(Math.random() * SPARKLE_ICONS.length)],
      };

      setSparkles((prev) => [...prev.slice(-14), newSparkle]);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0.9, scale: 0.4, x: sparkle.x - 10, y: sparkle.y - 10 }}
            animate={{
              opacity: 0,
              scale: 1.2,
              y: sparkle.y - 35,
              x: sparkle.x + (Math.random() * 20 - 10),
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="absolute text-sm font-bold select-none drop-shadow-sm"
            style={{ color: sparkle.color }}
          >
            {sparkle.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
