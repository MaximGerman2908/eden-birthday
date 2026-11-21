import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import { birthdayConfig } from '../data/birthdayConfig';

interface HeroGreetingProps {
  onExploreClick: () => void;
}

export function HeroGreeting({ onExploreClick }: HeroGreetingProps) {
  const { hero } = birthdayConfig;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-12 pb-12 select-none">
      {/* Top cute tag badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-peach-100 border border-peach-300 text-peach-600 font-varela text-xs sm:text-sm font-bold mb-6 shadow-sm"
      >
        <span>{hero.badge}</span>
      </motion.div>

      {/* Cute Animal Trio Bouncing together */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex items-center justify-center gap-4 sm:gap-6 mb-6 text-4xl sm:text-6xl"
      >
        {/* Sheep */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="filter drop-shadow-sm cursor-pointer hover:scale-125 transition-transform"
          title="כבשה מתוקה"
        >
          🐑
        </motion.div>

        {/* Capybara with orange */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="relative filter drop-shadow-sm cursor-pointer hover:scale-125 transition-transform"
          title="קפיברה רגועה עם תפוז"
        >
          <span className="text-5xl sm:text-7xl">🦫</span>
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl sm:text-2xl">🍊</span>
        </motion.div>

        {/* Camel */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [4, -4, 4] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="filter drop-shadow-sm cursor-pointer hover:scale-125 transition-transform"
          title="גמל חגיגי"
        >
          🐪
        </motion.div>
      </motion.div>

      {/* Main Bouncy Headline (Clean styling, NO spellcheck wavy underline) */}
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

      {/* Primary Action Button - Rich vibrant coral background with crisp white text and high contrast */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex flex-col items-center gap-4"
      >
        <button
          onClick={onExploreClick}
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
