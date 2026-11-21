import { motion } from 'framer-motion';

interface CamelMascotProps {
  className?: string;
  size?: number;
  mood?: 'happy' | 'sunglasses' | 'hearts';
  onClick?: () => void;
}

export function CamelMascot({
  className = '',
  size = 120,
  mood = 'sunglasses',
  onClick,
}: CamelMascotProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative inline-block cursor-pointer select-none ${className}`}
      style={{ width: size, height: size * 0.95 }}
    >
      <svg
        viewBox="0 0 160 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Shadow */}
        <ellipse cx="80" cy="142" rx="55" ry="7" fill="rgba(60, 40, 25, 0.12)" />

        {/* Legs */}
        <rect x="42" y="110" width="8" height="28" rx="4" fill="#C89658" />
        <rect x="58" y="112" width="8" height="26" rx="4" fill="#AE7B40" />
        <rect x="100" y="112" width="8" height="26" rx="4" fill="#AE7B40" />
        <rect x="114" y="110" width="8" height="28" rx="4" fill="#C89658" />

        {/* Body */}
        <ellipse cx="80" cy="100" rx="42" ry="24" fill="#E2AC6F" />

        {/* Hump with cute festive blanket */}
        <ellipse cx="80" cy="74" rx="20" ry="22" fill="#E2AC6F" />
        {/* Festive patterned saddle / blanket */}
        <path d="M68 84C68 76 92 76 92 84L94 96H66L68 84Z" fill="#F87550" />
        <line x1="66" y1="88" x2="94" y2="88" stroke="#FFD4C5" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="80" cy="92" r="2.5" fill="#FFF2E5" />

        {/* Long elegant neck */}
        <path
          d="M102 96C112 90 120 75 118 55L128 58C132 80 120 102 110 106Z"
          fill="#E2AC6F"
        />

        {/* Camel Head */}
        <path
          d="M110 52C108 42 120 32 136 34C148 35 154 44 150 54C145 62 132 64 122 62C116 60 112 56 110 52Z"
          fill="#E2AC6F"
        />

        {/* Cheeks */}
        <ellipse cx="132" cy="54" rx="7" ry="4" fill="#FFA588" opacity="0.6" />

        {/* Snout & smile */}
        <circle cx="146" cy="46" r="2" fill="#754823" />
        <path d="M138 52Q144 56 148 50" stroke="#754823" strokeWidth="2" strokeLinecap="round" />

        {/* Little ears */}
        <ellipse cx="115" cy="36" rx="4" ry="7" transform="rotate(20 115 36)" fill="#AE7B40" />

        {/* Party Hat */}
        <g transform="translate(118, 14)">
          <polygon points="0,22 14,22 7,2" fill="#F87550" />
          <line x1="2" y1="16" x2="12" y2="16" stroke="#FFD4C5" strokeWidth="2" />
          <line x1="4" y1="10" x2="10" y2="10" stroke="#FFD4C5" strokeWidth="2" />
          <circle cx="7" cy="1" r="3" fill="#FFA033" />
        </g>

        {/* Sunglasses or eyes */}
        {mood === 'sunglasses' ? (
          <g>
            <rect x="124" y="40" width="16" height="9" rx="3" fill="#20150F" transform="rotate(5 124 40)" />
            <line x1="117" y1="41" x2="124" y2="42" stroke="#20150F" strokeWidth="2" />
            <line x1="126" y1="42" x2="136" y2="47" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          </g>
        ) : (
          <g>
            <ellipse cx="128" cy="44" rx="2.5" ry="3" fill="#20150F" />
            <circle cx="129" cy="43" r="1" fill="white" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}
