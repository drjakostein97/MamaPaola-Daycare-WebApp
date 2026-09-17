import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageToggle } from './LanguageToggle';
import i18n from '../../i18n';

describe('LanguageToggle', () => {
  it('shows "Español" by default (English mode)', () => {
    render(<LanguageToggle />);

    expect(screen.getByRole('button', { name: 'Español' })).toBeInTheDocument();
  });

  it('clicking switches to Spanish, updates the label, and syncs <html lang>', async () => {
    const user = userEvent.setup();
    render(<LanguageToggle />);

    await user.click(screen.getByRole('button', { name: 'Español' }));

    expect(await screen.findByRole('button', { name: 'English' })).toBeInTheDocument();
    expect(i18n.language).toBe('es');
    expect(document.documentElement.lang).toBe('es');
  });

  it('clicking again reverts to English', async () => {
    const user = userEvent.setup();
    render(<LanguageToggle />);

    await user.click(screen.getByRole('button', { name: 'Español' }));
    await user.click(await screen.findByRole('button', { name: 'English' }));

    expect(await screen.findByRole('button', { name: 'Español' })).toBeInTheDocument();
    expect(i18n.language).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });
});
