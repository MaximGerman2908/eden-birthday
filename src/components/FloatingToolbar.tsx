import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export function FloatingToolbar() {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sound.playPop();
    }
  };

  return (
    <div className="fixed top-4 left-4 z-40 flex items-center gap-2">
      {/* Sound Toggle Button */}
      <button
        onClick={handleToggleMute}
        className="p-2.5 rounded-full bg-white/90 hover:bg-white text-warmGray-800 border border-peach-200 shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95"
        title={isMuted ? 'הפעל צלילים חמודים' : 'השתק צלילים'}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-warmGray-400" />
        ) : (
          <Volume2 className="w-4 h-4 text-peach-600" />
        )}
      </button>
    </div>
  );
}
