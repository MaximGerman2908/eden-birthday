import { useState, useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Shirt, 
  MapPin, 
  CheckCircle2, 
  Download, 
  ExternalLink,
  Sparkles,
  PartyPopper
} from 'lucide-react';
import { birthdayConfig } from '../data/birthdayConfig';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendar';
import { fireCelebratoryConfetti } from '../utils/confetti';
import { sound } from '../utils/soundEffects';

const DODGE_BUTTON_LABELS = [
  "אממ... לא מתאים לי 🙄",
  "אופס! ברחתי 💨",
  "עדיין מנסה?! 😂",
  "הקפיברה לא מרשה 🦫",
  "אין מצב בעולם 😜",
  "חחחחח פספסת! 🐑",
  "תלחצי על הכפתור הכתום! 💖"
];

export function GoldenTicket() {
  const { ticket } = birthdayConfig;
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [declineOffset, setDeclineOffset] = useState({ x: 0, y: 0 });
  const [declineMessage, setDeclineMessage] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Truly Unpressable Dodging Handler: triggers instantly on hover, touch, pointer-down
  const handleDeclineEvade = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Substantial leaps in random directions
    sound.playBoing();
    const randomAngle = Math.random() * Math.PI * 2;
    const distance = 130 + Math.random() * 80;
    const jumpX = Math.cos(randomAngle) * distance;
    const jumpY = Math.sin(randomAngle) * 55;

    setDeclineOffset({ x: jumpX, y: jumpY });
    setAttemptCount(prev => prev + 1);
    setDeclineMessage(ticket.wittyDeclineResponses[attemptCount % ticket.wittyDeclineResponses.length]);
  };

  const handleConfirmRSVP = () => {
    sound.playFanfare();
    setIsConfirmed(true);
    fireCelebratoryConfetti();
  };

  const calendarArgs = {
    title: ticket.calendarTitle,
    description: ticket.calendarDescription,
    location: ticket.calendarLocation,
    startIso: ticket.eventStartIso,
    endIso: ticket.eventEndIso,
  };

  const currentDeclineText = DODGE_BUTTON_LABELS[attemptCount % DODGE_BUTTON_LABELS.length];

  return (
    <section id="invitation-section" className="relative py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-peach-100 text-peach-600 font-varela text-xs font-bold mb-2 border border-peach-200"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>הזמנה רשמית מהקפיברה</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-varela font-bold text-warmGray-900"
        >
          {ticket.title}
        </motion.h2>
      </div>

      {/* 3D Tilt Card */}
      <div style={{ perspective: '1200px' }} className="w-full flex justify-center">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-cream-100 via-white to-peach-50 border-2 border-peach-200/90 p-6 sm:p-10 shadow-cute-card transition-shadow duration-300"
        >
          {/* Cute animal stickers on ticket corners */}
          <div className="absolute top-4 left-4 text-3xl select-none opacity-80 animate-wiggle-slow">
            🦫
          </div>
          <div className="absolute top-4 right-4 text-3xl select-none opacity-80">
            🐑
          </div>

          {/* Ticket Header */}
          <div className="text-center border-b-2 border-dashed border-peach-200/80 pb-6 mb-6 pt-2">
            <span className="inline-block px-3 py-1 rounded-full bg-peach-100 text-peach-600 text-xs font-mono font-bold tracking-wider mb-2 border border-peach-200">
              כרטיס כניסה מיוחד • {ticket.ticketNumber}
            </span>
            <h3 className="text-2xl sm:text-3xl font-varela font-bold text-warmGray-900">
              מוזמנת ראשית: <span className="text-peach-500">{ticket.guestName}</span>
            </h3>
            <p className="text-xs text-warmGray-700 mt-1 font-varela">
              מארח החגיגות: <strong>{ticket.hostName}</strong>
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Date */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-peach-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-peach-100 flex items-center justify-center shrink-0 text-peach-600">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-warmGray-700 font-medium block">תאריך:</span>
                <span className="text-sm sm:text-base font-varela font-bold text-warmGray-900">
                  {ticket.date}
                </span>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-peach-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-peach-100 flex items-center justify-center shrink-0 text-peach-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-warmGray-700 font-medium block">שעה:</span>
                <span className="text-sm sm:text-base font-varela font-bold text-warmGray-900">
                  {ticket.time}
                </span>
              </div>
            </div>

            {/* Dress code */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-peach-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-peach-100 flex items-center justify-center shrink-0 text-peach-600">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-warmGray-700 font-medium block">קוד לבוש:</span>
                <span className="text-sm sm:text-base font-varela font-bold text-warmGray-900">
                  {ticket.dressCode}
                </span>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-peach-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-peach-100 flex items-center justify-center shrink-0 text-peach-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-warmGray-700 font-medium">היעד:</span>
                  <span className="px-1.5 py-0.5 rounded bg-matcha-100 text-matcha-400 text-[10px] font-bold">
                    סוד של הגמל 🐪
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-varela font-medium text-warmGray-900 leading-snug">
                  {ticket.venueMysteryClue}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive RSVP Area */}
          <div className="border-t-2 border-dashed border-peach-200/80 pt-6">
            {!isConfirmed ? (
              <div className="flex flex-col items-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative min-h-[65px]">
                  {/* Primary Confirm Button (High-contrast rich coral with white text) */}
                  <button
                    onClick={handleConfirmRSVP}
                    className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#E25530] hover:bg-[#CA4421] text-white font-varela font-extrabold text-base sm:text-lg shadow-pill-pop hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 z-10 border border-[#D54521]"
                  >
                    <PartyPopper className="w-5 h-5" />
                    <span>{ticket.acceptButton}</span>
                  </button>

                  {/* Truly Unpressable Dodging Decline Button */}
                  <motion.button
                    animate={{ x: declineOffset.x, y: declineOffset.y }}
                    transition={{ type: 'spring', stiffness: 600, damping: 18 }}
                    onMouseEnter={handleDeclineEvade}
                    onPointerDown={handleDeclineEvade}
                    onTouchStart={handleDeclineEvade}
                    onClick={handleDeclineEvade}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full border-2 border-peach-300 bg-white text-warmGray-800 font-varela text-sm font-bold shadow-sm hover:bg-peach-50 select-none cursor-not-allowed"
                  >
                    {currentDeclineText}
                  </motion.button>
                </div>

                {/* Counter of thwarted attempts */}
                {attemptCount > 0 && (
                  <div className="mt-3 text-xs text-warmGray-700 font-varela font-medium">
                    ניסיונות סירוב שסוכלו על ידי הקפיברה: <strong className="text-peach-600 font-bold">{attemptCount}</strong> 🚫
                  </div>
                )}

                {/* Witty decline message popup */}
                {declineMessage && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={declineMessage + attemptCount}
                    className="mt-3 text-sm font-varela font-bold text-peach-600 text-center bg-peach-100 px-5 py-2.5 rounded-full border border-peach-300 shadow-sm"
                  >
                    {declineMessage}
                  </motion.p>
                )}
              </div>
            ) : (
              /* Confirmed State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-matcha-100 border-2 border-matcha-300 text-matcha-400 font-varela font-extrabold text-base shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{ticket.confirmedBadge}</span>
                </div>

                <p className="text-sm text-warmGray-800 font-varela font-medium">
                  האירוע נקבע רשמית! הוסיפי אותו ישירות ליומן שלך בטלפון:
                </p>

                {/* Calendar Export CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => downloadIcsFile(calendarArgs)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-peach-50 border-2 border-peach-300 text-warmGray-900 font-varela text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <Download className="w-4 h-4 text-peach-600" />
                    <span>שמירה ליומן Apple / Outlook (.ics)</span>
                  </button>

                  <a
                    href={getGoogleCalendarUrl(calendarArgs)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#E25530] hover:bg-[#CA4421] text-white font-varela text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-pill-pop"
                  >
                    <ExternalLink className="w-4 h-4 text-white" />
                    <span>הוספה ל-Google Calendar</span>
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
