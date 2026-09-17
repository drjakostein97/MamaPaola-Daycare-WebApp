// PLACEHOLDER CONTENT — replace with real business details before launch.
// Translatable text (tagline, hours labels, nav labels) lives in src/i18n/locales/*.json,
// keyed by the `id` fields below — see data.siteConfig.* keys.
export const siteConfig = {
  name: 'My Favorite Aunts',
  phone: '(555) 123-4567',
  email: 'hello@myfavoriteaunts.example',
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
