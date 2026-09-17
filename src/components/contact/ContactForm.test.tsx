import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';
import { submitContactForm } from '../../services/contactService';
import type { ApiResult } from '../../services/types';

vi.mock('../../services/contactService');

beforeEach(() => {
  vi.mocked(submitContactForm).mockReset();
});

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Name/i), 'Jane Doe');
  await user.type(screen.getByLabelText(/Email/i), 'jane@example.com');
  await user.type(screen.getByLabelText(/Phone/i), '555-1234');
  await user.type(screen.getByLabelText(/Message/i), 'Hello there');
}

describe('ContactForm', () => {
  it('blocks submission and shows errors when required fields are empty', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
    expect(submitContactForm).not.toHaveBeenCalled();
  });

  it('blocks submission on an invalid email or phone', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/Email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/Phone/i), '1');
    await user.type(screen.getByLabelText(/Message/i), 'Hi');
    await user.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByText('Enter a valid email address')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid phone number')).toBeInTheDocument();
    expect(submitContactForm).not.toHaveBeenCalled();
  });

  it('submits and shows a success message on valid input, then resets the form', async () => {
    vi.mocked(submitContactForm).mockResolvedValue({ success: true, data: null } as ApiResult<null>);
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByText(/Thanks for reaching out/i)).toBeInTheDocument();
    expect(submitContactForm).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '555-1234',
      message: 'Hello there',
    });
    expect(screen.getByLabelText(/Name/i)).toHaveValue('');
  });

  it('shows the server error message when submission fails', async () => {
    vi.mocked(submitContactForm).mockResolvedValue({ success: false, error: 'Network error' } as ApiResult<null>);
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByText('Network error')).toBeInTheDocument();
  });
});
