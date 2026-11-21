import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { birthdayConfig } from '../data/birthdayConfig';

export function LoveNote() {
  const { loveNote } = birthdayConfig;

  return (
    <section className="relative max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="fluffy-card p-7 sm:p-10 relative overflow-hidden shadow-fluffy"
      >
        {/* Cute background animal stamp watermark */}
        <div className="absolute -top-4 -left-4 text-7xl opacity-15 select-none pointer-events-none">
          🦫
        </div>
        <div className="absolute -bottom-4 -right-4 text-7xl opacity-15 select-none pointer-events-none">
          🐑
        </div>

        {/* Header Tag */}
        <div className="flex items-center gap-2 text-peach-500 font-varela font-bold text-sm mb-4">
          <Heart className="w-4 h-4 fill-peach-400 text-peach-400" />
          <span>{loveNote.tag}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-varela font-bold text-warmGray-800 mb-6 leading-snug">
          {loveNote.title}
        </h2>

        {/* Paragraphs */}
        <div className="space-y-4 text-warmGray-700 font-varela leading-relaxed text-base sm:text-lg">
          {loveNote.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Sign-off & P.S */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-peach-200/80 space-y-2">
          <p className="font-varela font-bold text-lg text-peach-500">
            {loveNote.signature}
          </p>
          <p className="text-xs sm:text-sm text-warmGray-700/80 font-varela italic">
            {loveNote.psNote}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
