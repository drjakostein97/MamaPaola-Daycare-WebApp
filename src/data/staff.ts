// PLACEHOLDER CONTENT — replace with real staff bios/photos before launch.
export interface StaffMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  certifications: string[];
}

export const staff: StaffMember[] = [
  {
    id: 'paola',
    name: 'Paola Ramirez',
    title: 'Founder & Director',
    bio: 'Paola founded the center with a mission to give every family a warm, trustworthy second home for their child.',
    certifications: ['Early Childhood Education, B.A.', 'CPR & First Aid Certified'],
  },
  {
    id: 'maria',
    name: 'Maria Gonzalez',
    title: 'Lead Infant Teacher',
    bio: 'Maria has spent over a decade specializing in infant care, focused on responsive, individualized attention.',
    certifications: ['CDA Credential', 'Infant/Toddler Specialist'],
  },
  {
    id: 'james',
    name: 'James Whitfield',
    title: 'Preschool Lead Teacher',
    bio: 'James brings hands-on science and art projects to life, helping kids build curiosity and confidence.',
    certifications: ['B.A. Elementary Education', 'CPR & First Aid Certified'],
  },
  {
    id: 'aisha',
    name: 'Aisha Bello',
    title: 'Pre-K Lead Teacher',
    bio: 'Aisha focuses on kindergarten readiness, blending structured lessons with plenty of joyful play.',
    certifications: ['M.Ed. Early Childhood', 'CDA Credential'],
  },
];
