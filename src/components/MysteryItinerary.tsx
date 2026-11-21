import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Clock, Sparkles } from 'lucide-react';
import { birthdayConfig, ItineraryItem } from '../data/birthdayConfig';

function AnimalBadge({ animal }: { animal: ItineraryItem['animal'] }) {
  switch (animal) {
    case 'sheep':
      return <span className="text-2xl" title="כבשה">🐑</span>;
    case 'capybara':
      return <span className="text-2xl" title="קפיברה">🦫</span>;
    case 'camel':
      return <span className="text-2xl" title="גמל">🐪</span>;
    case 'cake':
    default:
      return <span className="text-2xl" title="עוגת יום הולדת">🎂</span>;
  }
}

function HebrewCountdown({ targetIso }: { targetIso: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetIso).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isPast: false,
      });
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetIso]);

  if (timeLeft.isPast) {
    return (
      <div className="text-xs text-matcha-400 font-varela font-bold flex items-center gap-1 mt-2">
        <span>ההפתעה פתוחה ומוכנה! 🎉</span>
      </div>
    );
  }

  return (
    <div className="mt-3 pt-3 border-t border-peach-200/80">
      <div className="text-xs text-warmGray-800 font-varela font-bold flex items-center gap-1.5 mb-2.5">
        <Clock className="w-3.5 h-3.5 text-peach-600" />
        <span>נפתח בעוד:</span>
      </div>

      {/* Responsive 4-Column Grid Clock (Never cuts off or clips in RTL) */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center w-full">
        <div className="p-2 rounded-xl bg-white border border-peach-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-base sm:text-lg font-mono font-bold text-warmGray-900 leading-tight">{timeLeft.days}</span>
          <span className="text-[10px] sm:text-xs text-warmGray-700 font-varela">ימים</span>
        </div>
        <div className="p-2 rounded-xl bg-white border border-peach-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-base sm:text-lg font-mono font-bold text-warmGray-900 leading-tight">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-[10px] sm:text-xs text-warmGray-700 font-varela">שעות</span>
        </div>
        <div className="p-2 rounded-xl bg-white border border-peach-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-base sm:text-lg font-mono font-bold text-warmGray-900 leading-tight">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-[10px] sm:text-xs text-warmGray-700 font-varela">דקות</span>
        </div>
        <div className="p-2 rounded-xl bg-white border border-peach-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-base sm:text-lg font-mono font-bold text-warmGray-900 leading-tight">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-[10px] sm:text-xs text-warmGray-700 font-varela">שניות</span>
        </div>
      </div>
    </div>
  );
}

export function MysteryItinerary() {
  const { itinerary } = birthdayConfig;

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-peach-100 text-peach-600 font-varela text-xs font-bold mb-2 border border-peach-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{itinerary.tag}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-varela font-bold text-warmGray-900 mb-2">
          {itinerary.title}
        </h2>
        <p className="text-sm text-warmGray-800 font-varela max-w-md mx-auto">
          {itinerary.subtitle}
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative">
        {/* Dashed vertical progress track */}
        <div className="absolute right-6 sm:right-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 border-r-2 border-dashed border-peach-300" />

        <div className="space-y-8 sm:space-y-12">
          {itinerary.timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            const isLocked = item.status === 'locked';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6`}
              >
                {/* Animal Icon Circle on line */}
                <div className="absolute right-6 sm:right-1/2 translate-x-1/2 top-5 z-10">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-peach-300 flex items-center justify-center shadow-fluffy">
                    <AnimalBadge animal={item.animal} />
                  </div>
                </div>

                {/* Content Card with generous spacing to avoid clipping */}
                <div className={`w-full sm:w-[calc(50%-2rem)] pr-16 sm:pr-0 ${isEven ? 'sm:text-left' : 'sm:text-right'}`}>
                  <div className={`fluffy-card p-5 sm:p-7 relative transition-all duration-300 ${
                    isLocked ? 'bg-cream-100/95 border-peach-300' : 'fluffy-card-hover'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-peach-100 text-peach-600 font-mono text-xs font-bold border border-peach-200">
                        {item.time}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-cream-200 text-warmGray-900 text-[11px] font-varela font-bold">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-varela font-bold text-warmGray-900 mb-2">
                      {item.title}
                    </h3>

                    {isLocked ? (
                      <div className="space-y-2">
                        <div className="relative py-2">
                          <p className="text-sm font-varela text-warmGray-700/40 filter blur-[4px] select-none">
                            {item.description}
                          </p>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border-2 border-peach-300 text-xs font-bold text-peach-600 shadow-sm">
                              <Lock className="w-3.5 h-3.5" />
                              <span>הפתעה נעולה! 🦫</span>
                            </span>
                          </div>
                        </div>

                        {item.mysteryHint && (
                          <p className="text-xs text-warmGray-800 font-varela font-medium">
                            💡 {item.mysteryHint}
                          </p>
                        )}

                        {item.unlockDate && (
                          <HebrewCountdown targetIso={item.unlockDate} />
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-warmGray-800 font-varela leading-relaxed mb-3">
                          {item.description}
                        </p>
                        {item.locationName && (
                          <div className="text-xs text-peach-600 font-varela font-bold">
                            📍 {item.locationName}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
