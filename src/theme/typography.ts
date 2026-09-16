import type { TypographyVariantsOptions } from '@mui/material/styles';

const displayFont = "'Aloha Chunky', cursive";
const bodyFont = "'Nunito', sans-serif";

export const typography: TypographyVariantsOptions = {
  fontFamily: bodyFont,
  h1: { fontFamily: displayFont, fontWeight: 400, letterSpacing: 0.5 },
  h2: { fontFamily: displayFont, fontWeight: 400, letterSpacing: 0.5 },
  h3: { fontFamily: displayFont, fontWeight: 400, letterSpacing: 0.5 },
  h4: { fontFamily: bodyFont, fontWeight: 800 },
  h5: { fontFamily: bodyFont, fontWeight: 800 },
  h6: { fontFamily: bodyFont, fontWeight: 700 },
  button: { fontFamily: bodyFont, fontWeight: 700, textTransform: 'none' },
};

export const fontFamilies = { displayFont, bodyFont };
