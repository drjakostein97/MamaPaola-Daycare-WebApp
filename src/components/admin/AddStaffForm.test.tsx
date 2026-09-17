import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddStaffForm } from './AddStaffForm';
import { createStaff } from '../../services/adminService';
import { renderWithProviders } from '../../test/test-utils';
import type { ApiResult, StaffRecord } from '../../services/types';

vi.mock('../../services/adminService');

beforeEach(() => {
  vi.mocked(createStaff).mockReset();
});

describe('AddStaffForm', () => {
  it('has no client-side validation and submits an empty form directly (noValidate)', async () => {
    vi.mocked(createStaff).mockResolvedValue({ success: true, data: {} as StaffRecord } as ApiResult<StaffRecord>);
    const user = userEvent.setup();
    const onCreated = vi.fn();
    renderWithProviders(<AddStaffForm onCreated={onCreated} />, { authValue: { token: 'my-token' } });

    await user.click(screen.getByRole('button', { name: /Add Staff/i }));

    expect(createStaff).toHaveBeenCalledWith('my-token', { username: '', displayName: '', password: '' });
  });

  it('calls onCreated and resets the form on a successful submit', async () => {
    vi.mocked(createStaff).mockResolvedValue({ success: true, data: {} as StaffRecord } as ApiResult<StaffRecord>);
    const user = userEvent.setup();
    const onCreated = vi.fn();
    renderWithProviders(<AddStaffForm onCreated={onCreated} />, { authValue: { token: 'my-token' } });

    await user.type(screen.getByLabelText(/Username/i), 'newstaff');
    await user.type(screen.getByLabelText(/Display Name/i), 'New Staff');
    await user.type(screen.getByLabelText(/Password/i), 'Password1!');
    await user.click(screen.getByRole('button', { name: /Add Staff/i }));

    expect(await screen.findByText('Staff account created.')).toBeInTheDocument();
    expect(onCreated).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText(/Username/i)).toHaveValue('');
  });

  it('shows an error and does not call onCreated when submission fails', async () => {
    vi.mocked(createStaff).mockResolvedValue({ success: false, error: 'That username is already taken.' } as ApiResult<StaffRecord>);
    const user = userEvent.setup();
    const onCreated = vi.fn();
    renderWithProviders(<AddStaffForm onCreated={onCreated} />, { authValue: { token: 'my-token' } });

    await user.type(screen.getByLabelText(/Username/i), 'admin');
    await user.click(screen.getByRole('button', { name: /Add Staff/i }));

    expect(await screen.findByText('That username is already taken.')).toBeInTheDocument();
    expect(onCreated).not.toHaveBeenCalled();
  });
});
