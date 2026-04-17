import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/AuthShell';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destination = location.state?.from?.pathname ?? '/users';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(destination, { replace: true });
    }
  }, [destination, isAuthenticated, navigate]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(form);
      navigate(destination, { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      badge="Login"
      title="Sign in to Meta Admin"
      subtitle="Access the protected workspace, manage users and continue with a persistent authenticated session."
      asideTitle="This interface is designed like a modern social platform admin flow."
      asideBody="The token is persisted locally and added automatically to the protected backend requests after login."
    >
      <Stack spacing={3}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <PublicRoundedIcon color="primary" />
          <Typography variant="h6">Welcome back</Typography>
        </Stack>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Continue
          </Button>
        </Stack>

        <Typography color="text.secondary">
          Need an account?{' '}
          <Typography
            component={RouterLink}
            to="/register"
            sx={{ display: 'inline', color: 'primary.main', fontWeight: 700 }}
          >
            Create one
          </Typography>
        </Typography>
      </Stack>
    </AuthShell>
  );
}
