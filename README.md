# 🐑🦫🐪 Dandan's Birthday Celebration & VIP Invitation

A bespoke, playful, and heartwarming birthday web application curated for Dandan. Built with Vite, React 19, TypeScript, Tailwind CSS, Framer Motion, and HTML5 Canvas.

Features adorable sheep 🐑, chill capybaras with oranges on their heads 🦫🍊, and festive camels 🐪 set in a soft pastel aesthetic (cream, peach, matcha). The site is rendered in native Hebrew (RTL), while code comments, tooling, and documentation are strictly in English.

Hosted statically on **GitHub Pages**:  
🔗 **[Live Website](https://maximgerman2908.github.io/eden-birthday/)**

---

## 🌸 Key Features

1. **Playful Hero Greeting (Hebrew / RTL):**
   - Bouncing trio of animated animal stickers (sheep, capybara with orange, and camel).
   - Bouncy Hebrew typography welcoming Dandan (*"יום הולדת שמח, דנדן! 🎉"*).
   - High-contrast, vibrant primary CTA button with fluid scroll cue.
   - Ambient background featuring drifting pastel clouds, gentle glow meshes, and floating animal emojis.

2. **Heartfelt Love Letter (מכתב אהבה):**
   - Soft fluffy card styling (`.fluffy-card`) with sincere, funny, and deeply affectionate Hebrew paragraphs.
   - Background animal stamp watermarks and a playful postscript from the camels.

3. **Interactive 3D "Golden Ticket" VIP Pass:**
   - 3D perspective tilt driven by mouse movements and mobile touch drag.
   - Displays event date, time (*"20:00 בדיוק (בלי איחורים של נסיכות!)"*), dress code, and mystery clue destination (*"סוד של הגמל 🐪"*).
   - **One-Click Calendar RSVP ("ברור שאני באה! 💖"):**
     - Triggers a multi-velocity pastel confetti explosion.
     - Confirms ticket status and provides client-side RFC 5545 `.ics` download for Apple/Outlook Calendar with full UTF-8 Hebrew encoding.
     - Direct Google Calendar deep link with pre-populated Hebrew event details.
   - **Truly Unpressable Dodging "Decline" Button:**
     - Instantly evades mouse hovers, pointer presses, and mobile taps before contact can be made.
     - Cycles through dynamic witty Israeli Hebrew responses (*"הקפיברה הטילה וטו"*, *"הגמל ירק על הכפתור"*, *"שגיאה 404: אי אפשר לסרב לדייט עם חבר שלך"*).
     - Live counter displaying foiled rejection attempts.

4. **Capybara Scratch-Off Clue Card (כרטיס גירוד סודי):**
   - Interactive HTML5 `<canvas>` scratch-off card with a pastel polka-dot foil layer.
   - Real-time scratch calculation for finger swipes and mouse drags.
   - Automatically bursts confetti and reveals secret chef's tasting menu intel once 40% of the card is scratched off.
   - Replay button allowing her to scratch again anytime.

5. **Mystery Itinerary Timeline (הלו״ז החגיגי):**
   - Step-by-step chronology with sheep, capybara, and camel milestones.
   - Unlocked stops display times, titles, detailed descriptions, and location tags.
   - Locked midnight surprise card features a 4-column responsive countdown widget (`days:hours:minutes:seconds`) that never clips or overflows in RTL.

---

## 🛠️ How to Customize Plans, Dates & Secrets

All personal dates, times, locations, clues, and love notes live in a single typed configuration file:  
👉 **[`src/data/birthdayConfig.ts`](./src/data/birthdayConfig.ts)**

```typescript
export const birthdayConfig: BirthdayConfig = {
  recipient: {
    firstName: "דנדן",
    nickname: "דנדן",
  },
  ticket: {
    date: "יום שבת, 6 בדצמבר 2026",
    time: "20:00 בדיוק",
    dressCode: "לוק חמוד שמרגיש נוח ומאפשר לאכול בלי חשבון 👗✨",
    venueStatus: "mystery", // Change to "revealed" when ready to reveal!
    venueName: "Secret Restaurant Name",
    venueMysteryClue: "מקום חמים ורומנטי...",
    // ...
  },
  itinerary: {
    timeline: [
      // Flip 'status' from 'locked' to 'unlocked' to reveal milestones!
    ]
  }
};
```

---

## 🚀 Quick Start & Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (port 5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview local production build
npm run preview
```

---

## 🌐 Deploying Updates to GitHub Pages

Whenever you edit `birthdayConfig.ts` or make changes, deploy the latest build to GitHub Pages in one command:

```bash
npm run deploy
```

This runs the TypeScript check, builds the production bundle into `dist/`, and publishes directly to the `gh-pages` branch on your GitHub repository (`MaximGerman2908/eden-birthday`).
