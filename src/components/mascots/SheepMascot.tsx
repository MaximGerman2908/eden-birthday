import { motion } from 'framer-motion';

interface SheepMascotProps {
  className?: string;
  size?: number;
  mood?: 'happy' | 'singing' | 'hearts';
  onClick?: () => void;
}

export function SheepMascot({
  className = '',
  size = 120,
  mood = 'happy',
  onClick,
}: SheepMascotProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: [0, 3, -3, 0] }}
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
        <ellipse cx="80" cy="142" rx="50" ry="7" fill="rgba(60, 40, 25, 0.12)" />

        {/* Little legs */}
        <rect x="52" y="118" width="10" height="18" rx="5" fill="#4A4441" />
        <rect x="98" y="118" width="10" height="18" rx="5" fill="#4A4441" />
        <rect x="66" y="122" width="10" height="16" rx="5" fill="#3D3734" />
        <rect x="84" y="122" width="10" height="16" rx="5" fill="#3D3734" />

        {/* Fluffy cloud wool body */}
        <g fill="#FFFFFF" stroke="#F1E6DF" strokeWidth="2">
          <circle cx="50" cy="100" r="22" />
          <circle cx="110" cy="100" r="22" />
          <circle cx="80" cy="112" r="24" />
          <circle cx="45" cy="75" r="20" />
          <circle cx="115" cy="75" r="20" />
          <circle cx="65" cy="62" r="22" />
          <circle cx="95" cy="62" r="22" />
          <circle cx="80" cy="85" r="30" />
        </g>

        {/* Cute Ears */}
        <ellipse cx="44" cy="74" rx="14" ry="7" transform="rotate(-30 44 74)" fill="#FFA588" />
        <ellipse cx="44" cy="74" rx="10" ry="5" transform="rotate(-30 44 74)" fill="#FFD4C5" />
        
        <ellipse cx="116" cy="74" rx="14" ry="7" transform="rotate(30 116 74)" fill="#FFA588" />
        <ellipse cx="116" cy="74" rx="10" ry="5" transform="rotate(30 116 74)" fill="#FFD4C5" />

        {/* Sheep Face */}
        <ellipse cx="80" cy="82" rx="26" ry="24" fill="#FFF2E8" stroke="#E6D3C8" strokeWidth="1.5" />

        {/* Wool puff on forehead */}
        <g fill="#FFFFFF" stroke="#F1E6DF" strokeWidth="1.5">
          <circle cx="70" cy="60" r="10" />
          <circle cx="90" cy="60" r="10" />
          <circle cx="80" cy="54" r="11" />
        </g>

        {/* Flower / Bow on head */}
        <g transform="translate(92, 46)">
          <circle cx="0" cy="0" r="4" fill="#FF8364" />
          <circle cx="-5" cy="-2" r="3" fill="#FFB8A1" />
          <circle cx="5" cy="-2" r="3" fill="#FFB8A1" />
          <circle cx="-3" cy="4" r="3" fill="#FFB8A1" />
          <circle cx="3" cy="4" r="3" fill="#FFB8A1" />
          <circle cx="0" cy="-6" r="3" fill="#FFB8A1" />
        </g>

        {/* Cheeks */}
        <ellipse cx="62" cy="88" rx="7" ry="5" fill="#FFA588" opacity="0.65" />
        <ellipse cx="98" cy="88" rx="7" ry="5" fill="#FFA588" opacity="0.65" />

        {/* Nose & mouth */}
        <path d="M78 84L82 84L80 87Z" fill="#FFA588" />
        {mood === 'singing' ? (
          <ellipse cx="80" cy="94" rx="4" ry="6" fill="#3D3734" />
        ) : (
          <path d="M76 89Q80 93 84 89" stroke="#4A4441" strokeWidth="2" strokeLinecap="round" />
        )}

        {/* Eyes */}
        {mood === 'hearts' ? (
          <g fill="#F87550">
            <path d="M67 74A3 3 0 0 0 64 77C64 80 69 82 69 82S74 80 74 77A3 3 0 0 0 71 74 3 3 0 0 0 69 75.5A3 3 0 0 0 67 74Z" />
            <path d="M89 74A3 3 0 0 0 86 77C86 80 91 82 91 82S96 80 96 77A3 3 0 0 0 93 74 3 3 0 0 0 91 75.5A3 3 0 0 0 89 74Z" />
          </g>
        ) : (
          <g>
            <ellipse cx="68" cy="77" rx="3" ry="3.5" fill="#3D3734" />
            <circle cx="69" cy="76" r="1.2" fill="white" />
            <ellipse cx="92" cy="77" rx="3" ry="3.5" fill="#3D3734" />
            <circle cx="93" cy="76" r="1.2" fill="white" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}
