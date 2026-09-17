import { useState } from 'react';
import type { FormEvent } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { useAsyncForm } from '../../hooks/useAsyncForm';
import { submitEnrollmentInquiry } from '../../services/enrollmentService';
import { isRequired, isValidEmail, isValidPhone } from '../../utils/validators';
import type { EnrollmentInquiryPayload } from '../../services/types';

const emptyForm: EnrollmentInquiryPayload = {
  parentName: '',
  email: '',
  phone: '',
  children: [{ age: '' }],
  preferredStartDate: '',
  notes: '',
};

type TopLevelField = 'parentName' | 'email' | 'phone' | 'preferredStartDate' | 'notes';

interface FormErrors {
  parentName?: string;
  email?: string;
  phone?: string;
  preferredStartDate?: string;
  children?: Array<{ age?: string }>;
}

export function EnrollmentForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState<EnrollmentInquiryPayload>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const { status, error, submit, isLoading } = useAsyncForm(submitEnrollmentInquiry);

  function handleChange(field: TopLevelField, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleChildChange(index: number, field: 'age', value: string) {
    setForm((prev) => ({
      ...prev,
      children: prev.children.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    }));
  }

  function handleAddChild() {
    setForm((prev) => ({ ...prev, children: [...prev.children, { age: '' }] }));
  }

  function handleRemoveChild(index: number) {
    setForm((prev) => ({ ...prev, children: prev.children.filter((_, i) => i !== index) }));
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!isRequired(form.parentName)) next.parentName = t('forms.enrollment.validation.parentNameRequired');
    if (!isValidEmail(form.email)) next.email = t('forms.enrollment.validation.invalidEmail');
    if (!isValidPhone(form.phone)) next.phone = t('forms.enrollment.validation.invalidPhone');
    if (!isRequired(form.preferredStartDate)) next.preferredStartDate = t('forms.enrollment.validation.preferredStartDateRequired');

    const childErrors = form.children.map((c) => ({
      age: isRequired(c.age) ? undefined : t('forms.enrollment.validation.childAgeRequired'),
    }));
    if (childErrors.some((e) => e.age)) next.children = childErrors;

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
            {t('forms.enrollment.successMessage')}
          </Alert>
        )}
        {status === 'error' && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t('forms.enrollment.parentName')}
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
              label={t('forms.enrollment.email')}
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
              label={t('forms.enrollment.phone')}
              fullWidth
              required
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          {form.children.map((child, index) => (
            <Grid key={index} size={12} container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  label={t('forms.enrollment.childAge')}
                  fullWidth
                  required
                  value={child.age}
                  onChange={(e) => handleChildChange(index, 'age', e.target.value)}
                  error={!!errors.children?.[index]?.age}
                  helperText={errors.children?.[index]?.age}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  aria-label={t('forms.enrollment.removeChild')}
                  onClick={() => handleRemoveChild(index)}
                  disabled={form.children.length <= 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Grid size={12}>
            <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={handleAddChild}>
              {t('forms.enrollment.addAnotherChild')}
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t('forms.enrollment.preferredStartDate')}
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
              label={t('forms.enrollment.notes')}
              fullWidth
              multiline
              minRows={3}
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary" size="large" disabled={isLoading}>
          {isLoading ? t('forms.enrollment.submitting') : t('forms.enrollment.submitInquiry')}
        </Button>
      </Stack>
    </form>
  );
}
