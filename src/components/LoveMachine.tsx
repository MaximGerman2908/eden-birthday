import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Dices, Heart, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface ReasonCard {
  id: number;
  emoji: string;
  tag: string;
  text: string;
}

const REASONS: ReasonCard[] = [
  {
    id: 1,
    emoji: '✨',
    tag: 'חיוך ממגנט',
    text: 'איך שאת צוחקת מכל הלב ומאירה ברגע אחד את כל החדר!',
  },
  {
    id: 2,
    emoji: '🦫',
    tag: 'שלווה עילאית',
    text: 'הרוגע המושלם שלך – את יכולה ללמד קפיברה במעיין חם ביפן שיעור או שניים ברוגע.',
  },
  {
    id: 3,
    emoji: '🌸',
    tag: 'לב של זהב',
    text: 'האכפתיות והחום שאת מפזרת לכל מי שסביבך בלי לבקש שום דבר בתמורה.',
  },
  {
    id: 4,
    emoji: '🐑',
    tag: 'חמידות מוגזמת',
    text: 'את יותר רכה ומחבקת מעדר שלם של כבשים בשוויץ ביום אביבי.',
  },
  {
    id: 5,
    emoji: '🍝',
    tag: 'טעם משובח',
    text: 'איך שאת יודעת לבחור בדיוק את המנות הכי טעימות במסעדה, ואז אני גונב לך ביס.',
  },
  {
    id: 6,
    emoji: '👑',
    tag: 'היופי שלך',
    text: 'זה שאת נראית מהממת בכל מצב – אפילו בפיג׳מה עם קוקו מרושל בבוקר.',
  },
  {
    id: 7,
    emoji: '😂',
    tag: 'ההומור הייחודי',
    text: 'הבדיחות הקטנות שרק שנינו מבינים ושגורמות לנו לבכות מצחוק באמצע הרחוב.',
  },
  {
    id: 8,
    emoji: '🐪',
    tag: 'נאמנות ללא תנאי',
    text: 'את תמיד שם בשבילי, החברה הכי טובה, השותפה הכי מושלמת והאדם האהוב עליי בעולם.',
  },
];

export function LoveMachine() {
  const [currentReason, setCurrentReason] = useState<ReasonCard | null>(null);
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleDraw = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    sound.playPop();

    setTimeout(() => {
      // Pick next unrevealed or random
      const unrevealed = REASONS.filter((r) => !revealedIds.includes(r.id));
      const pool = unrevealed.length > 0 ? unrevealed : REASONS;
      const selected = pool[Math.floor(Math.random() * pool.length)];

      setCurrentReason(selected);
      setRevealedIds((prev) => (prev.includes(selected.id) ? prev : [...prev, selected.id]));
      sound.playSparkle();
      setIsSpinning(false);
    }, 450);
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
        <span>מכונת ההפתעות והמחמאות 🎰</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-varela font-bold text-warmGray-900 mb-2"
      >
        למה דנדן הבחורה הכי מושלמת בעולם? 💖
      </motion.h2>

      <p className="text-sm text-warmGray-700 font-varela max-w-md mx-auto mb-6">
        לחצי על כפתור ההגרלה כדי לגלול פתק קטן עם סיבה אמיתית מהלב.
      </p>

      {/* Fluffy Card */}
      <div className="fluffy-card p-6 sm:p-8 relative shadow-fluffy">
        {/* Draw Button */}
        <div className="mb-6 flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDraw}
            disabled={isSpinning}
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#E25530] via-peach-500 to-[#E25530] text-white font-varela font-extrabold text-base sm:text-lg shadow-pill-pop flex items-center justify-center gap-3 border border-[#D54521] transition-all"
          >
            <motion.div
              animate={isSpinning ? { rotate: 360 } : {}}
              transition={{ repeat: isSpinning ? Infinity : 0, duration: 0.5 }}
            >
              <Dices className="w-5 h-5" />
            </motion.div>
            <span>{isSpinning ? 'מגריל סיבה מתוקה...' : 'לחצי להגרלת סיבה! 🎰'}</span>
          </motion.button>

          {/* Progress counter */}
          <div className="mt-3 text-xs text-warmGray-700 font-varela font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-matcha-400" />
            <span>
              אספת <strong>{revealedIds.length}</strong> מתוך <strong>{REASONS.length}</strong> סיבות
            </span>
          </div>
        </div>

        {/* Revealed Capsule Card */}
        <div className="min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentReason ? (
              <motion.div
                key={currentReason.id}
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-full p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-cream-100 via-white to-peach-50 border-2 border-peach-200/90 shadow-cute-card relative overflow-hidden"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">{currentReason.emoji}</span>
                  <span className="px-3 py-0.5 rounded-full bg-peach-100 text-peach-600 text-xs font-varela font-bold border border-peach-200">
                    {currentReason.tag}
                  </span>
                </div>

                <p className="text-base sm:text-lg font-varela font-bold text-warmGray-900 leading-relaxed max-w-lg mx-auto">
                  {currentReason.text}
                </p>

                <div className="mt-3 flex items-center justify-center gap-1 text-peach-500 text-xs font-bold">
                  <Heart className="w-3 h-3 fill-peach-400" />
                  <span>נכתב במיוחד בשבילך ממקסים</span>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-warmGray-700/60 font-varela text-sm py-8">
                ✨ לחצי למעלה על הכפתור כדי לגלות את הפתק הראשון! ✨
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
