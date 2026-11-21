import { motion } from 'framer-motion';

export function AmbientBackground() {
  const floatingIcons = [
    { emoji: '🦫', size: 'text-2xl', top: '12%', left: '8%', delay: 0 },
    { emoji: '🐑', size: 'text-3xl', top: '25%', left: '88%', delay: 1.2 },
    { emoji: '🐪', size: 'text-2xl', top: '48%', left: '5%', delay: 2.1 },
    { emoji: '🍊', size: 'text-xl', top: '18%', left: '78%', delay: 0.8 },
    { emoji: '🌸', size: 'text-xl', top: '65%', left: '92%', delay: 1.7 },
    { emoji: '🦫', size: 'text-3xl', top: '78%', left: '10%', delay: 2.5 },
    { emoji: '🐑', size: 'text-2xl', top: '90%', left: '82%', delay: 0.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft pastel ambient radial glow blobs */}
      <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-peach-200/40 rounded-full blur-[120px]" />
      <div className="absolute top-[35%] -right-[10%] w-[450px] h-[450px] bg-matcha-200/35 rounded-full blur-[130px]" />
      <div className="absolute top-[70%] -left-[10%] w-[500px] h-[500px] bg-cream-300/50 rounded-full blur-[140px]" />

      {/* Floating cute animals and decorations */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} select-none opacity-45 pointer-events-none`}
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 5 + (i % 3) * 1.5,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
