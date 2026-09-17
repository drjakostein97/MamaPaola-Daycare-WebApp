import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import i18n from '../i18n';

describe('NotFoundPage', () => {
  it('renders English content by default', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Oops! We couldn't find that page.")).toBeInTheDocument();
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  it('renders Spanish content after switching language', async () => {
    await i18n.changeLanguage('es');

    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('¡Ups! No pudimos encontrar esa página.')).toBeInTheDocument();
    expect(screen.getByText('Volver al Inicio')).toBeInTheDocument();
  });
});
