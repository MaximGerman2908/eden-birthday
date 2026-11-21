import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, X } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface DiscoPartyModeProps {
  isActive: boolean;
  onClose: () => void;
}

export function DiscoPartyMode({ isActive, onClose }: DiscoPartyModeProps) {
  useEffect(() => {
    if (isActive) {
      sound.startPartyMusic();
    } else {
      sound.stopPartyMusic();
    }

    return () => {
      sound.stopPartyMusic();
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {/* Subtle, Non-blocking Party Ambient Glow (edges only, doesn't obscure content) */}
        <motion.div
          animate={{
            boxShadow: [
              'inset 0 0 60px rgba(255, 148, 115, 0.45)',
              'inset 0 0 70px rgba(171, 201, 172, 0.45)',
              'inset 0 0 65px rgba(255, 212, 197, 0.5)',
              'inset 0 0 70px rgba(199, 226, 247, 0.45)',
              'inset 0 0 60px rgba(255, 148, 115, 0.45)',
            ],
          }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Compact, Non-intrusive Floating DJ Control Pill at top center */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', damping: 18 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 pointer-events-auto z-50 flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-peach-500 to-rose-400 text-white font-varela font-extrabold text-xs sm:text-sm shadow-xl border-2 border-white/80 backdrop-blur-md"
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            className="text-lg leading-none"
          >
            🪩
          </motion.span>

          <span className="drop-shadow-sm flex items-center gap-1.5">
            מצב מסיבה דולק!
            <Music className="w-3.5 h-3.5 animate-bounce" />
          </span>

          {/* Equalizer Wave Bars */}
          <div className="flex items-end gap-0.5 h-3.5 mx-1">
            {[0.4, 0.8, 0.5, 0.9, 0.6].map((h, idx) => (
              <motion.div
                key={idx}
                animate={{ height: ['25%', '100%', '40%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.4 + idx * 0.1,
                  ease: 'easeInOut',
                }}
                className="w-1 bg-white rounded-full"
                style={{ height: `${h * 100}%` }}
              />
            ))}
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-1 hover:bg-black/20 rounded-full transition-colors ml-1"
            title="סיום מצב מסיבה"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </motion.div>

        {/* Floating party balloons on sides only (never center-blocking) */}
        {[
          { emoji: '🎈', left: '4%', delay: 0 },
          { emoji: '🎉', left: '8%', delay: 1.2 },
          { emoji: '✨', left: '92%', delay: 0.5 },
          { emoji: '🎈', left: '95%', delay: 1.8 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: '105vh', opacity: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.85, 0.85, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 7 + i * 1.5,
              delay: item.delay,
              ease: 'easeInOut',
            }}
            className="absolute text-2xl sm:text-3xl select-none pointer-events-none"
            style={{ left: item.left }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
