/**
 * Main birthday configuration for Dandan.
 * Single source of truth for all Hebrew copy, event dates, clues, and mystery milestones.
 */

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
  status: 'unlocked' | 'locked';
  animal: 'sheep' | 'capybara' | 'camel' | 'cake';
  badge: string;
  locationName?: string;
  unlockDate?: string; // Target ISO date string for live countdown
  mysteryHint?: string;
}

export interface BirthdayConfig {
  recipient: {
    firstName: string;
    nickname: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    nameHighlight: string;
    titleEnd: string;
    subtitle: string;
    ctaButton: string;
  };
  loveNote: {
    tag: string;
    title: string;
    paragraphs: string[];
    signature: string;
    psNote: string;
  };
  ticket: {
    title: string;
    ticketNumber: string;
    guestName: string;
    hostName: string;
    date: string;
    time: string;
    dressCode: string;
    venueStatus: 'mystery' | 'revealed';
    venueName?: string;
    venueAddress?: string;
    venueMysteryClue: string;
    eventStartIso: string;
    eventEndIso: string;
    calendarTitle: string;
    calendarDescription: string;
    calendarLocation: string;
    acceptButton: string;
    confirmedBadge: string;
    declineButton: string;
    wittyDeclineResponses: string[];
  };
  scratchCard: {
    tag: string;
    title: string;
    instruction: string;
    foilLabel: string;
    revealTitle: string;
    revealFood: string;
    revealDetails: string;
  };
  itinerary: {
    tag: string;
    title: string;
    subtitle: string;
    timeline: ItineraryItem[];
  };
  footer: {
    quote: string;
    signature: string;
  };
}

export const birthdayConfig: BirthdayConfig = {
  recipient: {
    firstName: "דנדן",
    nickname: "דנדן",
  },
  hero: {
    badge: "✨ יום הולדת לבחורה הכי מיוחדת בעולם ✨",
    titleStart: "יום הולדת שמח,",
    nameHighlight: "דנדן!",
    titleEnd: "🎉",
    subtitle: "הכבשים מתרגשות, הקפיברות שמו תפוז על הראש והגמלים כבר התלבשו חגיגי. הכנתי לך ערב מלא בפינוקים, צחוקים ואוכל טעים בטירוף! 🐑🦫🐪",
    ctaButton: "תראי לי מה מחכה לנו! 👇",
  },
  loveNote: {
    tag: "מכתב קטן מהלב 💌",
    title: "לדנדן, המלכה של הכבשים והקפיברות 👑",
    paragraphs: [
      "עוד שנה עברה ושוב הוכחת שאת הבחורה הכי מיוחדת, מצחיקה, יפה ומרגשת שיש בעולם הזה. את הופכת כל יום רגיל להרפתקה כיפית ואת תמיד גורמת לי לחייך בלי הפסקה.",
      "אז היום הכל מוקדש רק לך: בלי דאגות, בלי לחץ, רק רוגע ברמה של קפיברה במעיין חם ואושר צמרירי כמו עדר כבשים מתוקות.",
      "אני אוהב אותך עד השמיים ובחזרה, והערב אנחנו הולכים לחגוג אותך בדיוק כמו שמגיע לך!"
    ],
    signature: "שלך תמיד באהבה ענקית, מקסים 💖",
    psNote: "נ.ב: כן, גם הגמלים מוסרים מזל טוב ענקי! 🐪",
  },
  ticket: {
    title: "כרטיס VIP רשמי לחגיגה 🎟️",
    ticketNumber: "DANDAN-BDAY-2026",
    guestName: "דנדן (האישה הכי יפה בעולם)",
    hostName: "מקסים",
    date: "יום שבת, 6 בדצמבר 2026",
    time: "20:00 בדיוק (בלי איחורים של נסיכות!)",
    dressCode: "לוק חמוד שמרגיש נוח ומאפשר לאכול בלי חשבון 👗✨",
    venueStatus: "mystery",
    venueName: "מסעדת שף מהממת",
    venueAddress: "מיקום סודי",
    venueMysteryClue: "מקום חמים ורומנטי עם אווירה קסומה והאוכל שאת הכי הכי אוהבת בעולם 🍷🍝",
    eventStartIso: "2026-12-06T20:00:00",
    eventEndIso: "2026-12-06T23:30:00",
    calendarTitle: "🎂 יום הולדת לדנדן - ארוחת ערב וחגיגות!",
    calendarDescription: "ערב יום הולדת מיוחד לדנדן עם מקסים. קוד לבוש: יפה ונוח. שולחן שמור ומלא הפתעות!",
    calendarLocation: "סוד מוחלט (הקפיברה תוביל אותנו)",
    acceptButton: "ברור שאני באה! 💖",
    confirmedBadge: "יששש! המקום של דנדן שמור ונעול 🥳",
    declineButton: "אממ... לא מתאים לי 🙄",
    wittyDeclineResponses: [
      "חחחחחח יפה שניסית! הכפתור הזה הוא רק ליופי 😉",
      "הקפיברה הטילה וטו: ביטולים לא יתקבלו במערכת! 🦫",
      "הכבשים כבר תפסו את השולחן, אין דרך חזרה! 🐑",
      "הגמל ירק על כפתור הסירוב, הוא לא עובד יותר 🐪",
      "את תקועה איתי ועם ערב מושלם, סורי! 💕",
      "שגיאה 404: אי אפשר לסרב לדייט עם חבר שלך 🤪",
      "ניסיון יפה! אבל אין סיכוי בעולם שתצליחי ללחוץ פה 😂"
    ],
  },
  scratchCard: {
    tag: "כרטיס גירוד סודי 🐾",
    title: "מה אוכלים הערב? 🍽️",
    instruction: "גרדי עם האצבע או עם העכבר על הפרווה של הקפיברה כדי לגלות את הרמז לארוחה!",
    foilLabel: "גרדי אותי כדי לגלות! 🦫✨",
    revealTitle: "קפיברה שף חושפת את התפריט:",
    revealFood: "ארוחת שף אינטימית עם מנות מושחתות וקינוחים מטורפים 🍝🍰",
    revealDetails: "כולל ייין מעולה, אווירה כיפית והפתעה מתוקה בסוף שנאפתה במיוחד בשבילך!",
  },
  itinerary: {
    tag: "הלו״ז החגיגי ⏰",
    title: "איך היום הולדת ייראה?",
    subtitle: "שלב אחרי שלב בדרך ליום הכי שמח בשנה",
    timeline: [
      {
        id: "step-1",
        time: "18:30",
        title: "איסוף מפנק ונשנוש ראשון 🐑",
        description: "מגיעים לאסוף אותך, שמים שירים שאת אוהבת, מרימים כוס יין ראשונה ומתחילים לחייך.",
        status: "unlocked",
        animal: "sheep",
        badge: "מתחילים!",
        locationName: "בפתח הבית שלך",
      },
      {
        id: "step-2",
        time: "20:00",
        title: "ארוחת החלומות של דנדן 🦫",
        description: "שולחן מוזמן, נרות, אווירה קסומה והמנות הכי טעימות שיש בעיר.",
        status: "unlocked",
        animal: "capybara",
        badge: "האירוע המרכזי",
        locationName: "המסעדה הסודית",
      },
      {
        id: "step-3",
        time: "22:30",
        title: "קוקטייל מול האורות עם הגמלים 🐪",
        description: "ממשיכים לספוט שקט ויפה לשתות משהו מתוק, לצחוק ולדבר עד אמצע הלילה.",
        status: "unlocked",
        animal: "camel",
        badge: "מתפנקים",
        locationName: "נוף לילי מיוחד",
      },
      {
        id: "step-4",
        time: "23:45",
        title: "מבצע סודי: משאלת חצות 🎂",
        description: "פרטי ההפתעה האחרונה חסומים ונעולים עד שהשעון יתקרב לחצות... רק קפיברות מורשות גישה!",
        status: "locked",
        animal: "cake",
        badge: "סודי ביותר",
        unlockDate: "2026-12-06T23:45:00",
        mysteryHint: "נפתח בדיוק בסוף הארוחה!",
      },
    ],
  },
  footer: {
    quote: "״קפיברות, כבשים וגמלים בעולם יש מלא, אבל דנדן מושלמת יש רק אחת בעולם.״",
    signature: "נבנה עם ים אהבה במיוחד ליום ההולדת של דנדן ❤️",
  },
};
