import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Heart, RefreshCw } from 'lucide-react';
import { CapybaraMascot } from './mascots/CapybaraMascot';
import { SheepMascot } from './mascots/SheepMascot';
import { CamelMascot } from './mascots/CamelMascot';
import { sound } from '../utils/soundEffects';
import { fireCelebratoryConfetti } from '../utils/confetti';

interface FlyingTreat {
  id: number;
  emoji: string;
  target: 'capybara' | 'sheep' | 'camel';
}

const INITIAL_INVENTORY = {
  orange: 3,
  clover: 3,
  date: 3,
  cupcake: 3,
};

const FOOD_CONFIG = {
  orange: { emoji: '🍊', name: 'תפוז עסיסי', target: 'capybara' as const },
  clover: { emoji: '🍀', name: 'תלתן רך', target: 'sheep' as const },
  date: { emoji: '🌴', name: 'תמר מלכותי', target: 'camel' as const },
  cupcake: { emoji: '🧁', name: 'קאפקייק יום הולדת', target: 'capybara' as const },
};

const ANIMAL_QUOTES = {
  capybara: [
    'אומגג תפוז מושלם! רמת השלווה שלי בשיא 🧘‍♂️🍊',
    'דנדן את החיים! הקפיברות שולחות לך אהבה אינסופית 🦫✨',
    'יאממי! אפשר עוד אחד? אני אשמור אותו על הראש!',
    'החיים יפים כשדנדן חוגגת יום הולדת! 💖',
  ],
  sheep: [
    'מההההה! כל כך טעים לי! הצמר שלי נהיה עוד יותר רך 🐑🌸',
    'ברכת כבשים צמרירית לדנדן הנסיכה! 👑',
    'חחחח זה היה מתוק בדיוק כמוך!',
    'עדר שלם מריע לכבוד דנדן היום! 🥳',
  ],
  camel: [
    'וואו, פינוק אמיתי למדבר! הגמל מרכין ראש מרוב הערכה 🐪✨',
    'הדבשת שלי מלאה באושר עכשיו! 🌴',
    'סגרנו: את האדם האהוב עליי בכל המזרח התיכון!',
    'חגיגה אמיתית! יאללה לעוד נשנוש! 🎉',
  ],
};

export function FeedMascotsGame() {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [flyingTreats, setFlyingTreats] = useState<FlyingTreat[]>([]);
  const [happiness, setHappiness] = useState(20);
  const [activeSpeech, setActiveSpeech] = useState<{
    animal: 'capybara' | 'sheep' | 'camel';
    text: string;
  } | null>(null);

  const [capyMood, setCapyMood] = useState<'happy' | 'chewing' | 'hearts'>('happy');
  const [sheepMood, setSheepMood] = useState<'happy' | 'singing' | 'hearts'>('happy');
  const [camelMood, setCamelMood] = useState<'happy' | 'sunglasses' | 'hearts'>('sunglasses');

  const capyTimer = useRef<number | null>(null);
  const sheepTimer = useRef<number | null>(null);
  const camelTimer = useRef<number | null>(null);

  const totalSnacksRemaining =
    inventory.orange + inventory.clover + inventory.date + inventory.cupcake;

  const handleFeedSnack = (key: keyof typeof FOOD_CONFIG) => {
    if (inventory[key] <= 0) return;

    sound.playPop();

    // 1. Decrement inventory immediately so the item vanishes from plate
    setInventory((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] - 1),
    }));

    const config = FOOD_CONFIG[key];
    const target = config.target;
    const treatId = Date.now() + Math.random();

    // 2. Launch flying treat animation
    setFlyingTreats((prev) => [...prev, { id: treatId, emoji: config.emoji, target }]);

    // 3. When treat reaches mouth (after 500ms):
    setTimeout(() => {
      // Remove flying treat
      setFlyingTreats((prev) => prev.filter((t) => t.id !== treatId));

      // Crunch sound
      sound.playMunch();

      // Trigger chewing & heart mood cleanly with ref clears
      if (target === 'capybara') {
        if (capyTimer.current) clearTimeout(capyTimer.current);
        setCapyMood('chewing');
        capyTimer.current = window.setTimeout(() => setCapyMood('happy'), 1800);
      } else if (target === 'sheep') {
        if (sheepTimer.current) clearTimeout(sheepTimer.current);
        setSheepMood('singing');
        sheepTimer.current = window.setTimeout(() => setSheepMood('happy'), 1800);
      } else {
        if (camelTimer.current) clearTimeout(camelTimer.current);
        setCamelMood('hearts');
        camelTimer.current = window.setTimeout(() => setCamelMood('sunglasses'), 1800);
      }

      // Display speech bubble
      const quotes = ANIMAL_QUOTES[target];
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      setActiveSpeech({ animal: target, text: quote });

      // Increase happiness
      setHappiness((prev) => {
        const next = Math.min(100, prev + 12);
        if (next === 100 && prev < 100) {
          sound.playFanfare();
          fireCelebratoryConfetti();
        }
        return next;
      });
    }, 450);
  };

  const handleRefillPlate = () => {
    sound.playSparkle();
    setInventory(INITIAL_INVENTORY);
  };

  return (
    <section className="relative py-14 px-4 sm:px-6 max-w-3xl mx-auto text-center select-none">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-matcha-100 text-matcha-400 font-varela text-xs font-bold mb-3 border border-matcha-200"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>פינת הפינוקים והליטופים 🐾</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-varela font-bold text-warmGray-900 mb-2"
      >
        האכילי את החיות של דנדן! 🍊🐑
      </motion.h2>

      <p className="text-sm text-warmGray-700 font-varela max-w-md mx-auto mb-6">
        לחצי על נשנוש מצלחת הפינוקים – צפי בו עף ישירות לפיו של החבר הרעב!
      </p>

      {/* Main Game Container */}
      <div className="fluffy-card p-6 sm:p-8 relative shadow-fluffy overflow-hidden">
        {/* Happiness Meter */}
        <div className="mb-6 max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs font-varela font-bold text-warmGray-800 mb-1.5">
            <span className="flex items-center gap-1 text-peach-600">
              <Heart className="w-3.5 h-3.5 fill-peach-500 text-peach-500" />
              מדד האושר של החיות:
            </span>
            <span className="text-peach-600 font-mono text-sm">{happiness}%</span>
          </div>
          <div className="w-full h-3.5 rounded-full bg-cream-200 overflow-hidden border border-peach-200/60 p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-peach-400 via-peach-500 to-matcha-400"
              animate={{ width: `${happiness}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            />
          </div>

          {happiness >= 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-varela text-xs font-bold border border-amber-300 shadow-sm"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>זכית בתואר: יקירת הקפיברות והכבשים של השנה! 🏆</span>
            </motion.div>
          )}
        </div>

        {/* Animals Lineup with Target Zones */}
        <div className="relative grid grid-cols-3 gap-2 sm:gap-6 items-end justify-center mb-4 min-h-[160px]">
          {/* Capybara */}
          <div className="flex flex-col items-center relative">
            <CapybaraMascot
              size={110}
              mood={capyMood}
              onClick={() => handleFeedSnack('orange')}
            />
            <span className="text-[11px] font-bold font-varela text-peach-600 mt-1">
              קפיברה 🦫
            </span>
          </div>

          {/* Sheep */}
          <div className="flex flex-col items-center relative">
            <SheepMascot
              size={110}
              mood={sheepMood}
              onClick={() => handleFeedSnack('clover')}
            />
            <span className="text-[11px] font-bold font-varela text-matcha-400 mt-1">
              כבשה 🐑
            </span>
          </div>

          {/* Camel */}
          <div className="flex flex-col items-center relative">
            <CamelMascot
              size={110}
              mood={camelMood}
              onClick={() => handleFeedSnack('date')}
            />
            <span className="text-[11px] font-bold font-varela text-amber-700 mt-1">
              גמל 🐪
            </span>
          </div>

          {/* Flying Treat Animation Layer */}
          <AnimatePresence>
            {flyingTreats.map((treat) => {
              const targetX =
                treat.target === 'capybara' ? '-33%' : treat.target === 'camel' ? '33%' : '0%';
              return (
                <motion.div
                  key={treat.id}
                  initial={{ opacity: 1, scale: 1.4, x: '0%', y: '120px' }}
                  animate={{
                    opacity: [1, 1, 0],
                    scale: [1.4, 1.2, 0.4],
                    x: targetX,
                    y: '10px',
                  }}
                  transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-12 text-3xl z-20 pointer-events-none drop-shadow-md"
                >
                  {treat.emoji}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Speech Bubble when animal responds */}
        <div className="min-h-[50px] flex items-center justify-center mb-4">
          <AnimatePresence mode="wait">
            {activeSpeech && (
              <motion.div
                key={activeSpeech.text}
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="px-4 py-2.5 rounded-2xl bg-white border border-peach-200 shadow-sm text-xs sm:text-sm font-varela font-bold text-warmGray-900"
              >
                💬 {activeSpeech.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Snack Plate / Inventory */}
        <div className="pt-4 border-t-2 border-dashed border-peach-200/80">
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-varela text-warmGray-800 font-bold">
              צלחת הפינוקים (לחצי על חטיף כדי להאכיל):
            </span>
            <span className="text-xs font-mono font-bold text-peach-600">
              נותרו {totalSnacksRemaining} נשנושים
            </span>
          </div>

          {totalSnacksRemaining > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(Object.keys(FOOD_CONFIG) as Array<keyof typeof FOOD_CONFIG>).map((key) => {
                const count = inventory[key];
                const config = FOOD_CONFIG[key];
                const isAvailable = count > 0;

                return (
                  <motion.button
                    key={key}
                    whileHover={isAvailable ? { scale: 1.05 } : {}}
                    whileTap={isAvailable ? { scale: 0.95 } : {}}
                    disabled={!isAvailable}
                    onClick={() => handleFeedSnack(key)}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      isAvailable
                        ? 'bg-white hover:bg-peach-50 border-peach-200 shadow-sm text-warmGray-900 cursor-pointer'
                        : 'bg-warmGray-100/50 border-warmGray-200 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-2xl">{config.emoji}</span>
                    <div className="text-right">
                      <div className="text-xs font-varela font-bold">{config.name}</div>
                      <div className="text-[10px] text-warmGray-700 font-mono">
                        {count > 0 ? `כמות: ${count}` : 'נגמר!'}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="py-4">
              <p className="text-xs text-warmGray-700 font-varela mb-3">
                החיות זללו את כל מה שהיה בצלחת ושבעו לחלוטין! 😋
              </p>
              <button
                onClick={handleRefillPlate}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E25530] hover:bg-[#CA4421] text-white font-varela text-xs sm:text-sm font-bold shadow-pill-pop transition-all hover:scale-105 active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>מלאי את הצלחת מחדש! 🍽️✨</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
