import type { Components, Theme } from '@mui/material/styles';

export const components: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 999,
        paddingLeft: 24,
        paddingRight: 24,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 20,
        boxShadow: '0 8px 24px rgba(46, 42, 34, 0.08)',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 20,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: 700,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: '0 2px 12px rgba(46, 42, 34, 0.08)',
      },
    },
  },
};
