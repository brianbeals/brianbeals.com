// Brian Beals, LLC identifiers, as SAM.gov carries them (verified 2026-10-30).
// Every full NAICS list on the site reads from here, so the footer and
// /accessibility can't drift from SAM or from each other. /accessibility/federal
// shows a deliberate subset and /accessibility/title-ii names three with titles;
// those keep their own wording. Primary first.
export const UEI = "NJLEHNAQATJ6";
export const CAGE = "22XM3";
export const NAICS = ["541512", "541511", "541519", "541611", "541618", "541990", "518210"] as const;
export const NAICS_LIST = NAICS.join(", ");

// The 15-minute call scheduler (Proton Calendar, Mon-Thu 9-11 ET, 15-minute slots;
// added 2026-10-31). Every "Book a 15-minute call" link goes here, in the same tab,
// through BookCallLink. The contact form stays as the fallback.
export const BOOKING_URL = "https://calendar.proton.me/bookings#-2p9vSQNk6QflMOMum1ti6ZjYR0PDXrUuYdwji4pOlE=";
