import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Heart, Flame } from 'lucide-react';
import { fireCelebratoryConfetti } from '../utils/confetti';
import { sound } from '../utils/soundEffects';

interface CandleState {
  id: number;
  isLit: boolean;
}

export function InteractiveCake() {
  const [candles, setCandles] = useState<CandleState[]>([
    { id: 1, isLit: true },
    { id: 2, isLit: true },
    { id: 3, isLit: true },
  ]);
  const [wishGranted, setWishGranted] = useState(false);

  const litCount = candles.filter((c) => c.isLit).length;

  const handleBlowCandle = (id: number) => {
    sound.playCandleBlow();
    setCandles((prev) => {
      const nextCandles = prev.map((c) => (c.id === id ? { ...c, isLit: false } : c));
      const remainingLit = nextCandles.filter((c) => c.isLit).length;
      if (remainingLit === 0) {
        triggerWishCeremony();
      }
      return nextCandles;
    });
  };

  const handleBlowAll = () => {
    sound.playCandleBlow();
    setCandles((prev) => prev.map((c) => ({ ...c, isLit: false })));
    triggerWishCeremony();
  };

  const triggerWishCeremony = () => {
    setTimeout(() => {
      sound.playFanfare();
      fireCelebratoryConfetti();
      setWishGranted(true);
    }, 400);
  };

  const handleRelight = () => {
    sound.playPop();
    setCandles([
      { id: 1, isLit: true },
      { id: 2, isLit: true },
      { id: 3, isLit: true },
    ]);
    setWishGranted(false);
  };

  return (
    <section className="relative py-14 px-4 sm:px-6 max-w-2xl mx-auto text-center select-none">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-peach-100 text-peach-600 font-varela text-xs font-bold mb-3 border border-peach-200"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>מבצע משאלת יום הולדת סודית 🎂</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-varela font-bold text-warmGray-900 mb-2"
      >
        תביעי משאלה ותכבי את הנרות! ✨
      </motion.h2>

      <p className="text-sm text-warmGray-700 font-varela max-w-md mx-auto mb-8">
        לחצי על כל נר כדי לכבות אותו (או כבי את כולם במכה אחת). הקפיברות מתחייבות שהמשאלה תתגשם!
      </p>

      {/* Cake Container Card */}
      <div className="fluffy-card p-6 sm:p-10 relative overflow-hidden shadow-fluffy">
        {/* The Illustrated SVG Cake */}
        <div className="relative w-full max-w-xs mx-auto mb-6 flex justify-center items-end h-[220px]">
          {/* 3 Interactive Candles */}
          <div className="absolute top-2 w-48 flex justify-between items-end z-20 px-4">
            {candles.map((candle) => (
              <div
                key={candle.id}
                onClick={() => candle.isLit && handleBlowCandle(candle.id)}
                className={`relative flex flex-col items-center cursor-pointer transition-transform duration-200 ${
                  candle.isLit ? 'hover:scale-125' : 'opacity-70'
                }`}
                title={candle.isLit ? 'לחצי כדי לכבות את הנר!' : 'כובה בהצלחה!'}
              >
                {/* Flame or Smoke */}
                <div className="h-10 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {candle.isLit ? (
                      <motion.div
                        key="flame"
                        initial={{ scale: 0.8 }}
                        animate={{
                          scale: [1, 1.25, 0.95, 1.15, 1],
                          y: [0, -2, 1, -1, 0],
                        }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                        className="relative"
                      >
                        {/* Outer Glow */}
                        <div className="absolute -inset-2 bg-orange-400/40 rounded-full blur-sm" />
                        {/* Flame Core */}
                        <div className="w-4 h-7 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-md" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: -25, scale: 1.8 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="text-warmGray-400 text-xs font-bold select-none"
                      >
                        💨
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Wick */}
                <div className="w-0.5 h-2 bg-warmGray-800" />

                {/* Candle Stick */}
                <div
                  className={`w-4 h-14 rounded-t-sm shadow-sm ${
                    candle.id === 1
                      ? 'bg-peach-300 border border-peach-400'
                      : candle.id === 2
                      ? 'bg-matcha-300 border border-matcha-400'
                      : 'bg-skyPuff-300 border border-skyPuff-400'
                  }`}
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.6) 4px, rgba(255,255,255,0.6) 8px)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Cake Layers SVG */}
          <svg viewBox="0 0 240 160" className="w-full h-auto drop-shadow-lg z-10">
            {/* Cake Plate */}
            <ellipse cx="120" cy="150" rx="110" ry="10" fill="#E4D5CA" />
            <ellipse cx="120" cy="148" rx="100" ry="8" fill="#FFF9F2" />

            {/* Bottom Tier */}
            <path
              d="M30 110C30 98 45 92 120 92C195 92 210 98 210 110V140C210 148 195 152 120 152C45 152 30 148 30 140Z"
              fill="#FFD4C5"
            />
            {/* Bottom Frosting Drips */}
            <path
              d="M30 110C35 120 45 120 50 110C55 124 70 124 75 110C80 122 95 122 100 110C105 124 125 124 130 110C135 122 150 122 155 110C160 125 175 125 180 110C185 122 205 122 210 110V98C195 90 45 90 30 98Z"
              fill="#FFF2E5"
            />

            {/* Top Tier */}
            <path
              d="M60 62C60 52 75 48 120 48C165 48 180 52 180 62V94C180 102 165 106 120 106C75 106 60 102 60 94Z"
              fill="#FFB8A1"
            />
            {/* Top Frosting Drips */}
            <path
              d="M60 62C65 72 75 72 80 62C85 75 98 75 102 62C108 73 122 73 126 62C132 75 146 75 150 62C155 72 175 72 180 62V52C165 46 75 46 60 52Z"
              fill="#FFFFFF"
            />

            {/* Sprinkles */}
            <circle cx="85" cy="80" r="2.5" fill="#F87550" />
            <circle cx="105" cy="88" r="2" fill="#83AB84" />
            <circle cx="135" cy="82" r="2.5" fill="#FFA033" />
            <circle cx="155" cy="86" r="2" fill="#E25530" />
            <circle cx="55" cy="125" r="3" fill="#F87550" />
            <circle cx="95" cy="132" r="2.5" fill="#83AB84" />
            <circle cx="140" cy="128" r="3" fill="#FFA033" />
            <circle cx="175" cy="135" r="2.5" fill="#CDB6A3" />
          </svg>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {litCount > 0 ? (
            <button
              onClick={handleBlowAll}
              className="px-6 py-3 rounded-full bg-[#E25530] hover:bg-[#CA4421] text-white font-varela font-bold text-sm shadow-pill-pop flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>כבי את כל הנרות בנשיפה אחת! 💨</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="px-6 py-3 rounded-full bg-white hover:bg-peach-50 border-2 border-peach-300 text-warmGray-800 font-varela font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <RotateCcw className="w-4 h-4 text-peach-500" />
              <span>להדליק את הנרות שוב 🕯️</span>
            </button>
          )}
        </div>

        {/* Revealed Secret Wish Certificate when all candles blown */}
        <AnimatePresence>
          {wishGranted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-peach-50 via-white to-matcha-50 border-2 border-peach-300 shadow-cute-card relative"
            >
              {/* Top Stamp */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-peach-100 text-peach-600 font-varela font-bold text-xs mb-3 border border-peach-200">
                <Heart className="w-3.5 h-3.5 fill-peach-500 text-peach-500" />
                <span>תעודת התגשמות משאלה רשמית</span>
              </div>

              <h3 className="text-2xl font-varela font-bold text-warmGray-900 mb-3">
                המשאלה שלך נקלטה במערכת! 📜✨
              </h3>

              <p className="text-sm text-warmGray-800 font-varela leading-relaxed max-w-lg mx-auto mb-5">
                ״לפי תקנון עדר הכבשים והקפיברות, כל משאלה שדנדן מביעה ביום ההולדת מקבלת עדיפות עליונה ביקום. המשאלה שלך שמורה, נעולה, ומקסים כבר עובד על להגשים אותה!״
              </p>

              {/* Signature Seals */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-dashed border-peach-200 text-xs font-varela text-warmGray-700">
                <div className="flex flex-col items-center">
                  <span className="text-2xl">🦫</span>
                  <span className="font-bold text-[11px] text-peach-600">אישור הקפיברה</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">🐑</span>
                  <span className="font-bold text-[11px] text-peach-600">חותמת הכבשה</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">🐪</span>
                  <span className="font-bold text-[11px] text-peach-600">ברכת הגמל</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">💖</span>
                  <span className="font-bold text-[11px] text-peach-600">מקסים</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
