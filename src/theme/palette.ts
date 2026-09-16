import type { PaletteOptions } from '@mui/material/styles';

/** Raw brand hues that don't map to a standard MUI palette slot. */
export const brandColors = {
  orange: '#F6A93B',
  yellow: '#F7EB8C',
  green: '#61834D',
  lightBlue: '#9DC1E6',
  mediumBlue: '#5B85C4',
  lavender: '#AEADD6',
  purple: '#543787',
} as const;

export const palette: PaletteOptions = {
  primary: {
    main: brandColors.orange,
    light: '#FFC875',
    dark: '#D98A1A',
    contrastText: '#3A2A12',
  },
  secondary: {
    main: brandColors.green,
    light: '#86A472',
    dark: '#46612F',
    contrastText: '#FFFFFF',
  },
  info: {
    main: brandColors.mediumBlue,
  },
  background: {
    default: '#FFFDF7',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#2E2A22',
    secondary: '#5C574C',
  },
  brand: brandColors,
};
