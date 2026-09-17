import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactSubmissionsTable } from './ContactSubmissionsTable';
import type { ContactSubmissionRecord } from '../../services/types';

const submission: ContactSubmissionRecord = {
  id: 1,
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '555-1234',
  message: 'Hello there',
  createdAt: '2026-09-01T12:00:00Z',
};

describe('ContactSubmissionsTable', () => {
  it('shows an empty-state message when there are no submissions', () => {
    render(<ContactSubmissionsTable submissions={[]} />);

    expect(screen.getByText('No contact submissions yet.')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders a row per submission with the expected columns', () => {
    render(<ContactSubmissionsTable submissions={[submission]} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Hello there')).toBeInTheDocument();
  });
});
