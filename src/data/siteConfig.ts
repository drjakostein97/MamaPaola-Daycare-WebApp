// PLACEHOLDER CONTENT — this is a public portfolio snapshot, not a real business.
// Translatable text (tagline, hours labels, nav labels) lives in src/i18n/locales/*.json,
// keyed by the `id` fields below — see data.siteConfig.* keys.
export const siteConfig = {
  name: 'Mama Paola Daycare',
  phone: '(555) 123-4567',
  email: 'hello@mamapaoladaycare.example',
  address: {
    line1: '123 Sunshine Lane',
    city: 'Springfield',
    state: 'IL',
    zip: '62704',
  },
  hours: [
    { id: 'weekday' },
    { id: 'weekend' },
  ],
  social: {
    facebook: 'https://facebook.com/example',
    instagram: 'https://instagram.com/example',
  },
  nav: [
    { id: 'home', to: '/' },
    { id: 'about', to: '/about' },
    { id: 'programs', to: '/programs' },
    { id: 'gallery', to: '/gallery' },
    { id: 'staff', to: '/staff' },
    { id: 'tuition', to: '/tuition' },
    { id: 'contact', to: '/contact' },
  ],
};
