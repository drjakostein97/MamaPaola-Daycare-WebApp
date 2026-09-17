import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EnrollmentInquiriesTable } from './EnrollmentInquiriesTable';
import type { EnrollmentInquiryRecord } from '../../services/types';

const inquiry: EnrollmentInquiryRecord = {
  id: 1,
  parentName: 'Jane Doe',
  email: 'jane@example.com',
  phone: '555-1234',
  children: [
    { age: '4' },
    { age: '6' },
  ],
  preferredStartDate: '2026-10-01',
  notes: 'Some notes',
  createdAt: '2026-09-01T12:00:00Z',
};

describe('EnrollmentInquiriesTable', () => {
  it('shows an empty-state message when there are no inquiries', () => {
    render(<EnrollmentInquiriesTable inquiries={[]} />);

    expect(screen.getByText('No enrollment inquiries yet.')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders one row per inquiry with children joined as a list of ages', () => {
    render(<EnrollmentInquiriesTable inquiries={[inquiry]} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('4, 6')).toBeInTheDocument();
  });
});
