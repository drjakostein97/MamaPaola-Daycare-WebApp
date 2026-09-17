// PLACEHOLDER CONTENT — replace with real pricing before launch.
// Translatable text (program/fullTime/partTime, date/holiday, question/answer)
// lives in src/i18n/locales/*.json, keyed by `id` — see data.tuition.* keys.
export interface TuitionTier {
  id: string;
}

export const tuitionTiers: TuitionTier[] = [
  { id: 'infant' },
  { id: 'toddler' },
  { id: 'preschool' },
  { id: 'prek' },
];

export const closures = [
  { id: 'newYears' },
  { id: 'memorialDay' },
  { id: 'independenceDay' },
  { id: 'laborDay' },
  { id: 'thanksgiving' },
  { id: 'christmas' },
];

export const tuitionFaqs = [
  { id: 'registrationFee' },
  { id: 'siblingDiscount' },
  { id: 'latePickup' },
];
