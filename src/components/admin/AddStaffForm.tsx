import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../auth/useAuth';
import { useAsyncForm } from '../../hooks/useAsyncForm';
import { createStaff } from '../../services/adminService';
import type { CreateStaffPayload } from '../../services/types';

interface AddStaffFormProps {
  onCreated: () => void;
}

const emptyForm: CreateStaffPayload = { username: '', displayName: '', password: '' };

export function AddStaffForm({ onCreated }: AddStaffFormProps) {
  const { token } = useAuth();
  const [form, setForm] = useState<CreateStaffPayload>(emptyForm);

  const submitFn = useCallback(
    (payload: CreateStaffPayload) => createStaff(token ?? '', payload),
    [token],
  );
  const { status, error, submit, isLoading } = useAsyncForm(submitFn);

  function handleChange(field: keyof CreateStaffPayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await submit(form);
    if (result.success) {
      setForm(emptyForm);
      onCreated();
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <Typography variant="h6">Add Staff Account</Typography>
        {status === 'success' && <Alert severity="success">Staff account created.</Alert>}
        {status === 'error' && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Username"
              fullWidth
              required
              value={form.username}
              onChange={(e) => handleChange('username', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Display Name"
              fullWidth
              required
              value={form.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              helperText="At least 8 characters"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="secondary" disabled={isLoading} sx={{ alignSelf: 'flex-start' }}>
          {isLoading ? 'Creating…' : 'Add Staff'}
        </Button>
      </Stack>
    </form>
  );
}
