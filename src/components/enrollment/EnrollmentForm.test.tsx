import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EnrollmentForm } from './EnrollmentForm';
import { submitEnrollmentInquiry } from '../../services/enrollmentService';
import type { ApiResult } from '../../services/types';

vi.mock('../../services/enrollmentService');

beforeEach(() => {
  vi.mocked(submitEnrollmentInquiry).mockReset();
});

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Parent \/ Guardian Name/i), 'Jane Doe');
  await user.type(screen.getByLabelText(/^Email/i), 'jane@example.com');
  await user.type(screen.getByLabelText(/^Phone/i), '555-1234');
  await user.type(screen.getAllByLabelText(/Child's Age/i)[0], '4');
  const dateInput = screen.getByLabelText(/Preferred Start Date/i);
  await user.type(dateInput, '2026-10-01');
}

describe('EnrollmentForm', () => {
  it('renders one child row initially with the remove button disabled', () => {
    render(<EnrollmentForm />);

    expect(screen.getAllByLabelText(/Child's Age/i)).toHaveLength(1);
    expect(screen.getByRole('button', { name: /Remove child/i })).toBeDisabled();
  });

  it('adds a child row via "Add another child" and enables remove', async () => {
    const user = userEvent.setup();
    render(<EnrollmentForm />);

    await user.click(screen.getByRole('button', { name: /Add another child/i }));

    expect(screen.getAllByLabelText(/Child's Age/i)).toHaveLength(2);
    const removeButtons = screen.getAllByRole('button', { name: /Remove child/i });
    expect(removeButtons[0]).toBeEnabled();
    expect(removeButtons[1]).toBeEnabled();
  });

  it('removes a child row and re-disables remove at one row', async () => {
    const user = userEvent.setup();
    render(<EnrollmentForm />);

    await user.click(screen.getByRole('button', { name: /Add another child/i }));
    await user.click(screen.getAllByRole('button', { name: /Remove child/i })[1]);

    expect(screen.getAllByLabelText(/Child's Age/i)).toHaveLength(1);
    expect(screen.getByRole('button', { name: /Remove child/i })).toBeDisabled();
  });

  it('blocks submission and shows all required-field errors on an empty form', async () => {
    const user = userEvent.setup();
    render(<EnrollmentForm />);

    await user.click(screen.getByRole('button', { name: /Submit Inquiry/i }));

    expect(await screen.findByText('Parent name is required')).toBeInTheDocument();
    expect(screen.getByText('Preferred start date is required')).toBeInTheDocument();
    expect(screen.getByText("Child's age is required")).toBeInTheDocument();
    expect(submitEnrollmentInquiry).not.toHaveBeenCalled();
  });

  it('blocks submission on an invalid email or phone', async () => {
    const user = userEvent.setup();
    render(<EnrollmentForm />);

    await user.type(screen.getByLabelText(/Parent \/ Guardian Name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/^Email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/^Phone/i), '1');
    await user.click(screen.getByRole('button', { name: /Submit Inquiry/i }));

    expect(await screen.findByText('Enter a valid email address')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid phone number')).toBeInTheDocument();
    expect(submitEnrollmentInquiry).not.toHaveBeenCalled();
  });

  it('shows nested per-child errors when a second child row is missing an age', async () => {
    const user = userEvent.setup();
    render(<EnrollmentForm />);

    await user.click(screen.getByRole('button', { name: /Add another child/i }));
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Submit Inquiry/i }));

    expect(await screen.findAllByText("Child's age is required")).toHaveLength(1);
    expect(submitEnrollmentInquiry).not.toHaveBeenCalled();
  });

  it('submits the correctly-shaped payload on valid input and shows success', async () => {
    vi.mocked(submitEnrollmentInquiry).mockResolvedValue({ success: true, data: null } as ApiResult<null>);
    const user = userEvent.setup();
    render(<EnrollmentForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Submit Inquiry/i }));

    expect(await screen.findByText(/Thank you! Your enrollment inquiry/i)).toBeInTheDocument();
    expect(submitEnrollmentInquiry).toHaveBeenCalledWith({
      parentName: 'Jane Doe',
      email: 'jane@example.com',
      phone: '555-1234',
      children: [{ age: '4' }],
      preferredStartDate: '2026-10-01',
      notes: '',
    });
    // Resets to a single empty child row.
    expect(screen.getAllByLabelText(/Child's Age/i)).toHaveLength(1);
    expect(screen.getAllByLabelText(/Child's Age/i)[0]).toHaveValue('');
  });

  it('shows the server error message when submission fails', async () => {
    vi.mocked(submitEnrollmentInquiry).mockResolvedValue({ success: false, error: 'Network error' } as ApiResult<null>);
    const user = userEvent.setup();
    render(<EnrollmentForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Submit Inquiry/i }));

    expect(await screen.findByText('Network error')).toBeInTheDocument();
  });

  it('disables the submit button and shows "Submitting…" while the request is pending', async () => {
    const { promise, resolve } = deferred<ApiResult<null>>();
    vi.mocked(submitEnrollmentInquiry).mockReturnValue(promise);
    const user = userEvent.setup();
    render(<EnrollmentForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Submit Inquiry/i }));

    const pendingButton = await screen.findByRole('button', { name: /Submitting…/i });
    expect(pendingButton).toBeDisabled();

    resolve({ success: true, data: null });
  });
});
