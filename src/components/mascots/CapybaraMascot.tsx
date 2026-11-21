import { motion } from 'framer-motion';

interface CapybaraMascotProps {
  className?: string;
  size?: number;
  mood?: 'happy' | 'chewing' | 'party' | 'hearts';
  hasOrange?: boolean;
  onClick?: () => void;
}

export function CapybaraMascot({
  className = '',
  size = 120,
  mood = 'happy',
  hasOrange = true,
  onClick,
}: CapybaraMascotProps) {
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
        <ellipse cx="80" cy="142" rx="55" ry="8" fill="rgba(60, 40, 25, 0.12)" />

        {/* Back feet */}
        <ellipse cx="45" cy="132" rx="14" ry="10" fill="#7E5F49" />
        <ellipse cx="115" cy="132" rx="14" ry="10" fill="#7E5F49" />

        {/* Body - Soft chubby potato silhouette */}
        <path
          d="M32 105C28 65 52 42 80 42C108 42 132 65 128 105C125 132 108 138 80 138C52 138 35 132 32 105Z"
          fill="#A8876F"
        />

        {/* Belly patch */}
        <ellipse cx="80" cy="98" rx="34" ry="28" fill="#CDB6A3" opacity="0.6" />

        {/* Ears */}
        <motion.g
          animate={mood === 'chewing' ? { rotate: [-5, 5, -5] } : {}}
          transition={{ repeat: Infinity, duration: 0.4 }}
        >
          <ellipse cx="42" cy="50" rx="9" ry="12" transform="rotate(-25 42 50)" fill="#7E5F49" />
          <ellipse cx="42" cy="50" rx="5" ry="8" transform="rotate(-25 42 50)" fill="#FFD4C5" />
          
          <ellipse cx="118" cy="50" rx="9" ry="12" transform="rotate(25 118 50)" fill="#7E5F49" />
          <ellipse cx="118" cy="50" rx="5" ry="8" transform="rotate(25 118 50)" fill="#FFD4C5" />
        </motion.g>

        {/* Snout */}
        <ellipse cx="80" cy="82" rx="24" ry="18" fill="#8B6B54" />
        <path
          d="M74 76C74 74 76 72 78 72H82C84 72 86 74 86 76C86 79 82 82 80 82C78 82 74 79 74 76Z"
          fill="#3A2A1E"
        />
        {/* Nostrils */}
        <circle cx="76" cy="76" r="2.2" fill="#20150F" />
        <circle cx="84" cy="76" r="2.2" fill="#20150F" />

        {/* Mouth */}
        {mood === 'chewing' ? (
          <motion.ellipse
            cx="80"
            cy="89"
            rx="5"
            ry="4"
            fill="#3A2A1E"
            animate={{ ry: [2, 5, 2] }}
            transition={{ repeat: Infinity, duration: 0.3 }}
          />
        ) : (
          <path
            d="M76 84Q80 88 84 84"
            stroke="#3A2A1E"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}

        {/* Cheeks */}
        <ellipse cx="52" cy="82" rx="9" ry="6" fill="#FFA588" opacity="0.65" />
        <ellipse cx="108" cy="82" rx="9" ry="6" fill="#FFA588" opacity="0.65" />

        {/* Eyes based on mood */}
        {mood === 'party' ? (
          /* Cool sunglasses */
          <g>
            <rect x="52" y="60" width="24" height="15" rx="5" fill="#1E1E24" />
            <rect x="84" y="60" width="24" height="15" rx="5" fill="#1E1E24" />
            <line x1="76" y1="67" x2="84" y2="67" stroke="#1E1E24" strokeWidth="4" />
            <line x1="56" y1="63" x2="72" y2="72" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <line x1="88" y1="63" x2="104" y2="72" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          </g>
        ) : mood === 'hearts' ? (
          /* Heart eyes */
          <g fill="#F87550">
            <path d="M57 60A4 4 0 0 0 53 64C53 68 59 71 59 71S65 68 65 64A4 4 0 0 0 61 60 4 4 0 0 0 59 62A4 4 0 0 0 57 60Z" />
            <path d="M99 60A4 4 0 0 0 95 64C95 68 101 71 101 71S107 68 107 64A4 4 0 0 0 103 60 4 4 0 0 0 101 62A4 4 0 0 0 99 60Z" />
          </g>
        ) : (
          /* Cute serene blinking eyes */
          <g>
            <ellipse cx="60" cy="65" rx="3.5" ry="4" fill="#20150F" />
            <circle cx="61.5" cy="63.5" r="1.5" fill="white" />
            <ellipse cx="100" cy="65" rx="3.5" ry="4" fill="#20150F" />
            <circle cx="101.5" cy="63.5" r="1.5" fill="white" />
          </g>
        )}

        {/* Orange on head with cute leaf */}
        {hasOrange && (
          <motion.g
            animate={{ y: [0, -3, 0], rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          >
            {/* Orange shadow on head */}
            <ellipse cx="80" cy="43" rx="14" ry="4" fill="rgba(80, 50, 30, 0.3)" />
            {/* Orange fruit */}
            <circle cx="80" cy="30" r="15" fill="#FF7A00" />
            <ellipse cx="83" cy="27" rx="13" ry="12" fill="#FFA033" />
            <circle cx="86" cy="24" r="3.5" fill="#FFD199" opacity="0.6" />
            {/* Orange stem */}
            <path d="M80 16Q81 12 80 9" stroke="#684A28" strokeWidth="2.5" strokeLinecap="round" />
            {/* Green leaf */}
            <path
              d="M80 12C85 8 92 10 93 14C90 17 83 17 80 12Z"
              fill="#52A447"
            />
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
}
