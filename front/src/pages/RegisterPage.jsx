import { Alert, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/AuthShell';
import { useAuth } from '../context/AuthContext';

const initialForm = {
  name: '',
  email: '',
  password: '',
  phone: '',
  userType: 'client'
};

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/users', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register(form);
      navigate('/users', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      badge="REGISTER"
      title="New Trainer"
      subtitle="Create a trainer profile and enter the admin arena with an active authenticated session."
      asideTitle="Registration writes a user in the backend and returns a JWT token."
      asideBody="Once completed, the new trainer is redirected to the protected user module without extra login."
    >
      <Stack spacing={3}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <AppRegistrationRoundedIcon color="primary" />
          <Typography variant="h6">Create your trainer card</Typography>
        </Stack>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          <TextField label="Name" value={form.name} onChange={handleChange('name')} required fullWidth />
          <TextField label="Email" type="email" value={form.email} onChange={handleChange('email')} required fullWidth />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
            helperText="Minimum 6 characters"
            required
            fullWidth
          />
          <TextField label="Phone" value={form.phone} onChange={handleChange('phone')} fullWidth />
          <TextField select label="User type" value={form.userType} onChange={handleChange('userType')} fullWidth>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="provider">Provider</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Register Trainer
          </Button>
        </Stack>

        <Typography color="text.secondary">
          Already registered?{' '}
          <Typography
            component={RouterLink}
            to="/login"
            sx={{ display: 'inline', color: 'secondary.main', fontWeight: 700 }}
          >
            Go to login
          </Typography>
        </Typography>
      </Stack>
    </AuthShell>
  );
}
