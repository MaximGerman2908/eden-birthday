/**
 * Calendar invitation helpers for Golden Ticket RSVP.
 * Generates RFC 5545 compliant .ics files client-side and Google Calendar web URLs with UTF-8 Hebrew support.
 */

interface CalendarEventArgs {
  title: string;
  description: string;
  location: string;
  startIso: string;
  endIso: string;
}

function formatToIcsDate(isoString: string): string {
  const clean = isoString.replace(/[-:]/g, '');
  return clean.includes('T') ? clean.slice(0, 15) : clean;
}

/**
 * Creates and triggers browser download of an .ics calendar file with UTF-8 encoding.
 */
export function downloadIcsFile({ title, description, location, startIso, endIso }: CalendarEventArgs) {
  const dtStart = formatToIcsDate(startIso);
  const dtEnd = formatToIcsDate(endIso);
  const dtStamp = formatToIcsDate(new Date().toISOString().replace(/\.\d{3}Z$/, ''));
  const uid = `eden-birthday-${Date.now()}@celebration`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Eden Birthday Invitation//Cute Pass//HE',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}Z`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY;CHARSET=UTF-8:${title}`,
    `DESCRIPTION;CHARSET=UTF-8:${description.replace(/\n/g, '\\n')}`,
    `LOCATION;CHARSET=UTF-8:${location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT3H',
    'ACTION:DISPLAY',
    'DESCRIPTION:תזכורת: יום הולדת לדנדן מתחיל בקרוב!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', "Dandan-Birthday-Party.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates a direct Google Calendar "Add Event" URL.
 */
export function getGoogleCalendarUrl({ title, description, location, startIso, endIso }: CalendarEventArgs): string {
  const dtStart = formatToIcsDate(startIso);
  const dtEnd = formatToIcsDate(endIso);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    location: location,
    dates: `${dtStart}/${dtEnd}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
