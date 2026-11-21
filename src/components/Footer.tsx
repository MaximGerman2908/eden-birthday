import { ArrowUp } from 'lucide-react';
import { birthdayConfig } from '../data/birthdayConfig';

export function Footer() {
  const { footer } = birthdayConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-14 px-4 text-center border-t-2 border-dashed border-peach-200/80 overflow-hidden bg-cream-100/50">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="flex justify-center items-center gap-3 text-3xl">
          <span>🐑</span>
          <span>🦫</span>
          <span>🐪</span>
        </div>

        <blockquote className="font-varela text-base sm:text-lg text-warmGray-900 font-bold">
          {footer.quote}
        </blockquote>

        <p className="text-xs sm:text-sm font-varela text-warmGray-700">
          {footer.signature}
        </p>

        <div className="pt-3">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-peach-50 border-2 border-peach-300 text-peach-600 text-xs sm:text-sm font-varela font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            <span>חזרה למעלה 💖</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
