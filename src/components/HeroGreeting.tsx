import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../data/birthdayConfig';
import { CapybaraMascot } from './mascots/CapybaraMascot';
import { SheepMascot } from './mascots/SheepMascot';
import { CamelMascot } from './mascots/CamelMascot';
import { sound } from '../utils/soundEffects';

interface HeroGreetingProps {
  onExploreClick: () => void;
  onTriggerDisco?: () => void;
}

export function HeroGreeting({ onExploreClick, onTriggerDisco }: HeroGreetingProps) {
  const { hero } = birthdayConfig;
  const [capyClicks, setCapyClicks] = useState(0);
  const [capyMood, setCapyMood] = useState<'happy' | 'chewing' | 'party' | 'hearts'>('happy');
  const [sheepMood, setSheepMood] = useState<'happy' | 'singing' | 'hearts'>('happy');
  const [camelMood, setCamelMood] = useState<'happy' | 'sunglasses' | 'hearts'>('sunglasses');

  const handleCapyClick = () => {
    sound.playPop();
    const nextCount = capyClicks + 1;
    setCapyClicks(nextCount);

    if (nextCount >= 3) {
      sound.playFanfare();
      setCapyMood('party');
      if (onTriggerDisco) onTriggerDisco();
      setCapyClicks(0);
    } else {
      setCapyMood('chewing');
      setTimeout(() => setCapyMood('happy'), 1500);
    }
  };

  const handleSheepClick = () => {
    sound.playSparkle();
    setSheepMood('hearts');
    setTimeout(() => setSheepMood('happy'), 1500);
  };

  const handleCamelClick = () => {
    sound.playBoing();
    setCamelMood('hearts');
    setTimeout(() => setCamelMood('sunglasses'), 1500);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-10 pb-12 select-none">
      {/* Top cute tag badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-peach-100 border border-peach-300 text-peach-600 font-varela text-xs sm:text-sm font-bold mb-6 shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-peach-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span>{hero.badge}</span>
      </motion.div>

      {/* Bespoke Illustrated Animal Trio with Interactive Easter Egg */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex items-end justify-center gap-2 sm:gap-6 mb-8"
      >
        {/* Fluffy Sheep */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="cursor-pointer"
          title="לחצי עליי לחיבוק צמרירי!"
        >
          <SheepMascot size={100} mood={sheepMood} onClick={handleSheepClick} />
        </motion.div>

        {/* Illustrated Capybara with Orange & 3-click easter egg */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="relative cursor-pointer"
          title="לחצי 3 פעמים ברצף להפתעה סודית!"
        >
          <CapybaraMascot size={135} mood={capyMood} onClick={handleCapyClick} />
          {capyClicks > 0 && capyClicks < 3 && (
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-varela font-bold px-2 py-0.5 rounded-full bg-peach-500 text-white shadow-sm whitespace-nowrap">
              עוד {3 - capyClicks} לחיצות! ✨
            </span>
          )}
        </motion.div>

        {/* Festive Camel with Sunglasses */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="cursor-pointer"
          title="הגמל מוסר נשיקות!"
        >
          <CamelMascot size={100} mood={camelMood} onClick={handleCamelClick} />
        </motion.div>
      </motion.div>

      {/* Main Bouncy Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-3xl mb-5"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-varela font-bold tracking-tight text-warmGray-900 leading-[1.25]">
          <span>{hero.titleStart} </span>
          <span className="text-peach-500 font-extrabold px-2 inline-block">
            {hero.nameHighlight}
          </span>
          <span className="inline-block animate-wiggle-slow mr-1">
            {hero.titleEnd}
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="max-w-xl text-base sm:text-lg text-warmGray-800 font-varela leading-relaxed mb-10 px-2"
      >
        {hero.subtitle}
      </motion.p>

      {/* Primary Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex flex-col items-center gap-4"
      >
        <button
          onClick={() => {
            sound.playSparkle();
            onExploreClick();
          }}
          className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#E25530] hover:bg-[#CA4421] text-white font-varela font-bold text-base sm:text-lg shadow-pill-pop hover:shadow-fluffy hover:scale-105 active:scale-95 transition-all duration-300 border border-[#D54521]"
        >
          <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
          <span className="font-extrabold tracking-wide drop-shadow-sm">{hero.ctaButton}</span>
        </button>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-peach-500 pt-2"
        >
          <ChevronDown className="w-6 h-6 stroke-[2.5]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
