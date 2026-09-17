// PLACEHOLDER CONTENT — replace with real program details before launch.
// Translatable text (name/ageRange/description, pillar titles, schedule activities)
// lives in src/i18n/locales/*.json, keyed by `id` — see data.programs.* keys.
export interface Program {
  id: string;
  colorKey: 'orange' | 'yellow' | 'green' | 'lightBlue' | 'mediumBlue' | 'lavender' | 'purple';
}

export const programs: Program[] = [
  { id: 'infant', colorKey: 'lightBlue' },
  { id: 'toddler', colorKey: 'yellow' },
  { id: 'preschool', colorKey: 'green' },
  { id: 'prek', colorKey: 'orange' },
];

export const curriculumPillars = [
  { id: 'playBased' },
  { id: 'socialEmotional' },
  { id: 'literacyMath' },
  { id: 'creativeExpression' },
];

export const dailySchedule = [
  { id: 'arrival', time: '6:30 AM' },
  { id: 'breakfast', time: '8:00 AM' },
  { id: 'morningCircle', time: '9:00 AM' },
  { id: 'outdoorPlayAm', time: '10:30 AM' },
  { id: 'lunch', time: '12:00 PM' },
  { id: 'nap', time: '1:00 PM' },
  { id: 'snack', time: '3:00 PM' },
  { id: 'outdoorPlayPm', time: '4:30 PM' },
  { id: 'windDown', time: '5:30 PM' },
];
