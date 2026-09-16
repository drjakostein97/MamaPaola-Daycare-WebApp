import { useState } from 'react';
import type { FormEvent } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useAsyncForm } from '../../hooks/useAsyncForm';
import { submitEnrollmentInquiry } from '../../services/enrollmentService';
import { isRequired, isValidEmail, isValidPhone } from '../../utils/validators';
import type { EnrollmentInquiryPayload } from '../../services/types';

const emptyForm: EnrollmentInquiryPayload = {
  parentName: '',
  email: '',
  phone: '',
  childName: '',
  childAge: '',
  preferredStartDate: '',
  notes: '',
};

export function EnrollmentForm() {
  const [form, setForm] = useState<EnrollmentInquiryPayload>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof EnrollmentInquiryPayload, string>>>({});
  const { status, error, submit, isLoading } = useAsyncForm(submitEnrollmentInquiry);

  function handleChange(field: keyof EnrollmentInquiryPayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof EnrollmentInquiryPayload, string>> = {};
    if (!isRequired(form.parentName)) next.parentName = 'Parent name is required';
    if (!isValidEmail(form.email)) next.email = 'Enter a valid email address';
    if (!isValidPhone(form.phone)) next.phone = 'Enter a valid phone number';
    if (!isRequired(form.childName)) next.childName = "Child's name is required";
    if (!isRequired(form.childAge)) next.childAge = "Child's age is required";
    if (!isRequired(form.preferredStartDate)) next.preferredStartDate = 'Preferred start date is required';
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
      <Stack spacing={3}>
        {status === 'success' && (
          <Alert severity="success">
            Thank you! Your enrollment inquiry has been received. We'll be in touch soon.
          </Alert>
        )}
        {status === 'error' && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Parent / Guardian Name"
              fullWidth
              required
              value={form.parentName}
              onChange={(e) => handleChange('parentName', e.target.value)}
              error={!!errors.parentName}
              helperText={errors.parentName}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
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
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Phone"
              fullWidth
              required
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Child's Name"
              fullWidth
              required
              value={form.childName}
              onChange={(e) => handleChange('childName', e.target.value)}
              error={!!errors.childName}
              helperText={errors.childName}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Child's Age"
              fullWidth
              required
              value={form.childAge}
              onChange={(e) => handleChange('childAge', e.target.value)}
              error={!!errors.childAge}
              helperText={errors.childAge}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Preferred Start Date"
              type="date"
              fullWidth
              required
              slotProps={{ inputLabel: { shrink: true } }}
              value={form.preferredStartDate}
              onChange={(e) => handleChange('preferredStartDate', e.target.value)}
              error={!!errors.preferredStartDate}
              helperText={errors.preferredStartDate}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Additional Notes"
              fullWidth
              multiline
              minRows={3}
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary" size="large" disabled={isLoading}>
          {isLoading ? 'Submitting…' : 'Submit Inquiry'}
        </Button>
      </Stack>
    </form>
  );
}
