// PLACEHOLDER CONTENT — replace with real staff bios/photos before launch.
// Translatable text (title, bio, certifications) lives in src/i18n/locales/*.json,
// keyed by `id` — see data.staff.* keys. `name` is a proper noun and stays as-is.
export interface StaffMember {
  id: string;
  name: string;
}

export const staff: StaffMember[] = [
  { id: 'paola', name: 'Paola Ramirez' },
  { id: 'maria', name: 'Maria Gonzalez' },
  { id: 'james', name: 'James Whitfield' },
  { id: 'aisha', name: 'Aisha Bello' },
];
