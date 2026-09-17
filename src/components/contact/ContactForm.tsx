import { useState } from 'react';
import type { FormEvent } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { useAsyncForm } from '../../hooks/useAsyncForm';
import { submitContactForm } from '../../services/contactService';
import { isRequired, isValidEmail, isValidPhone } from '../../utils/validators';
import type { ContactFormPayload } from '../../services/types';

const emptyForm: ContactFormPayload = { name: '', email: '', phone: '', message: '' };

export function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState<ContactFormPayload>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormPayload, string>>>({});
  const { status, error, submit, isLoading } = useAsyncForm(submitContactForm);

  function handleChange(field: keyof ContactFormPayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof ContactFormPayload, string>> = {};
    if (!isRequired(form.name)) next.name = t('forms.contact.validation.nameRequired');
    if (!isValidEmail(form.email)) next.email = t('forms.contact.validation.invalidEmail');
    if (!isValidPhone(form.phone)) next.phone = t('forms.contact.validation.invalidPhone');
    if (!isRequired(form.message)) next.message = t('forms.contact.validation.messageRequired');
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
          <Alert severity="success">{t('forms.contact.successMessage')}</Alert>
        )}
        {status === 'error' && <Alert severity="error">{error}</Alert>}

        <TextField
          label={t('forms.contact.name')}
          fullWidth
          required
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label={t('forms.contact.email')}
          type="email"
          fullWidth
          required
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label={t('forms.contact.phone')}
          fullWidth
          required
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          label={t('forms.contact.message')}
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
          {isLoading ? t('forms.contact.sending') : t('forms.contact.sendMessage')}
        </Button>
      </Stack>
    </form>
  );
}
