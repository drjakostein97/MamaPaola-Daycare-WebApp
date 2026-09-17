import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { vi } from 'vitest';
import { theme } from '../theme';
import { AuthContext } from '../auth/AuthContext';
import type { AuthContextValue } from '../auth/AuthContext';
import i18n from '../i18n';

export function createAuthValue(overrides: Partial<AuthContextValue> = {}): AuthContextValue {
  return {
    isAuthenticated: false,
    token: null,
    displayName: null,
    login: vi.fn(),
    logout: vi.fn(),
    ...overrides,
  };
}

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  authValue?: Partial<AuthContextValue>;
  route?: string;
}

export function renderWithProviders(ui: ReactElement, options: RenderWithProvidersOptions = {}) {
  const { authValue, route = '/', ...renderOptions } = options;
  const resolvedAuthValue = createAuthValue(authValue);

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <AuthContext.Provider value={resolvedAuthValue}>
            <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
          </AuthContext.Provider>
        </I18nextProvider>
      </ThemeProvider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }), authValue: resolvedAuthValue };
}
