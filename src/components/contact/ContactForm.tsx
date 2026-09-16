import { useState } from 'react';
import type { FormEvent } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useAsyncForm } from '../../hooks/useAsyncForm';
import { submitContactForm } from '../../services/contactService';
import { isRequired, isValidEmail, isValidPhone } from '../../utils/validators';
import type { ContactFormPayload } from '../../services/types';

const emptyForm: ContactFormPayload = { name: '', email: '', phone: '', message: '' };

export function ContactForm() {
  const [form, setForm] = useState<ContactFormPayload>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormPayload, string>>>({});
  const { status, error, submit, isLoading } = useAsyncForm(submitContactForm);

  function handleChange(field: keyof ContactFormPayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof ContactFormPayload, string>> = {};
    if (!isRequired(form.name)) next.name = 'Name is required';
    if (!isValidEmail(form.email)) next.email = 'Enter a valid email address';
    if (!isValidPhone(form.phone)) next.phone = 'Enter a valid phone number';
    if (!isRequired(form.message)) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const result = await submit(form);
    if (result.success) {
      setForm(emptyForm);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={2.5}>
        {status === 'success' && (
          <Alert severity="success">Thanks for reaching out! We'll get back to you soon.</Alert>
        )}
        {status === 'error' && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Name"
          fullWidth
          required
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Phone"
          fullWidth
          required
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          label="Message"
          fullWidth
          required
          multiline
          minRows={4}
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          error={!!errors.message}
          helperText={errors.message}
        />
        <Button type="submit" variant="contained" color="primary" size="large" disabled={isLoading}>
          {isLoading ? 'Sending…' : 'Send Message'}
        </Button>
      </Stack>
    </form>
  );
}
