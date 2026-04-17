import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  password: '',
  phone: '',
  userType: 'client',
  isActive: true
};

export function UserDialog({ open, user, onClose, onSubmit, isSaving }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? '',
        email: user.email ?? '',
        password: '',
        phone: user.phone ?? '',
        userType: user.userType ?? 'client',
        isActive: user.isActive ?? true
      });
      return;
    }

    setForm(initialForm);
  }, [user, open]);

  const handleChange = (field) => (event) => {
    const value = field === 'isActive' ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      userType: form.userType,
      isActive: form.isActive
    };

    if (form.password) {
      payload.password = form.password;
    }

    onSubmit(payload);
  };

  return (
    <Dialog open={open} onClose={isSaving ? undefined : onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{user ? 'Edit trainer' : 'Create trainer'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Name" value={form.name} onChange={handleChange('name')} fullWidth required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Email" type="email" value={form.email} onChange={handleChange('email')} fullWidth required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label={user ? 'New password (optional)' : 'Password'}
                type="password"
                value={form.password}
                onChange={handleChange('password')}
                fullWidth
                required={!user}
                helperText="Minimum 6 characters"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Phone" value={form.phone} onChange={handleChange('phone')} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                label="User type"
                value={form.userType}
                onChange={handleChange('userType')}
                fullWidth
                required
              >
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="provider">Provider</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: 4,
                  bgcolor: 'rgba(67,160,71,0.08)',
                  border: '2px solid rgba(38, 50, 56, 0.18)'
                }}
              >
                <div>
                  <Typography fontWeight={700}>Active trainer</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Controls access to the admin ecosystem
                  </Typography>
                </div>
                <Switch checked={form.isActive} onChange={handleChange('isActive')} />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose} disabled={isSaving} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSaving}>
            {user ? 'Save changes' : 'Create trainer'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
