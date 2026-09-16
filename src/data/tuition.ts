// PLACEHOLDER CONTENT — replace with real pricing before launch.
export interface TuitionTier {
  id: string;
  program: string;
  fullTime: string;
  partTime: string;
}

export const tuitionTiers: TuitionTier[] = [
  { id: 'infant', program: 'Little Sprouts (6 wks – 12 mo)', fullTime: '$320 / week', partTime: '$220 / week' },
  { id: 'toddler', program: 'Busy Bees (1 – 2 yrs)', fullTime: '$290 / week', partTime: '$200 / week' },
  { id: 'preschool', program: 'Curious Minds (3 – 4 yrs)', fullTime: '$260 / week', partTime: '$180 / week' },
  { id: 'prek', program: 'Rising Stars (4 – 5 yrs)', fullTime: '$250 / week', partTime: '$170 / week' },
];

export const closures = [
  { date: 'Jan 1', holiday: "New Year's Day" },
  { date: 'May 25', holiday: 'Memorial Day' },
  { date: 'Jul 4', holiday: 'Independence Day' },
  { date: 'Sep 7', holiday: 'Labor Day' },
  { date: 'Nov 26–27', holiday: 'Thanksgiving Break' },
  { date: 'Dec 24–25', holiday: 'Christmas Break' },
];

export const tuitionFaqs = [
  {
    question: 'Is a registration fee required?',
    answer: 'Yes, a one-time $75 registration fee is due at enrollment to hold your child’s spot.',
  },
  {
    question: 'Do you offer sibling discounts?',
    answer: 'Yes, families enrolling more than one child receive a 10% discount on the second child’s tuition.',
  },
  {
    question: 'What is your late pickup policy?',
    answer: 'A grace period of 10 minutes is provided; after that, a small late fee applies per 15-minute increment.',
  },
];
