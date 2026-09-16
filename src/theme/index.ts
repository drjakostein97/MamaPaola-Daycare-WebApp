import { createTheme } from '@mui/material/styles';
import { palette, brandColors } from './palette';
import { typography } from './typography';
import { components } from './components';

declare module '@mui/material/styles' {
  interface Palette {
    brand: typeof brandColors;
  }
  interface PaletteOptions {
    brand?: typeof brandColors;
  }
}

export const theme = createTheme({
  palette,
  typography,
  shape: { borderRadius: 16 },
  components,
});

export { brandColors };
