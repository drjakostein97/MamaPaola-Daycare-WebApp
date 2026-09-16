// PLACEHOLDER CONTENT — replace with real program details before launch.
export interface Program {
  id: string;
  name: string;
  ageRange: string;
  description: string;
  colorKey: 'orange' | 'yellow' | 'green' | 'lightBlue' | 'mediumBlue' | 'lavender' | 'purple';
}

export const programs: Program[] = [
  {
    id: 'infant',
    name: 'Little Sprouts',
    ageRange: '6 weeks – 12 months',
    description:
      'Gentle, responsive care with individualized feeding and nap schedules in a calm, sensory-rich room.',
    colorKey: 'lightBlue',
  },
  {
    id: 'toddler',
    name: 'Busy Bees',
    ageRange: '1 – 2 years',
    description:
      'Hands-on exploration, early language building, and lots of movement to support growing independence.',
    colorKey: 'yellow',
  },
  {
    id: 'preschool',
    name: 'Curious Minds',
    ageRange: '3 – 4 years',
    description:
      'Play-based learning with early literacy, math concepts, art, and social-emotional development.',
    colorKey: 'green',
  },
  {
    id: 'prek',
    name: 'Rising Stars',
    ageRange: '4 – 5 years',
    description:
      'Kindergarten-readiness curriculum focused on confidence, collaboration, and a love of learning.',
    colorKey: 'orange',
  },
];

export const curriculumPillars = [
  { title: 'Play-Based Learning', description: 'Structured play that builds real academic and social skills.' },
  { title: 'Social-Emotional Growth', description: 'Helping children understand feelings and build friendships.' },
  { title: 'Early Literacy & Math', description: 'Story time, phonics, and hands-on number sense every day.' },
  { title: 'Creative Expression', description: 'Art, music, and imaginative play woven into daily routines.' },
];

export const dailySchedule = [
  { time: '6:30 AM', activity: 'Arrival & Free Play' },
  { time: '8:00 AM', activity: 'Breakfast' },
  { time: '9:00 AM', activity: 'Morning Circle & Lessons' },
  { time: '10:30 AM', activity: 'Outdoor Play' },
  { time: '12:00 PM', activity: 'Lunch' },
  { time: '1:00 PM', activity: 'Nap / Quiet Time' },
  { time: '3:00 PM', activity: 'Snack & Centers' },
  { time: '4:30 PM', activity: 'Outdoor Play' },
  { time: '5:30 PM', activity: 'Wind Down & Pickup' },
];
