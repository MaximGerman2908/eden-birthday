import { useRef, useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { MagicCursorTrail } from './components/MagicCursorTrail';
import { FloatingToolbar } from './components/FloatingToolbar';
import { DiscoPartyMode } from './components/DiscoPartyMode';
import { HeroGreeting } from './components/HeroGreeting';
import { InteractiveCake } from './components/InteractiveCake';
import { FeedMascotsGame } from './components/FeedMascotsGame';
import { LoveMachine } from './components/LoveMachine';
import { LoveNote } from './components/LoveNote';
import { GoldenTicket } from './components/GoldenTicket';
import { ScratchCard } from './components/ScratchCard';
import { MysteryItinerary } from './components/MysteryItinerary';
import { Footer } from './components/Footer';

export default function App() {
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const [isDiscoActive, setIsDiscoActive] = useState(false);

  const handleExploreClick = () => {
    const el = document.getElementById('invitation-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-cream-50 text-warmGray-800 font-varela selection:bg-peach-300 selection:text-warmGray-900 overflow-x-hidden">
      {/* Floating Audio Controls */}
      <FloatingToolbar />

      {/* Magic Sparkle Cursor & Touch Trail */}
      <MagicCursorTrail />

      {/* Secret Disco Party Mode Easter Egg */}
      <DiscoPartyMode isActive={isDiscoActive} onClose={() => setIsDiscoActive(false)} />

      {/* Cute floating ambient background with pastel glows and floating animals */}
      <AmbientBackground />

      {/* Main Content Flow */}
      <div className="relative z-10 flex flex-col">
        {/* 1. Hero Greeting with Custom Illustrated Mascots & Easter Egg */}
        <HeroGreeting
          onExploreClick={handleExploreClick}
          onTriggerDisco={() => setIsDiscoActive(true)}
        />

        {/* 2. Interactive Birthday Cake with Blowable Candles & Secret Wish Certificate */}
        <InteractiveCake />

        {/* 3. Feed & Pet the Mascots Mini-Game */}
        <FeedMascotsGame />

        {/* 4. Why Dandan is the Best - Compliment Gumball Machine */}
        <LoveMachine />

        {/* 5. Sweet & Personal Love Note from the Heart */}
        <LoveNote />

        {/* 6. Official VIP Pass Ticket with Calendar Sync & Dodging Button */}
        <div ref={ticketRef}>
          <GoldenTicket />
        </div>

        {/* 7. Capybara Scratch-Off Clue Card */}
        <ScratchCard />

        {/* 8. Secret Birthday Timeline with Animals & Countdown Timer */}
        <MysteryItinerary />

        {/* 9. Warm Closing Footer */}
        <Footer />
      </div>
    </div>
  );
}
