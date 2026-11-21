import { useRef } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { HeroGreeting } from './components/HeroGreeting';
import { LoveNote } from './components/LoveNote';
import { GoldenTicket } from './components/GoldenTicket';
import { ScratchCard } from './components/ScratchCard';
import { MysteryItinerary } from './components/MysteryItinerary';
import { Footer } from './components/Footer';

export default function App() {
  const ticketRef = useRef<HTMLDivElement | null>(null);

  const handleExploreClick = () => {
    const el = document.getElementById('invitation-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-cream-50 text-warmGray-800 font-varela selection:bg-peach-300 selection:text-warmGray-900">
      {/* Cute floating ambient background with pastel glows and floating animals */}
      <AmbientBackground />

      {/* Main Content Flow */}
      <div className="relative z-10 flex flex-col">
        {/* 1. Cute Hero Greeting in Hebrew with Bouncing Capybara, Sheep, & Camel */}
        <HeroGreeting onExploreClick={handleExploreClick} />

        {/* 2. Sweet & Funny Love Letter from the Heart */}
        <LoveNote />

        {/* 3. Official Cute VIP Pass Ticket with Calendar Sync & Dodging Decline Button */}
        <div ref={ticketRef}>
          <GoldenTicket />
        </div>

        {/* 4. Capybara Scratch-Off Clue Card */}
        <ScratchCard />

        {/* 5. Secret Birthday Timeline with Animals & Countdown Timer */}
        <MysteryItinerary />

        {/* 6. Warm Closing Footer */}
        <Footer />
      </div>
    </div>
  );
}
