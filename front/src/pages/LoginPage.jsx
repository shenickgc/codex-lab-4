import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import CatchingPokemonRoundedIcon from '@mui/icons-material/CatchingPokemonRounded';
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
      badge="LOGIN"
      title="Trainer Access"
      subtitle="Enter the admin console, validate your session and continue to the user management arena."
      asideTitle="Only authenticated trainers can enter the protected routes."
      asideBody="The app stores the token locally and sends it automatically on every protected request to the backend."
    >
      <Stack spacing={3}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <CatchingPokemonRoundedIcon color="primary" />
          <Typography variant="h6">Sign in to the control center</Typography>
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
            Start Session
          </Button>
        </Stack>

        <Typography color="text.secondary">
          No account yet?{' '}
          <Typography
            component={RouterLink}
            to="/register"
            sx={{ display: 'inline', color: 'secondary.main', fontWeight: 700 }}
          >
            Register trainer
          </Typography>
        </Typography>
      </Stack>
    </AuthShell>
  );
}
