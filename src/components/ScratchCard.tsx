import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Check, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../data/birthdayConfig';
import { fireCelebratoryConfetti } from '../utils/confetti';
import { sound } from '../utils/soundEffects';

export function ScratchCard() {
  const { scratchCard } = birthdayConfig;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isScratched, setIsScratched] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize canvas with cute pastel peach/capybara foil
  const initFoilCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    ctx.globalCompositeOperation = 'source-over';

    // Cute pastel peach & cream gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#FFB8A1');
    gradient.addColorStop(0.5, '#FFD4C5');
    gradient.addColorStop(1, '#FFB8A1');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Cute polka-dot pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let x = 15; x < width; x += 30) {
      for (let y = 15; y < height; y += 30) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Foil text in Hebrew
    ctx.font = 'bold 16px "Varela Round", "Rubik", sans-serif';
    ctx.fillStyle = '#4D443E';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(scratchCard.foilLabel, width / 2, height / 2);

    ctx.font = '12px "Varela Round", sans-serif';
    ctx.fillStyle = 'rgba(77, 68, 62, 0.75)';
    ctx.fillText('שפשפי עם האצבע או העכבר 🐾', width / 2, height / 2 + 26);

    setIsScratched(false);
    setScratchProgress(0);
  }, [scratchCard.foilLabel]);

  useEffect(() => {
    initFoilCanvas();

    const handleResize = () => {
      initFoilCanvas();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initFoilCanvas]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2, false);
    ctx.fill();

    checkProgress();
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sampleStep = 8;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;
    let totalSamples = 0;

    for (let i = 3; i < pixels.length; i += 4 * sampleStep) {
      totalSamples++;
      if (pixels[i] < 128) {
        transparentCount++;
      }
    }

    const ratio = Math.round((transparentCount / totalSamples) * 100);
    setScratchProgress(ratio);

    if (ratio >= 40) {
      setIsScratched(true);
      sound.playFanfare();
      fireCelebratoryConfetti();
    }
  };

  return (
    <section className="relative py-14 px-4 sm:px-6 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-peach-100 text-peach-500 font-varela text-xs font-semibold mb-2">
          <span>{scratchCard.tag}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-varela font-bold text-warmGray-800 mb-2">
          {scratchCard.title}
        </h2>
        <p className="text-sm text-warmGray-700/80 font-varela max-w-md mx-auto">
          {scratchCard.instruction}
        </p>
      </div>

      {/* Fluffy Card */}
      <div className="fluffy-card p-6 sm:p-8 relative overflow-hidden shadow-fluffy">
        <div className="relative w-full min-h-[220px] rounded-3xl overflow-hidden flex items-center justify-center bg-cream-100 border-2 border-peach-200/80 p-6 select-none">
          {/* Secret Revealed underneath */}
          <div className="text-center space-y-2 z-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach-200/60 text-peach-600 text-xs font-varela font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{scratchCard.revealTitle}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-varela font-bold text-warmGray-800 leading-snug">
              {scratchCard.revealFood}
            </h3>
            <p className="text-xs sm:text-sm text-warmGray-700 font-varela leading-relaxed max-w-md mx-auto">
              {scratchCard.revealDetails}
            </p>
          </div>

          {/* Canvas Foil layer */}
          <AnimatePresence>
            {!isScratched && (
              <motion.canvas
                ref={canvasRef}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                onMouseDown={(e) => {
                  setIsDrawing(true);
                  scratch(e.clientX, e.clientY);
                }}
                onMouseMove={(e) => {
                  if (isDrawing) scratch(e.clientX, e.clientY);
                }}
                onMouseUp={() => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
                onTouchStart={(e) => {
                  setIsDrawing(true);
                  if (e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
                }}
                onTouchMove={(e) => {
                  if (isDrawing && e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
                }}
                onTouchEnd={() => setIsDrawing(false)}
                className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Progress bar and reset */}
        <div className="mt-5 flex items-center justify-between text-xs font-varela text-warmGray-700">
          <div className="flex items-center gap-2">
            <span>גילוי:</span>
            <div className="w-28 h-2.5 rounded-full bg-cream-200 overflow-hidden">
              <div
                className="h-full bg-peach-400 transition-all duration-200 rounded-full"
                style={{ width: `${isScratched ? 100 : scratchProgress}%` }}
              />
            </div>
            <span className="font-bold text-peach-500">{isScratched ? 100 : scratchProgress}%</span>
          </div>

          {isScratched ? (
            <div className="flex items-center gap-2">
              <span className="text-matcha-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> נחשף!
              </span>
              <button
                onClick={initFoilCanvas}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-peach-100 hover:bg-peach-200 text-peach-600 transition-colors font-semibold"
              >
                <RefreshCw className="w-3 h-3" />
                <span>שוב 🦫</span>
              </button>
            </div>
          ) : (
            <span className="text-warmGray-700/60">גרדי 40% כדי לראות הכל!</span>
          )}
        </div>
      </div>
    </section>
  );
}
