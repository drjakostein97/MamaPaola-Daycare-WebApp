import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StaffTable } from './StaffTable';
import type { StaffRecord } from '../../services/types';

const staffMember: StaffRecord = {
  id: 1,
  username: 'admin',
  displayName: 'Admin',
  createdAt: '2026-09-01T12:00:00Z',
};

describe('StaffTable', () => {
  it('renders the table shell even with zero staff, unlike the other admin tables', () => {
    render(<StaffTable staff={[]} />);

    // StaffTable has no empty-state branch — it always shows headers, just no body rows.
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.queryAllByRole('row')).toHaveLength(1); // header row only
  });

  it('renders username/displayName/created for each staff member, no password content', () => {
    render(<StaffTable staff={[staffMember]} />);

    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.queryByText(/password/i)).not.toBeInTheDocument();
  });
});
