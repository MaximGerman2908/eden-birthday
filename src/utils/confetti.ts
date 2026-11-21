import confetti from 'canvas-confetti';

/**
 * פיצוץ קונפטי חמוד וצבעוני בגווני פסטל, לבבות וכוכבים
 */
export function fireCelebratoryConfetti() {
  const count = 220;
  const defaults = {
    origin: { y: 0.65 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // צבעי פסטל חמודים: אפרסק, שמנת, מנטה, ורוד בייבי
  fire(0.25, {
    spread: 35,
    startVelocity: 50,
    colors: ['#FF9473', '#FFB8A1', '#FFD4C5'],
  });

  fire(0.2, {
    spread: 60,
    colors: ['#ABC9AC', '#CCDFCD', '#FFF2E5'],
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#F87550', '#A4D0F2', '#FFD4C5'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#FF9473', '#F87550', '#ABC9AC'],
    shapes: ['star', 'circle'],
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 140,
    startVelocity: 45,
    colors: ['#FFE6D1', '#FFB8A1'],
  });
}
