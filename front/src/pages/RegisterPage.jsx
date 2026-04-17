import { Alert, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
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
      badge="Register"
      title="Create your admin profile"
      subtitle="Set up a new account, receive a token from the backend and enter the protected user management flow."
      asideTitle="Registration and login share the same product-style visual language."
      asideBody="This page consumes the backend register endpoint and opens the session automatically on success."
    >
      <Stack spacing={3}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <PersonAddAlt1RoundedIcon color="primary" />
          <Typography variant="h6">Create account</Typography>
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
            Create profile
          </Button>
        </Stack>

        <Typography color="text.secondary">
          Already have access?{' '}
          <Typography
            component={RouterLink}
            to="/login"
            sx={{ display: 'inline', color: 'primary.main', fontWeight: 700 }}
          >
            Sign in
          </Typography>
        </Typography>
      </Stack>
    </AuthShell>
  );
}
